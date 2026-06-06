import Stripe from "stripe";

function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

export async function createCheckoutSession({
  items,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata,
}: {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    line_items: items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ["CA"],
    },
    automatic_tax: { enabled: false },
    allow_promotion_codes: true,
  });

  return session;
}

export async function createPaymentIntent({
  amount,
  currency = "cad",
  metadata,
}: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    metadata,
    automatic_payment_methods: { enabled: true },
  });
}
