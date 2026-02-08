import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardOverview } from "@/components/DashboardOverview";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { subscription: true },
  });

  const status = user?.subscription?.status ?? "inactive";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardOverview status={status} />
    </div>
  );
}
