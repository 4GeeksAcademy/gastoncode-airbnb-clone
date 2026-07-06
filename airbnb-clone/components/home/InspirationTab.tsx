type InspirationTabProps = {
  label: string;
  active?: boolean;
};

export function InspirationTab({ label, active = false }: InspirationTabProps) {
  return (
    <button
      type="button"
      className={`pb-2 text-sm transition ${
        active
          ? "border-b-2 border-zinc-900 font-semibold text-zinc-900"
          : "text-zinc-500"
      }`}
    >
      {label}
    </button>
  );
}
