const express = require('express');
const Stripe = require('stripe');
const { auth } = require('../middleware/auth');
const db = require('../config/db');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  monthly: {
    name: 'Monthly Plan',
    price: 9.99,
    currency: 'usd',
    interval: 'month'
  },
  yearly: {
    name: 'Yearly Plan',
    price: 99.99,
    currency: 'usd',
    interval: 'year'
  }
};

router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const { plan } = req.body;
    const selectedPlan = PLANS[plan];
    
    if (!selectedPlan) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: selectedPlan.currency,
            product_data: {
              name: selectedPlan.name,
            },
            recurring: {
              interval: selectedPlan.interval,
            },
            unit_amount: Math.round(selectedPlan.price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/pricing?canceled=true`,
      metadata: {
        userId: req.user.id,
        plan: plan
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    res.status(500).json({ message: 'Failed to create checkout session' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret'
    );
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const { userId, plan } = session.metadata;
      
      const newSubscription = {
        id: require('crypto').randomUUID(),
        user_id: userId,
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        plan: plan,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      db.mockData.subscriptions.push(newSubscription);
      console.log('Subscription created:', newSubscription);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const existingSub = db.mockData.subscriptions.find(s => s.stripe_subscription_id === subscription.id);
      if (existingSub) {
        existingSub.status = subscription.status;
        existingSub.updated_at = new Date().toISOString();
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const existingSub = db.mockData.subscriptions.find(s => s.stripe_subscription_id === subscription.id);
      if (existingSub) {
        existingSub.status = 'canceled';
        existingSub.updated_at = new Date().toISOString();
      }
      break;
    }
  }

  res.json({ received: true });
});

router.get('/portal', auth, async (req, res) => {
  try {
    const subscription = db.mockData.subscriptions.find(s => s.user_id === req.user.id && s.status === 'active');
    
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    res.status(500).json({ message: 'Failed to create portal session' });
  }
});

router.get('/plans', async (req, res) => {
  res.json(Object.entries(PLANS).map(([key, plan]) => ({
    id: key,
    ...plan
  })));
});

router.get('/my', auth, async (req, res) => {
  const subscription = db.mockData.subscriptions.find(
    s => s.user_id === req.user.id && s.status === 'active'
  );
  
  if (subscription) {
    res.json(subscription);
  } else {
    res.json(null);
  }
});

module.exports = router;
