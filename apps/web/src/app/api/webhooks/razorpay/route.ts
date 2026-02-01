import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function verifySignature(body: string, signature: string | null) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expected === signature;
}

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");
  const rawBody = await request.text();

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(rawBody) as {
    event?: string;
    payload?: {
      payment?: { entity?: { id?: string; status?: string; order_id?: string } };
    };
  };

  const paymentEntity = payload.payload?.payment?.entity;
  if (!paymentEntity?.order_id) {
    return NextResponse.json({ ok: true });
  }

  const payment = await prisma.payment.findFirst({
    where: { providerOrder: paymentEntity.order_id },
  });

  if (!payment) {
    return NextResponse.json({ ok: true });
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      providerPayId: paymentEntity.id,
      status: paymentEntity.status ?? payload.event ?? "captured",
    },
  });

  if (paymentEntity.status === "captured" || payload.event === "payment.captured") {
    const startAt = new Date();
    const endAt = new Date();
    endAt.setDate(endAt.getDate() + 30);

    await prisma.subscription.upsert({
      where: { userId: payment.userId },
      update: {
        status: "active",
        startAt,
        endAt,
      },
      create: {
        userId: payment.userId,
        status: "active",
        startAt,
        endAt,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
