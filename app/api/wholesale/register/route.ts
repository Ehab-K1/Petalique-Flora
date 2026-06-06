import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  businessName: z.string().min(1),
  website: z.string().url().optional().or(z.literal("")),
  taxNumber: z.string().optional(),
  businessType: z.string().optional(),
  notes: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) {
      return NextResponse.json({ error: "Account already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: "WHOLESALE",
      },
    });

    await prisma.wholesaleAccount.create({
      data: {
        userId: user.id,
        businessName: data.businessName,
        website: data.website || null,
        taxNumber: data.taxNumber || null,
        status: "PENDING",
        tier: "BRONZE",
        notes: data.notes ? `Type: ${data.businessType || "Unknown"}\n\n${data.notes}` : null,
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }
    console.error("Wholesale register error:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
