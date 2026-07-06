import type { FooterLinkGroup as FooterLinkGroupType } from "@/types/home";

type FooterLinkGroupProps = {
  group: FooterLinkGroupType;
};

export function FooterLinkGroup({ group }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-zinc-900">{group.title}</h3>
      <ul className="space-y-1 text-sm text-zinc-600">
        {group.links.map((link) => (
          <li key={link}>
            <button type="button" className="text-left hover:text-zinc-900">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
