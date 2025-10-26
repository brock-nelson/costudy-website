import Stripe from 'stripe';

// Lazy Stripe initialization - only initialize when actually used
let _stripe: Stripe | null = null;

function getStripe() {
  if (_stripe) return _stripe;

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }

  _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
    typescript: true,
  });

  return _stripe;
}

// Export stripe as a proxy that lazily initializes
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const realStripe = getStripe();
    return realStripe[prop as keyof typeof realStripe];
  }
});

export const STRIPE_PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly', // Will need to create in Stripe dashboard
    amount: 900, // $9.00 in cents
    interval: 'month',
  },
} as const;
