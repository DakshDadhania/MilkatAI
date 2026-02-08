type FeatureCardProps = {
  title: string;
  items: string[];
};

export function FeatureCard({ title, items }: FeatureCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-40px_rgba(139,92,246,0.5)] backdrop-blur">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
