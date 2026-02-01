import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function generateCode() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `MILKAT-${digits}`;
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { subscription: true },
  });

  if (!user || user.subscription?.status !== "active") {
    return NextResponse.json(
      { error: "Active subscription required." },
      { status: 403 }
    );
  }

  const code = generateCode();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 15);

  await prisma.accessCode.create({
    data: {
      userId: user.id,
      code,
      expiresAt,
    },
  });

  return NextResponse.json({ code, expiresAt });
}
