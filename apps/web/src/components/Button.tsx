import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export function Button({
  href,
  onClick,
  variant = "primary",
  children,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-500/30 hover:brightness-110"
      : "border border-white/20 text-white/80 hover:bg-white/10";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${base} ${styles}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}
