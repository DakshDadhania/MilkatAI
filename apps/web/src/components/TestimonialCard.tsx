type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-40px_rgba(139,92,246,0.45)] backdrop-blur">
      <p className="text-sm text-slate-200">"{quote}"</p>
      <div className="mt-6">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-slate-400">{role}</p>
      </div>
    </div>
  );
}
