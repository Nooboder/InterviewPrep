// ============================================================
// WEBHOOK PRACTICAL IMPLEMENTATION GUIDE
// ============================================================

/**
 * Step-by-step guide to implement production-ready webhooks
 * Real-world code patterns and examples
 */

// ============================================================
// 1. COMPLETE WEBHOOK SYSTEM
// ============================================================

/*
Complete production webhook system with all features
*/

// ============================================================
// DATABASE SCHEMA
// ============================================================

/*
MongoDB Schema:

// Webhooks collection (subscriptions)
{
  _id: ObjectId,
  userId: string,
  url: string,
  events: string[],
  secret: string,
  active: boolean,
  headers: object,
  maxRetries: number,
  timeout: number,
  createdAt: date,
  updatedAt: date,
  lastDeliveredAt: date,
  failureCount: number,
}

// Webhook events collection (audit log)
{
  _id: ObjectId,
  webhookId: ObjectId,
  event: string,
  data: object,
  attempts: number,
  status: 'pending' | 'delivered' | 'failed',
  lastAttemptAt: date,
  nextRetryAt: date,
  error: string,
  createdAt: date,
}

// Webhook deliveries collection (detailed logs)
{
  _id: ObjectId,
  webhookEventId: ObjectId,
  attempt: number,
  statusCode: number,
  responseTime: number,
  error: string,
  timestamp: date,
}
*/

// ============================================================
// COMPLETE IMPLEMENTATION
// ============================================================

// models/Webhook.js
export const WebhookSchema = {
  userId: { type: String, required: true },
  url: { type: String, required: true, validate: 'isURL' },
  events: { type: Array, required: true }, // ['order.created', 'payment.success']
  secret: { type: String, required: true }, // For signing
  active: { type: Boolean, default: true },
  headers: { type: Object, default: {} }, // Custom headers
  maxRetries: { type: Number, default: 5 },
  timeout: { type: Number, default: 5000 }, // 5 seconds
  failureCount: { type: Number, default: 0 },
  lastDeliveredAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

// services/WebhookService.js
export class WebhookService {
  // Register webhook
  async registerWebhook(userId, url, events, secret) {
    const webhook = {
      userId,
      url,
      events,
      secret,
      active: true,
      createdAt: new Date(),
    };

    const result = await db.webhooks.insertOne(webhook);
    return result.insertedId;
  }

  // Send webhook
  async sendWebhook(webhookId, event, data) {
    const webhook = await db.webhooks.findById(webhookId);

    if (!webhook.active) {
      throw new Error('Webhook is not active');
    }

    if (!webhook.events.includes(event)) {
      return; // Webhook not subscribed to this event
    }

    // Create signature
    const payload = {
      event,
      data,
      timestamp: Date.now(),
    };

    const signature = this.generateSignature(
      JSON.stringify(payload),
      webhook.secret
    );

    // Queue for delivery
    await webhookQueue.add({
      webhookId,
      event,
      payload,
      signature,
      attempt: 1,
    });
  }

  // Generate HMAC signature
  generateSignature(payload, secret) {
    const crypto = require('crypto');
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  // Verify signature
  verifySignature(payload, signature, secret) {
    const expected = this.generateSignature(payload, secret);
    return signature === expected;
  }

  // Retry webhook
  async retryWebhook(webhookEventId) {
    const event = await db.webhookEvents.findById(webhookEventId);

    if (event.attempts >= event.webhook.maxRetries) {
      // Max retries exceeded
      await db.webhookEvents.updateOne(
        { _id: webhookEventId },
        { status: 'failed' }
      );
      return false;
    }

    // Calculate next retry time
    const delay = Math.min(1000 * Math.pow(2, event.attempts), 30000);
    const nextRetryAt = new Date(Date.now() + delay);

    await db.webhookEvents.updateOne(
      { _id: webhookEventId },
      {
        attempts: event.attempts + 1,
        nextRetryAt,
        status: 'pending',
      }
    );

    return true;
  }
}

// ============================================================
// WEBHOOK QUEUE WORKER
// ============================================================

/*
Bull Queue for reliable webhook delivery
*/

const Bull = require('bull');
const axios = require('axios');

const webhookQueue = new Bull('webhooks', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Process webhooks from queue
webhookQueue.process(async (job) => {
  const { webhookId, event, payload, signature, attempt } = job.data;

  try {
    const webhook = await db.webhooks.findById(webhookId);

    const response = await axios.post(
      webhook.url,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': `sha256=${signature}`,
          'X-Webhook-Id': webhookId,
          'X-Webhook-Attempt': attempt,
          ...webhook.headers,
        },
        timeout: webhook.timeout,
      }
    );

    // Success
    await db.webhookEvents.updateOne(
      { _id: job.data.webhookEventId },
      {
        status: 'delivered',
        deliveredAt: new Date(),
      }
    );

    // Update webhook
    await db.webhooks.updateOne(
      { _id: webhookId },
      {
        lastDeliveredAt: new Date(),
        failureCount: 0,
      }
    );

    console.log(`✅ Webhook delivered: ${webhookId}`);
  } catch (error) {
    console.error(`❌ Webhook failed (attempt ${attempt}):`, error.message);

    // Log delivery attempt
    await db.webhookDeliveries.insertOne({
      webhookEventId: job.data.webhookEventId,
      attempt,
      statusCode: error.response?.status,
      responseTime: error.response?.headers['response-time'],
      error: error.message,
      timestamp: new Date(),
    });

    // Retry
    const maxRetries = 5;
    if (attempt < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);

      // Re-add to queue with delay
      await webhookQueue.add(
        {
          ...job.data,
          attempt: attempt + 1,
        },
        {
          delay,
          attempts: 1,
        }
      );

      // Update failure count
      await db.webhooks.updateOne(
        { _id: webhookId },
        { failureCount: (await db.webhooks.findById(webhookId)).failureCount + 1 }
      );

      throw new Error(`Retrying (attempt ${attempt + 1}/${maxRetries})`);
    } else {
      // Max retries exceeded
      await db.webhookEvents.updateOne(
        { _id: job.data.webhookEventId },
        {
          status: 'failed',
          error: error.message,
          failedAt: new Date(),
        }
      );

      // Alert
      await alertOps('Webhook failed after retries', {
        webhookId,
        error: error.message,
      });

      throw error;
    }
  }
});

// ============================================================
// REST API
// ============================================================

/*
Express API for webhook management
*/

const express = require('express');
const router = express.Router();
const webhookService = new WebhookService();

// Create webhook
router.post('/webhooks', async (req, res) => {
  const { url, events } = req.body;
  const userId = req.user.id;

  // Validate URL
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Generate secret
  const secret = require('crypto').randomBytes(32).toString('hex');

  const webhookId = await webhookService.registerWebhook(
    userId,
    url,
    events,
    secret
  );

  res.status(201).json({
    id: webhookId,
    url,
    events,
    secret, // Show once, user should save it
  });
});

// List webhooks
router.get('/webhooks', async (req, res) => {
  const webhooks = await db.webhooks.find({ userId: req.user.id });
  res.json(webhooks);
});

// Update webhook
router.patch('/webhooks/:id', async (req, res) => {
  const { url, events, active } = req.body;

  const webhook = await db.webhooks.findByIdAndUpdate(
    req.params.id,
    { url, events, active, updatedAt: new Date() },
    { new: true }
  );

  res.json(webhook);
});

// Delete webhook
router.delete('/webhooks/:id', async (req, res) => {
  await db.webhooks.deleteOne({ _id: req.params.id });
  res.json({ success: true });
});

// Get webhook attempts
router.get('/webhooks/:id/attempts', async (req, res) => {
  const attempts = await db.webhookDeliveries.find({
    webhookId: req.params.id,
  }).sort({ timestamp: -1 }).limit(50);

  res.json(attempts);
});

// ============================================================
// WEBHOOK RECEIVER
// ============================================================

/*
Receive webhooks from other services
*/

router.post('/webhook', express.json(), async (req, res) => {
  // Get signature from header
  const signature = req.headers['x-webhook-signature'];
  const webhookId = req.headers['x-webhook-id'];
  const attempt = req.headers['x-webhook-attempt'] || 1;

  if (!signature || !webhookId) {
    return res.status(400).json({ error: 'Missing webhook headers' });
  }

  try {
    // Get webhook by ID
    const webhook = await db.webhooks.findById(webhookId);

    if (!webhook) {
      return res.status(404).json({ error: 'Webhook not found' });
    }

    // Verify signature
    const payload = JSON.stringify(req.body);
    const isValid = webhookService.verifySignature(
      payload,
      signature,
      webhook.secret
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Check idempotency
    const existingEvent = await db.webhookEvents.findOne({
      webhookId,
      externalId: req.body.id, // Assume payload has id
    });

    if (existingEvent) {
      return res.json({ success: true, message: 'Already processed' });
    }

    // Process webhook
    const { event, data } = req.body;

    // Handle based on event type
    switch (event) {
      case 'payment.success':
        await handlePaymentSuccess(data);
        break;
      case 'order.created':
        await handleOrderCreated(data);
        break;
      default:
        console.log(`Unknown event: ${event}`);
    }

    // Store event
    await db.webhookEvents.insertOne({
      webhookId,
      externalId: req.body.id,
      event,
      data,
      processedAt: new Date(),
      attempt,
    });

    // Quick response (don't wait for processing)
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// ============================================================
// TESTING WEBHOOKS
// ============================================================

/*
Test webhook delivery
*/

router.post('/webhooks/:id/test', async (req, res) => {
  const webhook = await db.webhooks.findById(req.params.id);

  const testPayload = {
    event: 'test.ping',
    data: { message: 'This is a test webhook' },
    timestamp: Date.now(),
  };

  const signature = webhookService.generateSignature(
    JSON.stringify(testPayload),
    webhook.secret
  );

  try {
    const response = await axios.post(webhook.url, testPayload, {
      headers: {
        'X-Webhook-Signature': `sha256=${signature}`,
        'X-Webhook-Id': req.params.id,
      },
      timeout: 5000,
    });

    res.json({
      success: true,
      statusCode: response.status,
      responseTime: response.headers['response-time'],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      statusCode: error.response?.status,
    });
  }
});

// ============================================================
// MONITORING & METRICS
// ============================================================

/*
Webhook metrics and monitoring
*/

async function getWebhookMetrics(webhookId) {
  const events = await db.webhookEvents.find({ webhookId });
  const deliveries = await db.webhookDeliveries.find({ webhookId });

  const total = events.length;
  const delivered = events.filter(e => e.status === 'delivered').length;
  const failed = events.filter(e => e.status === 'failed').length;
  const pending = events.filter(e => e.status === 'pending').length;

  const successRate = total > 0 ? (delivered / total) * 100 : 0;

  const responseTimes = deliveries
    .map(d => d.responseTime)
    .filter(Boolean)
    .sort((a, b) => a - b);

  const p50 = responseTimes[Math.floor(responseTimes.length * 0.5)];
  const p95 = responseTimes[Math.floor(responseTimes.length * 0.95)];
  const p99 = responseTimes[Math.floor(responseTimes.length * 0.99)];

  return {
    total,
    delivered,
    failed,
    pending,
    successRate,
    responseTimes: { p50, p95, p99 },
  };
}

// ============================================================
// COMMON PITFALLS
// ============================================================

/*
Q: What happens if webhook receiver is down?
A: Retries will keep trying. After max retries, webhook is marked failed.
   Recommendation: Alert user to fix endpoint.

Q: How to handle webhook timeout?
A: Set timeout in request (5 seconds typical). If timeout, treat as failure
   and retry later.

Q: What if webhook receiver returns 200 but doesn't actually process?
A: Idempotency key helps. Client can mark as processed in database.
   Also helps with duplicate webhook sends.

Q: How to handle webhook ordering?
A: Webhooks not guaranteed in order. Use timestamps in data.
   Process events based on timestamp, not delivery order.

Q: What if webhook payload is too large?
A: Send minimal data in webhook, user fetches full data via API.
   Or split into multiple webhooks.

Q: How to prevent webhook receiver from becoming bottleneck?
A: Use queue on receiver side. Immediately return 200, process async.
   Or implement rate limiting.
*/

export { webhookQueue, WebhookService, router };
