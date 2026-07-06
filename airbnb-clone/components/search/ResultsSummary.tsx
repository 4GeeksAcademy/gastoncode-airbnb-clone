type ResultsSummaryProps = {
  text: string;
};

export function ResultsSummary({ text }: ResultsSummaryProps) {
  return <p className="px-4 pb-2 text-xs text-zinc-500">{text}</p>;
}
