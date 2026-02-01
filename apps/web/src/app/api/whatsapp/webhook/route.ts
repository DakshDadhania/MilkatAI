import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

type WhatsAppWebhookBody = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from?: string;
          text?: { body?: string };
        }>;
      };
    }>;
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as WhatsAppWebhookBody;
  const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  const from = message?.from;
  const text = message?.text?.body?.trim();

  if (!from || !text) {
    return NextResponse.json({ ok: true });
  }

  const normalized = text?.toUpperCase() ?? "";

  const linked = await prisma.whatsAppLink.findFirst({
    where: { phone: from },
    include: { user: { include: { subscription: true } } },
  });

  if (linked?.user) {
    const status = linked.user.subscription?.status ?? "inactive";
    if (normalized === "HELP") {
      await sendWhatsAppMessage(
        from,
        "Commands: HELP, STATUS, UPLOAD, REPORT <ID>. Reply STATUS to check your subscription."
      );
      return NextResponse.json({ ok: true });
    }
    if (normalized === "STATUS") {
      await sendWhatsAppMessage(
        from,
        `Your subscription status is: ${status}.`
      );
      return NextResponse.json({ ok: true });
    }
    if (normalized.startsWith("REPORT")) {
      await sendWhatsAppMessage(
        from,
        "Report fetching is coming soon. Use the dashboard to view reports."
      );
      return NextResponse.json({ ok: true });
    }
    if (normalized === "UPLOAD") {
      await sendWhatsAppMessage(
        from,
        "Upload documents at https://milkatai.com/upload to get your AI report."
      );
      return NextResponse.json({ ok: true });
    }
    await sendWhatsAppMessage(
      from,
      "Command not recognized. Reply HELP for available commands."
    );
    return NextResponse.json({ ok: true });
  }

  const accessCode = await prisma.accessCode.findFirst({
    where: {
      code: text,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: {
      user: {
        include: { subscription: true },
      },
    },
  });

  if (!accessCode?.user || accessCode.user.subscription?.status !== "active") {
    await sendWhatsAppMessage(
      from,
      "Invalid code. Reply HELP for commands or generate a new access code in your MilkatAI dashboard."
    );
    return NextResponse.json({ ok: true });
  }

  await prisma.whatsAppLink.upsert({
    where: {
      userId_phone: {
        userId: accessCode.userId,
        phone: from,
      },
    },
    update: {
      linkedAt: new Date(),
    },
    create: {
      userId: accessCode.userId,
      phone: from,
    },
  });

  await prisma.accessCode.update({
    where: { id: accessCode.id },
    data: { usedAt: new Date() },
  });

  await sendWhatsAppMessage(
    from,
    "Your WhatsApp number is linked to MilkatAI. Reply HELP for commands."
  );

  return NextResponse.json({ ok: true });
}
