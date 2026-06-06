// ============================================================
// WEBHOOK INTERVIEW SCENARIOS & SOLUTIONS
// ============================================================

/**
 * Common webhook interview questions and detailed answers
 * Real-world scenarios from Big4 and MNC interviews
 */

// ============================================================
// SCENARIO 1: PAYMENT PROCESSING
// ============================================================

/*
SCENARIO: Design a webhook system for payment processing
- Payment provider (Stripe) sends webhooks
- Must be reliable and secure
- Handle payment success, failure, refund
- Update user and database
- Send notifications

SOLUTION:
1. Setup webhook receiver
2. Verify signature
3. Process payment event
4. Update database
5. Send confirmation
6. Handle retries
7. Monitor delivery

CODE:
*/

function paymentWebhookScenario() {
  // Receive webhook from Stripe
  app.post('/stripe-webhook', expressRaw, (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    // Verify
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const payment = event.data.object;

        // Update order
        Order.findByIdAndUpdate(payment.metadata.orderId, {
          status: 'paid',
          paidAt: new Date(),
        });

        // Emit event for other services
        eventBus.emit('payment.success', {
          orderId: payment.metadata.orderId,
          amount: payment.amount,
        });

        // Send confirmation email
        sendPaymentConfirmationEmail(payment.customer_email);

        break;
      }

      case 'payment_intent.payment_failed': {
        const payment = event.data.object;

        Order.findByIdAndUpdate(payment.metadata.orderId, {
          status: 'payment_failed',
          failureReason: payment.last_payment_error?.message,
        });

        // Send retry email
        sendPaymentRetryEmail(payment.customer_email);

        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;

        Order.findByIdAndUpdate(charge.metadata.orderId, {
          status: 'refunded',
          refundAmount: charge.amount_refunded,
          refundedAt: new Date(),
        });

        // Refund inventory
        addInventory(charge.metadata.items);

        break;
      }
    }

    res.json({ received: true });
  });
}

// INTERVIEW QUESTIONS:
/*
Q: "How would you ensure payment webhook reliability?"
A: 1. Idempotency - process same webhook once
   2. Retry logic - if processing fails
   3. Signature verification - ensure authenticity
   4. Queue-based processing - async handling
   5. Monitoring - track delivery success rate
   6. Alerts - notify on failures

Q: "What if webhook arrives before API call completes?"
A: Race condition possible. Solutions:
   - Use database transaction (ACID)
   - Check current status before updating
   - Use idempotency key from webhook
   - Timestamp to determine final state

Q: "How to handle duplicate webhooks?"
A: - Store webhook ID in database
   - Check: "Is this ID already processed?"
   - If yes, return success (idempotent)
   - If no, process and store ID

Q: "How to secure payment webhooks?"
A: - HTTPS only
   - Verify signature (HMAC)
   - Validate webhook came from Stripe
   - Don't trust request headers
   - Never hardcode secrets
   - Rotate secrets periodically
*/

// ============================================================
// SCENARIO 2: MULTI-SERVICE INTEGRATION
// ============================================================

/*
SCENARIO: Multiple services need to react to same event
- E-commerce platform
- Order created event needs to:
  - Notify inventory service
  - Trigger fulfillment
  - Update analytics
  - Send email
  - Update accounting

SOLUTION: Event-driven architecture
*/

function multiServiceWebhookScenario() {
  // Order service
  app.post('/orders', async (req, res) => {
    const order = await Order.create(req.body);

    // Publish event to all subscribers
    const subscribers = [
      'https://inventory.service/webhooks/order-created',
      'https://fulfillment.service/webhooks/order-created',
      'https://analytics.service/webhooks/order-created',
      'https://email.service/webhooks/order-created',
    ];

    for (const url of subscribers) {
      // Queue webhook for delivery
      await webhookQueue.add({
        event: 'order.created',
        url,
        data: order,
      });
    }

    res.json(order);
  });

  // Inventory service receives webhook
  app.post('/webhooks/order-created', async (req, res) => {
    verifySignature(req);

    const { data: order } = req.body;

    // Update inventory
    for (const item of order.items) {
      await Inventory.updateOne(
        { sku: item.sku },
        { $inc: { reserved: item.quantity } }
      );
    }

    res.json({ success: true });
  });

  // Fulfillment service receives webhook
  app.post('/webhooks/order-created', async (req, res) => {
    verifySignature(req);

    const { data: order } = req.body;

    // Create fulfillment task
    const task = await FulfillmentTask.create({
      orderId: order._id,
      items: order.items,
      destination: order.shipping,
    });

    // Send webhook back when ready
    await sendWebhook(order.webhookUrl, 'fulfillment.ready', {
      orderId: order._id,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    res.json({ success: true });
  });
}

/*
INTERVIEW QUESTIONS:
Q: "How to handle webhook to service that's temporarily down?"
A: - Queue with retry (Bull, RabbitMQ)
   - Retry with exponential backoff
   - Max retries before failing
   - Alert ops if persistent failure
   - Dead letter queue for investigation

Q: "What if one service is slow?"
A: - Don't wait for it
   - Queue asynchronously
   - Set timeout (5 seconds typical)
   - Continue with other services
   - Retry for the slow one

Q: "How to order webhook processing?"
A: - Timestamps (not guaranteed order)
   - Process based on timestamp, not delivery
   - Check "is this older than current state?"
   - Ignore if outdated

Q: "What if webhook processing fails?"
A: - Log the error
   - Retry automatically
   - Alert after max retries
   - Store in dead letter queue
   - Human review possible
*/

// ============================================================
// SCENARIO 3: HIGH-SCALE WEBHOOK DELIVERY
// ============================================================

/*
SCENARIO: Deliver webhooks to 1 million users
- Need massive scale
- Handle failures gracefully
- Monitor and alert
- Optimize performance

SOLUTION: Advanced architecture
*/

function highScaleWebhookScenario() {
  // Batch webhook delivery
  class WebhookBatcher {
    constructor(batchSize = 100, batchTime = 5000) {
      this.batchSize = batchSize;
      this.batchTime = batchTime;
      this.batches = new Map(); // event -> array of webhooks
      this.timers = new Map();
    }

    add(event, data, webhooks) {
      if (!this.batches.has(event)) {
        this.batches.set(event, []);
      }

      this.batches.get(event).push({ data, webhooks, timestamp: Date.now() });

      // Flush if batch full
      if (this.batches.get(event).length >= this.batchSize) {
        this.flush(event);
      } else if (!this.timers.has(event)) {
        // Set timer to flush after delay
        this.timers.set(event, setTimeout(() => this.flush(event), this.batchTime));
      }
    }

    async flush(event) {
      const batch = this.batches.get(event) || [];
      this.batches.delete(event);

      if (this.timers.has(event)) {
        clearTimeout(this.timers.get(event));
        this.timers.delete(event);
      }

      if (batch.length === 0) return;

      // Send all webhooks in parallel
      const results = await Promise.allSettled(
        batch.map(item => this.sendBatch(event, item))
      );

      // Log metrics
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`Event: ${event}, Succeeded: ${succeeded}, Failed: ${failed}`);

      // Alert if high failure rate
      if (failed > batch.length * 0.05) {
        alertOps(`High webhook failure rate for ${event}`);
      }
    }

    async sendBatch(event, item) {
      const { data, webhooks } = item;

      const promises = webhooks.map(webhook =>
        this.sendWithRetry(webhook.url, event, data, webhook.secret)
      );

      return Promise.all(promises);
    }

    async sendWithRetry(url, event, data, secret) {
      // Implement with retries
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const payload = JSON.stringify({ event, data, timestamp: Date.now() });
          const signature = generateSignature(payload, secret);

          const response = await fetch(url, {
            method: 'POST',
            body: payload,
            headers: {
              'X-Webhook-Signature': signature,
            },
            timeout: 5000,
          });

          if (response.ok) return true;

          if (response.status >= 400 && response.status < 500) {
            throw new Error(`Client error: ${response.status}`);
          }

          throw new Error(`Server error: ${response.status}`);
        } catch (error) {
          if (attempt === 2) throw error;

          const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
          await sleep(delay);
        }
      }
    }
  }

  const batcher = new WebhookBatcher(100, 5000); // Batch 100 or wait 5s

  // Usage
  app.post('/events', (req, res) => {
    const event = req.body;
    const webhooks = getSubscribers(event.type);

    // Instead of sending immediately, batch
    batcher.add(event.type, event.data, webhooks);

    res.json({ queued: true });
  });
}

/*
INTERVIEW QUESTIONS:
Q: "How to deliver webhooks at massive scale?"
A: - Batch similar webhooks
   - Use message queues (Kafka, RabbitMQ)
   - Async workers
   - Rate limiting per subscriber
   - Geographic distribution
   - Load balancing

Q: "How to prevent DDoS via webhooks?"
A: - Rate limit per webhook
   - Maximum retries
   - Timeout on request
   - Signature verification
   - Blacklist unreachable endpoints

Q: "What's the optimal retry strategy?"
A: - Exponential backoff: 1s, 2s, 4s, 8s, 16s, 32s, etc.
   - Max 5-7 retries (too many = waste)
   - Jitter to prevent thundering herd
   - Consider deadline (don't retry indefinitely)

Q: "How to monitor webhook health?"
A: - Success/failure rate per webhook
   - P50, P95, P99 latency
   - Failed count by error type
   - Alert thresholds
   - Dashboard with metrics
*/

// ============================================================
// SCENARIO 4: WEBHOOK SECURITY
// ============================================================

/*
SCENARIO: Secure webhook system
- Prevent unauthorized access
- Prevent tampering
- Handle secrets securely
- Audit trail

SOLUTION: Security best practices
*/

function secureWebhookScenario() {
  // 1. SIGNATURE VERIFICATION
  function verifyWebhookSignature(req) {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    const body = req.rawBody; // Use raw body, not parsed

    // Verify timestamp (prevent replay attacks)
    const now = Date.now();
    const requestTime = parseInt(timestamp);

    if (Math.abs(now - requestTime) > 300000) { // 5 minutes
      throw new Error('Request too old (replay attack?)');
    }

    // Verify signature
    const payload = `${timestamp}.${body}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    return true;
  }

  // 2. RATE LIMITING
  const rateLimit = require('express-rate-limit');

  const webhookLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute per IP
    message: 'Too many webhook requests',
  });

  app.post('/webhook', webhookLimiter, (req, res) => {
    // ...
  });

  // 3. WEBHOOK ROTATION
  async function rotateWebhookSecret(webhookId) {
    const webhook = await db.webhooks.findById(webhookId);
    const oldSecret = webhook.secret;
    const newSecret = crypto.randomBytes(32).toString('hex');

    // Support both old and new for transition period
    webhook.secrets = [newSecret, oldSecret];
    webhook.rotatedAt = new Date();

    await db.webhooks.updateOne({ _id: webhookId }, webhook);

    // Notify user to update their endpoint
    await sendEmail(webhook.userId, {
      subject: 'Webhook secret rotated',
      message: `Old secret will expire in 30 days. Update your endpoint.`,
    });
  }

  // 4. AUDIT TRAIL
  async function logWebhookAccess(webhookId, action, result) {
    await db.webhookAudit.insertOne({
      webhookId,
      action, // 'sent', 'failed', 'retried'
      result, // 'success', 'failure'
      timestamp: new Date(),
      userId: webhook.userId,
    });
  }

  // 5. SECRET MANAGEMENT
  async function getWebhookSecret(webhookId) {
    // Don't store in code or env vars
    // Use secret management service (Vault, AWS Secrets Manager)
    const secret = await secretManager.get(`webhook-secret-${webhookId}`);
    return secret;
  }
}

/*
INTERVIEW QUESTIONS:
Q: "How to prevent replay attacks?"
A: - Include timestamp in signature
   - Verify timestamp is recent (within 5 minutes)
   - Reject old requests

Q: "How to rotate webhook secrets?"
A: - Generate new secret
   - Accept both old and new for transition
   - Set expiry on old secret
   - Notify user to update
   - Remove old after expiry

Q: "Where to store webhook secrets?"
A: - Use secret manager (Vault, AWS Secrets Manager)
   - Never commit to code
   - Never in logs
   - Encrypt at rest
   - Rotate periodically

Q: "How to audit webhook access?"
A: - Log every webhook delivery attempt
   - Store: timestamp, status, result
   - Track failed attempts
   - Alert on suspicious patterns
   - Compliance with regulations (PCI, HIPAA)
*/

// ============================================================
// SCENARIO 5: WEBHOOK TESTING
// ============================================================

/*
SCENARIO: How to test webhook system
- Unit tests
- Integration tests
- E2E tests
- Load tests
*/

function webhookTestingScenario() {
  // 1. MOCK WEBHOOK RECEIVER
  const mockServer = require('http').createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const data = JSON.parse(body);
        mockReceived.push(data);
        res.writeHead(200);
        res.end();
      });
    }
  });

  let mockReceived = [];

  // 2. UNIT TEST
  test('should verify webhook signature correctly', () => {
    const payload = JSON.stringify({ event: 'test' });
    const secret = 'test-secret';

    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const isValid = verifySignature(payload, signature, secret);
    expect(isValid).toBe(true);

    const invalidSig = 'invalid';
    expect(verifySignature(payload, invalidSig, secret)).toBe(false);
  });

  // 3. INTEGRATION TEST
  test('should process webhook and update database', async () => {
    const webhook = {
      id: 'wh_test',
      url: 'http://localhost:3001/webhook',
    };

    await sendWebhook(webhook.id, 'order.created', {
      orderId: '123',
      amount: 99.99,
    });

    // Wait for processing
    await wait(100);

    // Verify received
    expect(mockReceived.length).toBeGreaterThan(0);
    expect(mockReceived[0].event).toBe('order.created');
  });

  // 4. RETRY TEST
  test('should retry failed webhooks', async () => {
    let attempts = 0;
    const mockFailingServer = createServer((req, res) => {
      attempts++;
      if (attempts < 3) {
        res.writeHead(500);
        res.end('Error');
      } else {
        res.writeHead(200);
        res.end('OK');
      }
    });

    const result = await sendWebhookWithRetry(
      'http://localhost:3002/webhook',
      { event: 'test' },
      3
    );

    expect(result).toBe(true);
    expect(attempts).toBe(3);
  });

  // 5. IDEMPOTENCY TEST
  test('should not process duplicate webhook', async () => {
    const webhookId = 'wh_test_idem';
    const payload = { event: 'order.created', id: 'evt_123' };

    // Send twice with same ID
    const res1 = await sendWebhook(webhookId, payload);
    const res2 = await sendWebhook(webhookId, payload);

    expect(res1.success).toBe(true);
    expect(res2.success).toBe(true);

    // But only one order should exist
    const count = await db.orders.countDocuments();
    expect(count).toBe(1);
  });
}

export const WEBHOOK_SCENARIOS = {
  PAYMENT_PROCESSING: 'Stripe payment webhooks',
  MULTI_SERVICE: 'Multiple service integration',
  HIGH_SCALE: 'Million user scale',
  SECURITY: 'Security and compliance',
  TESTING: 'Comprehensive testing',
};
