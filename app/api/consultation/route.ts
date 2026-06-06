import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendConsultationEmail } from "@/server/services/email";

const consultationSchema = z.object({
  type: z.enum(["WEDDING", "EVENT", "CORPORATE", "CUSTOM"]),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  weddingDate: z.string().optional(),
  venue: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  vision: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = consultationSchema.parse(body);

    const consultation = await prisma.consultation.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        weddingDate: data.weddingDate ? new Date(data.weddingDate) : null,
        venue: data.venue,
        guestCount: data.guestCount ? parseInt(data.guestCount) : null,
        budget: data.budget,
        vision: data.vision,
        status: "NEW",
      },
    });

    // Send confirmation email (non-blocking)
    sendConsultationEmail(consultation).catch(console.error);

    return NextResponse.json({ id: consultation.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }
    console.error("Consultation error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
