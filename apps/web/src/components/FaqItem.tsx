type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-zinc-900">{question}</h3>
      <p className="mt-2 text-sm text-zinc-600">{answer}</p>
    </div>
  );
}
