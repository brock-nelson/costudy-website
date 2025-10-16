import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan, billing = 'monthly', isStudent = false } = body;

    if (plan !== 'pro') {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Calculate pricing based on student status and billing cycle
    let unitAmount: number;
    let interval: 'month' | 'year';
    let productDescription: string;

    if (billing === 'annual') {
      interval = 'year';
      unitAmount = isStudent ? 7900 : 9900; // $79 or $99 per year
      productDescription = isStudent
        ? 'Unlimited study groups, advanced features, priority support (Student Annual Plan - Save 17%)'
        : 'Unlimited study groups, advanced features, priority support (Annual Plan - Save 17%)';
    } else {
      interval = 'month';
      unitAmount = isStudent ? 799 : 999; // $7.99 or $9.99 per month
      productDescription = isStudent
        ? 'Unlimited study groups, advanced features, priority support (Student Monthly Plan)'
        : 'Unlimited study groups, advanced features, priority support (Monthly Plan)';
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CoStudy Pro',
              description: productDescription,
            },
            unit_amount: unitAmount,
            recurring: {
              interval,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      customer_email: session.user.email || undefined,
      metadata: {
        userId: session.user.id || '',
        plan: 'pro',
        billing,
        isStudent: isStudent.toString(),
      },
      // 14-day free trial
      subscription_data: {
        trial_period_days: 14,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
