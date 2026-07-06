import Link from "next/link";

type SectionHeaderProps = {
  title: string;
};

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold leading-tight text-zinc-900">{title}</h2>
      <Link
        href="/busqueda"
        aria-label={`Ver mas sobre ${title}`}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-sm text-zinc-700"
      >
        →
      </Link>
    </div>
  );
}
