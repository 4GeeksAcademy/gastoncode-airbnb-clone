import type { CategoryItem } from "@/types/home";

type CategoryChipProps = {
  item: CategoryItem;
};

export function CategoryChip({ item }: CategoryChipProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700"
    >
      <span aria-hidden>{item.icon}</span>
      <span>{item.label}</span>
    </button>
  );
}
