import { CategoryChip } from "@/components/home/CategoryChip";
import type { CategoryItem } from "@/types/home";

type CategoryScrollerProps = {
  items: CategoryItem[];
};

export function CategoryScroller({ items }: CategoryScrollerProps) {
  return (
    <div className="overflow-x-auto px-4 pb-3">
      <div className="flex w-max gap-2">
        {items.map((item) => (
          <CategoryChip key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
