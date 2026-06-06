// ============================================================
// WEBHOOKS - COMPLETE INTERVIEW PREPARATION
// ============================================================

/**
 * Webhooks are critical for modern integrations
 * Used by Google, Meta, Stripe, AWS, TCS, Cognizant
 * Interview focus: Real-time events, reliability, security
 */

// ============================================================
// 1. WEBHOOK FUNDAMENTALS
// ============================================================

/*
Q1: What is a webhook?
A: Webhook is a callback/reverse API:
   - Server A sends HTTP POST to Server B
   - Triggered by events (payment, order, user created)
   - Server B receives real-time notifications
   - Alternative to polling

   Traditional API (Polling):
   ```
   Client asks: "Do you have updates?"
   Server: "No"
   (Client asks again in 5 seconds)
   (Wasteful, delayed)
   ```

   Webhook (Push):
   ```
   Event happens → Server A calls Server B immediately
   Server B gets notified in real-time
   (Efficient, instant)
   ```

Q2: What are the benefits of webhooks?
A: - Real-time event notification
   - No polling overhead
   - Reduces latency
   - Saves bandwidth
   - More scalable
   - Better user experience
   - Event-driven architecture

Q3: What are common webhook use cases?
A: 1. Payment processing: Stripe webhook for payment success
   2. Social media: GitHub webhook for push events
   3. Email: SendGrid webhook for bounce events
   4. E-commerce: Order status updates
   5. CI/CD: Deploy trigger on code push
   6. Integrations: Zapier automations
   7. Real-time notifications
   8. Analytics tracking

Q4: How does a webhook work step-by-step?
A: 1. User/System registers webhook URL (subscribe)
      Server B tells Server A: "Send me events to https://example.com/webhook"

   2. Event occurs
      User pays, order created, etc.

   3. Server A sends HTTP POST
      POST https://example.com/webhook
      Body: { event: "payment.success", data: {...} }

   4. Server B receives and processes
      Verify signature
      Update database
      Send confirmation

   5. Server B responds with 200 OK
      Server A considers webhook delivered

   6. Optional: Server A retries if fails
      If no 200 OK, retry (exponential backoff)

Q5: What's the difference between webhooks and APIs?
A: API (Pull):
   - Client initiates request
   - Synchronous
   - Client waits for response
   - Client polls for updates

   Webhook (Push):
   - Server initiates request
   - Asynchronous
   - Client receives notifications
   - Real-time updates

   Both can be used together!
*/

// ============================================================
// 2. WEBHOOK IMPLEMENTATION
// ============================================================

/*
Q6: How to implement a webhook receiver in Node.js?
A: ```javascript
   const express = require('express');
   const crypto = require('crypto');
   const app = express();

   app.use(express.json());

   app.post('/webhook', (req, res) => {
     // Verify webhook signature
     const signature = req.headers['x-webhook-signature'];
     const body = JSON.stringify(req.body);
     const secret = process.env.WEBHOOK_SECRET;

     const hash = crypto
       .createHmac('sha256', secret)
       .update(body)
       .digest('hex');

     if (signature !== hash) {
       return res.status(401).json({ error: 'Invalid signature' });
     }

     // Process event
     const { event, data } = req.body;

     switch(event) {
       case 'payment.success':
         handlePaymentSuccess(data);
         break;
       case 'order.created':
         handleOrderCreated(data);
         break;
     }

     // Respond quickly
     res.json({ success: true });
   });

   app.listen(3000);
   ```

Q7: How to send a webhook from a Node.js server?
A: ```javascript
   const axios = require('axios');
   const crypto = require('crypto');

   async function sendWebhook(webhookUrl, event, data) {
     const payload = { event, data, timestamp: Date.now() };
     const body = JSON.stringify(payload);

     // Create signature
     const signature = crypto
       .createHmac('sha256', process.env.WEBHOOK_SECRET)
       .update(body)
       .digest('hex');

     try {
       const response = await axios.post(webhookUrl, payload, {
         headers: {
           'Content-Type': 'application/json',
           'X-Webhook-Signature': signature,
         },
         timeout: 5000, // 5 second timeout
       });

       return response.status === 200;
     } catch (error) {
       console.error('Webhook failed:', error);
       return false;
     }
   }

   // Usage
   sendWebhook(
     'https://client.com/webhook',
     'payment.success',
     { orderId: '123', amount: 99.99 }
   );
   ```

Q8: How to handle webhook retries?
A: Exponential backoff with jitter:
   ```javascript
   async function sendWebhookWithRetry(url, payload, retries = 3) {
     for (let attempt = 0; attempt < retries; attempt++) {
       try {
         const response = await fetch(url, {
           method: 'POST',
           body: JSON.stringify(payload),
           timeout: 5000,
         });

         if (response.status === 200) return true;
       } catch (error) {
         console.log(`Attempt ${attempt + 1} failed`);

         if (attempt < retries - 1) {
           // Exponential backoff: 1s, 2s, 4s, 8s...
           const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
           // Add jitter to prevent thundering herd
           const jitter = Math.random() * 1000;
           await sleep(delay + jitter);
         }
       }
     }
     return false;
   }
   ```

Q9: What are webhook signature verification best practices?
A: ✅ ALWAYS verify signatures:
   ```javascript
   // Provider generates signature
   const signature = crypto
     .createHmac('sha256', secret)
     .update(requestBody)
     .digest('hex');

   // Headers include signature
   X-Webhook-Signature: sha256=abc123...

   // Receiver verifies
   const expectedSignature = crypto
     .createHmac('sha256', secret)
     .update(requestBody)
     .digest('hex');

   const isValid = signature === expectedSignature;
   ```

Q10: How to handle idempotency in webhooks?
A: Same webhook fired multiple times = process once
   ```javascript
   // Store processed webhook IDs
   const processedWebhooks = new Set();

   app.post('/webhook', (req, res) => {
     const webhookId = req.headers['x-webhook-id'];

     // Prevent duplicate processing
     if (processedWebhooks.has(webhookId)) {
       return res.json({ success: true, message: 'Already processed' });
     }

     // Process webhook
     processEvent(req.body);

     // Mark as processed
     processedWebhooks.add(webhookId);

     res.json({ success: true });
   });

   // Or use database
   async function processWebhook(webhookId, data) {
     const existing = await db.webhooks.findOne({ webhookId });
     if (existing) return; // Already processed

     // Process
     await handleEvent(data);

     // Store
     await db.webhooks.create({ webhookId, processedAt: new Date() });
   }
   ```
*/

// ============================================================
// 3. WEBHOOK SECURITY & BEST PRACTICES
// ============================================================

/*
Q11: What are webhook security concerns?
A: 1. ❌ Unverified webhooks
      Attacker sends fake webhook
      Solution: Verify signature

   2. ❌ MITM attacks
      Webhook intercepted
      Solution: Use HTTPS only

   3. ❌ Replay attacks
      Same webhook sent again
      Solution: Timestamp + idempotency key

   4. ❌ DDoS via webhooks
      Many webhooks overwhelm system
      Solution: Rate limiting, queuing

   5. ❌ Sensitive data exposure
      API keys in logs
      Solution: Never log sensitive data

Q12: How to secure webhooks?
A: ✅ DO:
   1. Verify signature (HMAC)
   2. Use HTTPS only
   3. Include timestamp
   4. Validate data types
   5. Use idempotency keys
   6. Rate limit
   7. Log securely
   8. Store securely
   9. Handle timeouts
   10. Implement retries

   ❌ DON'T:
   1. Trust unverified webhooks
   2. Use HTTP
   3. Log sensitive data
   4. Store keys in code
   5. Process immediately without validation
   6. Have unbounded retry time

Q13: How to implement webhook retries with exponential backoff?
A: ```javascript
   const RETRY_CONFIG = {
     maxRetries: 5,
     baseDelay: 1000,    // 1 second
     maxDelay: 300000,   // 5 minutes
     jitterFactor: 0.1,  // 10% jitter
   };

   async function webhookQueue(webhookUrl, payload) {
     let attempt = 0;

     while (attempt < RETRY_CONFIG.maxRetries) {
       try {
         const response = await fetch(webhookUrl, {
           method: 'POST',
           body: JSON.stringify(payload),
           headers: { 'Content-Type': 'application/json' },
           timeout: 5000,
         });

         if (response.ok) {
           console.log('Webhook delivered');
           return { success: true };
         }

         if (response.status >= 400 && response.status < 500) {
           // Client error - don't retry
           return { success: false, error: 'Client error' };
         }

         throw new Error(`HTTP ${response.status}`);
       } catch (error) {
         attempt++;

         if (attempt >= RETRY_CONFIG.maxRetries) {
           return { success: false, error: 'Max retries exceeded' };
         }

         // Calculate delay with exponential backoff + jitter
         const exponentialDelay = Math.min(
           RETRY_CONFIG.baseDelay * Math.pow(2, attempt),
           RETRY_CONFIG.maxDelay
         );
         const jitter = exponentialDelay * RETRY_CONFIG.jitterFactor * Math.random();
         const delay = exponentialDelay + jitter;

         console.log(`Retry ${attempt}/${RETRY_CONFIG.maxRetries} in ${delay}ms`);
         await new Promise(r => setTimeout(r, delay));
       }
     }
   }
   ```

Q14: What's the difference between webhooks and WebSockets?
A: Webhooks:
   - One-way: Server → Client
   - Event-triggered
   - HTTP POST
   - Asynchronous
   - Good for notifications

   WebSockets:
   - Two-way: Both directions
   - Real-time bidirectional
   - Persistent connection
   - Synchronous
   - Good for chat, live updates

   Use case:
   - Webhook: "You got an order" notification
   - WebSocket: Live chat or stock price updates

Q15: How to implement webhook event queuing?
A: Use message queue for reliability:
   ```javascript
   const Bull = require('bull');
   const webhookQueue = new Bull('webhooks');

   // Producer: Add webhook to queue
   app.post('/api/orders', async (req, res) => {
     const order = await createOrder(req.body);

     // Add to queue instead of sending immediately
     await webhookQueue.add({
       event: 'order.created',
       url: 'https://client.com/webhook',
       data: order,
     });

     res.json(order);
   });

   // Consumer: Process webhooks from queue
   webhookQueue.process(async (job) => {
     const { event, url, data } = job.data;

     const success = await sendWebhookWithRetry(url, {
       event,
       data,
       timestamp: Date.now(),
     });

     if (!success) {
       throw new Error('Failed to deliver webhook');
       // Bull automatically retries
     }
   });

   webhookQueue.on('failed', (job, error) => {
     console.error(`Job ${job.id} failed:`, error);
     // Alert or log for manual intervention
   });
   ```
*/

// ============================================================
// 4. WEBHOOK MANAGEMENT & PATTERNS
// ============================================================

/*
Q16: How to manage webhook subscriptions?
A: Store in database:
   ```javascript
   // Webhook schema
   {
     id: 'wh_abc123',
     userId: 'user_123',
     url: 'https://client.com/webhook',
     events: ['order.created', 'payment.success'],
     secret: 'whsec_abc123', // For signing
     active: true,
     createdAt: '2024-01-01',
     lastDeliveredAt: '2024-01-15',
     deliveryAttempts: 12,
     failureCount: 0,
   }
   ```

   API endpoints:
   ```javascript
   // Register webhook
   POST /webhooks
   { url: 'https://...', events: ['order.created'] }

   // List webhooks
   GET /webhooks

   // Update webhook
   PATCH /webhooks/:id
   { events: ['order.created', 'payment.success'] }

   // Delete webhook
   DELETE /webhooks/:id

   // Get webhook attempts/logs
   GET /webhooks/:id/logs
   ```

Q17: How to handle webhook failure scenarios?
A: ```javascript
   async function handleWebhookFailure(webhook, error, attempt) {
     const maxAttempts = 5;

     if (attempt >= maxAttempts) {
       // Permanently failed
       await db.webhooks.update(webhook.id, {
         active: false,
         failureReason: error.message,
         lastFailedAt: new Date(),
       });

       // Alert user
       await sendAlertEmail(webhook.userId, {
         subject: 'Webhook endpoint not responding',
         webhook: webhook.url,
       });

       return;
     }

     // Schedule retry
     const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
     scheduleRetry(webhook, delay);
   }
   ```

Q18: What's webhook testing best practices?
A: ```javascript
   // Test webhook receiver
   describe('Webhook Receiver', () => {
     it('should verify webhook signature', async () => {
       const payload = { event: 'order.created' };
       const signature = crypto
         .createHmac('sha256', secret)
         .update(JSON.stringify(payload))
         .digest('hex');

       const response = await request(app)
         .post('/webhook')
         .set('X-Webhook-Signature', signature)
         .send(payload);

       expect(response.status).toBe(200);
     });

     it('should reject invalid signature', async () => {
       const response = await request(app)
         .post('/webhook')
         .set('X-Webhook-Signature', 'invalid')
         .send({ event: 'order.created' });

       expect(response.status).toBe(401);
     });

     it('should handle duplicate webhooks', async () => {
       const payload = { event: 'order.created', id: '123' };

       const res1 = await sendWebhook(payload);
       const res2 = await sendWebhook(payload); // Same ID

       expect(res1.status).toBe(200);
       expect(res2.status).toBe(200); // Both succeed
       expect(await getOrderCount()).toBe(1); // But only 1 order created
     });
   });

   // Test webhook sender
   it('should retry failed webhooks', async () => {
     let attempts = 0;
     const mockServer = nock('https://client.com')
       .post('/webhook')
       .times(2)
       .reply(() => {
         attempts++;
         if (attempts < 2) return [500, 'Error'];
         return [200, 'OK'];
       });

     const result = await sendWebhookWithRetry(
       'https://client.com/webhook',
       { event: 'test' }
     );

     expect(result).toBe(true);
     expect(attempts).toBe(2);
   });
   ```

Q19: How to monitor webhook delivery?
A: ```javascript
   // Webhook delivery dashboard
   const webhookStats = {
     totalSent: 1000,
     successRate: 99.2,
     failedCount: 8,
     avgDeliveryTime: 150, // ms
     p95DeliveryTime: 500,
     p99DeliveryTime: 2000,
     retriesNeeded: 120, // Webhooks that needed retry
   };

   // Track metrics
   app.post('/webhook/:id/attempt', async (req, res) => {
     const { success, deliveryTime, attempt } = req.body;

     await db.webhookMetrics.create({
       webhookId: req.params.id,
       success,
       deliveryTime,
       attempt,
       timestamp: new Date(),
     });

     // Alert if failure rate high
     const recent = await getRecentMetrics(req.params.id, 100);
     const failureRate = recent.filter(m => !m.success).length / recent.length;

     if (failureRate > 0.05) {
       alertOps('High webhook failure rate', { webhookId, failureRate });
     }
   });
   ```

Q20: How to handle webhook versioning?
A: ```javascript
   // Include version in payload
   {
     version: 'v2',
     event: 'order.created',
     data: {
       orderId: '123',
       // v2 fields
       customerId: 'cust_123',
       status: 'pending',
     },
     timestamp: 1704067200,
   }

   // OR different endpoints per version
   POST /webhooks/v1
   POST /webhooks/v2

   // Client specifies version when registering
   {
     url: 'https://client.com/webhook',
     version: 'v2',
     events: ['order.created'],
   }
   ```
*/

// ============================================================
// 5. REAL-WORLD WEBHOOK EXAMPLES
// ============================================================

/*
Q21: Stripe webhook example
A: ```javascript
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

   app.post('/stripe-webhook', express.raw({type: 'application/json'}), (req, res) => {
     const sig = req.headers['stripe-signature'];

     let event;

     try {
       event = stripe.webhooks.constructEvent(
         req.body,
         sig,
         process.env.STRIPE_WEBHOOK_SECRET
       );
     } catch (err) {
       return res.status(400).send(\`Webhook Error: \${err.message}\`);
     }

     switch(event.type) {
       case 'payment_intent.succeeded':
         const paymentIntent = event.data.object;
         handlePaymentSuccess(paymentIntent);
         break;

       case 'payment_intent.payment_failed':
         const failedPayment = event.data.object;
         handlePaymentFailure(failedPayment);
         break;

       case 'charge.refunded':
         const refund = event.data.object;
         handleRefund(refund);
         break;
     }

     res.json({received: true});
   });
   ```

Q22: GitHub webhook example
A: ```javascript
   app.post('/github-webhook', (req, res) => {
     const signature = req.headers['x-hub-signature'];
     const payload = req.body;

     // Verify signature
     const hash = crypto
       .createHmac('sha1', process.env.GITHUB_SECRET)
       .update(JSON.stringify(payload))
       .digest('hex');

     if (signature !== \`sha1=\${hash}\`) {
       return res.status(401).json({ error: 'Invalid signature' });
     }

     const event = req.headers['x-github-event'];

     switch(event) {
       case 'push':
         handlePush(payload);
         break;
       case 'pull_request':
         handlePullRequest(payload);
         break;
       case 'issues':
         handleIssue(payload);
         break;
     }

     res.json({ success: true });
   });

   function handlePush(payload) {
     const { repository, ref, commits } = payload;
     console.log(\`Push to \${repository.name}:\${ref}\`);
     commits.forEach(commit => {
       console.log(\`- \${commit.message}\`);
     });

     // Trigger CI/CD pipeline
     triggerDeployment(repository.name, ref);
   }
   ```

Q23: E-commerce webhook flow
A: ```javascript
   // Order created → Send webhook to fulfillment service
   app.post('/orders', async (req, res) => {
     const order = await Order.create(req.body);

     // Send webhook to multiple services
     await webhookQueue.add({
       event: 'order.created',
       subscribers: [
         'https://fulfillment.service/webhook',
         'https://analytics.service/webhook',
         'https://notification.service/webhook',
       ],
       data: order,
     });

     res.json(order);
   });

   // Fulfillment service processes order
   app.post('/webhook', async (req, res) => {
     const { event, data } = req.body;

     if (event === 'order.created') {
       // Pick & pack order
       await pickAndPack(data.id);

       // Send status webhook back
       await sendWebhook(process.env.MERCHANT_WEBHOOK_URL, {
         event: 'fulfillment.started',
         orderId: data.id,
         estimatedShip: new Date(Date.now() + 24*60*60*1000),
       });
     }

     res.json({ success: true });
   });
   ```

Q24: Real-time notification webhook
A: ```javascript
   // User action triggers webhook
   app.post('/users/update', async (req, res) => {
     const user = await User.findByIdAndUpdate(req.params.id, req.body);

     // Notify user's connected clients via webhook
     const webhookSubscribers = await db.webhooks.find({
       userId: user.id,
       events: 'user.updated',
     });

     for (const webhook of webhookSubscribers) {
       await webhookQueue.add({
         url: webhook.url,
         event: 'user.updated',
         data: user,
       });
     }

     res.json(user);
   });
   ```

Q25: Batch webhook processing
A: ```javascript
   // Instead of sending webhook for every event,
   // batch them and send periodically

   const eventBuffer = [];
   const BATCH_SIZE = 100;
   const BATCH_TIMEOUT = 5000; // 5 seconds

   async function addEvent(event) {
     eventBuffer.push(event);

     if (eventBuffer.length >= BATCH_SIZE) {
       await flushBatch();
     }
   }

   // Flush every 5 seconds or when full
   setInterval(flushBatch, BATCH_TIMEOUT);

   async function flushBatch() {
     if (eventBuffer.length === 0) return;

     const batch = eventBuffer.splice(0, BATCH_SIZE);

     for (const webhook of allWebhooks) {
       await webhookQueue.add({
         url: webhook.url,
         events: batch,
         timestamp: Date.now(),
       });
     }
   }

   // Client receives batch
   app.post('/webhook', (req, res) => {
     const { events } = req.body;

     // Process multiple events at once
     events.forEach(event => {
       handleEvent(event);
     });

     res.json({ processed: events.length });
   });
   ```
*/

// ============================================================
// WEBHOOK INTERVIEW TIPS
// ============================================================

/*
TCS/Cognizant (Junior to Mid):
- Know webhook basics
- Understand event-driven architecture
- Can implement simple webhook receiver
- Know security concerns

Big4 (Mid to Senior):
- Complex webhook patterns
- High-scale delivery
- Reliability and retry logic
- Real-time systems
- Monitoring and debugging
- Database storage patterns

Most asked questions:

1. "What's the difference between webhooks and APIs?"
   - Webhooks are push (server initiates)
   - APIs are pull (client initiates)

2. "How to ensure webhook reliability?"
   - Retries with exponential backoff
   - Idempotency keys
   - Persistent storage
   - Monitoring

3. "How to secure webhooks?"
   - HMAC signature verification
   - HTTPS only
   - Timestamp validation
   - Rate limiting

4. "How to handle webhook failures?"
   - Retry logic
   - Exponential backoff
   - Dead letter queue
   - Manual intervention

5. "How to scale webhook delivery?"
   - Message queue (RabbitMQ, SQS)
   - Batch processing
   - Async workers
   - Rate limiting per subscriber

6. "How to test webhooks?"
   - Mock webhook receivers
   - Verify signature
   - Test retries
   - Test idempotency
*/

export const WEBHOOK_INTERVIEW_TOPICS = {
  FUNDAMENTALS: [1, 2, 3, 4, 5],
  IMPLEMENTATION: [6, 7, 8, 9, 10],
  SECURITY: [11, 12, 13, 14, 15],
  PATTERNS: [16, 17, 18, 19, 20],
  REAL_WORLD: [21, 22, 23, 24, 25],
};
