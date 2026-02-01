import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRazorpayClient } from "@/lib/razorpay";

type OrderRequest = {
  amount?: number;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as OrderRequest;
  const amount = body.amount ?? 199900;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const razorpay = getRazorpayClient();
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `milkatai_${user.id}_${Date.now()}`,
  });

  await prisma.payment.create({
    data: {
      userId: user.id,
      provider: "razorpay",
      providerOrder: order.id,
      amount,
      currency: "INR",
      status: "created",
    },
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID,
  });
}
