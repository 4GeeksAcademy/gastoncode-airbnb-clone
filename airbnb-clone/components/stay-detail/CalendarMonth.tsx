type CalendarMonthProps = {
  monthLabel: string;
  days: Array<number | null>;
};

const weekdays = ["L", "M", "X", "J", "V", "S", "D"];

export function CalendarMonth({ monthLabel, days }: CalendarMonthProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-3">
      <h3 className="text-sm font-semibold text-zinc-900">{monthLabel}</h3>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-500">
        {weekdays.map((day) => (
          <span key={`${monthLabel}-${day}`}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs text-zinc-700">
        {days.map((day, index) => (
          <span
            key={`${monthLabel}-${index}`}
            className={`inline-flex h-7 items-center justify-center rounded-full ${
              day ? "hover:bg-zinc-100" : ""
            }`}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}
