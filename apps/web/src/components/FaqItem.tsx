type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <h3 className="text-sm font-semibold text-white">{question}</h3>
      <p className="mt-2 text-sm text-slate-300">{answer}</p>
    </div>
  );
}
