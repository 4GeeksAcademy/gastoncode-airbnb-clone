type RatingPillProps = {
  value: string;
};

export function RatingPill({ value }: RatingPillProps) {
  return (
    <span className="rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white">
      ★ {value}
    </span>
  );
}
