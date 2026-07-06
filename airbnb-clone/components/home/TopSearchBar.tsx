import { IconCircleButton } from "@/components/home/IconCircleButton";

type TopSearchBarProps = {
  placeholder: string;
};

export function TopSearchBar({ placeholder }: TopSearchBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-white px-4 pt-4 pb-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-11 flex-1 items-center rounded-full border border-zinc-200 px-4 text-left text-sm text-zinc-500 shadow-sm"
        >
          <span className="mr-2 text-zinc-400">⌕</span>
          {placeholder}
        </button>
        <IconCircleButton icon="⚙" label="Abrir filtros" />
      </div>
    </div>
  );
}
