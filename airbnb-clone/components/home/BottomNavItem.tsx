import Link from "next/link";

type BottomNavItemProps = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
};

export function BottomNavItem({
  icon,
  label,
  href,
  active = false,
}: BottomNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex flex-col items-center gap-1 text-xs ${
        active ? "text-rose-600" : "text-zinc-500"
      }`}
    >
      <span className="text-base" aria-hidden>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
