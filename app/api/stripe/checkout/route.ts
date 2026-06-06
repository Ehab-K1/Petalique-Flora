import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber, calculateTax } from "@/lib/utils";
import { TAX_RATE, SHIPPING_RATES } from "@/lib/constants";

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    image: z.string().optional(),
  })),
  customerEmail: z.string().email().optional(),
  deliveryDate: z.string().optional(),
  giftMessage: z.string().optional(),
  promoCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = checkoutSchema.parse(body);

    const subtotal = data.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal >= SHIPPING_RATES.FREE_THRESHOLD ? 0 : SHIPPING_RATES.STANDARD;
    const tax = calculateTax(subtotal, TAX_RATE);
    const total = subtotal + shipping + tax;
    const orderNumber = generateOrderNumber();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: data.customerEmail,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${baseUrl}/checkout?cancelled=true`,
      metadata: {
        orderNumber,
        deliveryDate: data.deliveryDate || "",
        giftMessage: data.giftMessage || "",
      },
      line_items: [
        ...data.items.map((item) => ({
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        ...(shipping > 0 ? [{
          price_data: {
            currency: "cad",
            product_data: { name: "Standard Delivery" },
            unit_amount: Math.round(shipping * 100),
          },
          quantity: 1,
        }] : []),
        {
          price_data: {
            currency: "cad",
            product_data: { name: "HST (13%)" },
            unit_amount: Math.round(tax * 100),
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["CA"],
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid checkout data." }, { status: 400 });
    }
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
