import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/server/services/email";
import { generateOrderNumber, generateInvoiceNumber } from "@/lib/utils";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderNumber = session.metadata?.orderNumber || generateOrderNumber();

        // Create order record
        const order = await prisma.order.create({
          data: {
            orderNumber,
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string,
            status: "CONFIRMED",
            paymentStatus: "PAID",
            guestEmail: session.customer_details?.email,
            guestName: session.customer_details?.name,
            subtotal: (session.amount_subtotal || 0) / 100,
            tax: 0,
            shipping: 0,
            total: (session.amount_total || 0) / 100,
            currency: session.currency?.toUpperCase() || "CAD",
            deliveryDate: session.metadata?.deliveryDate
              ? new Date(session.metadata.deliveryDate)
              : null,
            giftMessage: session.metadata?.giftMessage || null,
          },
        });

        // Create invoice
        await prisma.invoice.create({
          data: {
            orderId: order.id,
            invoiceNumber: generateInvoiceNumber(),
            status: "PAID",
            paidAt: new Date(),
            subtotal: order.subtotal,
            tax: order.tax,
            total: order.total,
          },
        });

        // Send confirmation email
        await sendOrderConfirmationEmail({
          orderNumber: order.orderNumber,
          guestEmail: order.guestEmail,
          total: Number(order.total),
          items: [],
          customerName: order.guestName || undefined,
        });

        break;
      }

      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        await prisma.order.updateMany({
          where: { stripePaymentId: pi.id },
          data: { paymentStatus: "FAILED" },
        });
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        if (charge.payment_intent) {
          await prisma.order.updateMany({
            where: { stripePaymentId: charge.payment_intent as string },
            data: { paymentStatus: "REFUNDED", status: "REFUNDED" },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
