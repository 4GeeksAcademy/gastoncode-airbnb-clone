import { FooterLinkGroup } from "@/components/home/FooterLinkGroup";
import type { FooterLinkGroup as FooterLinkGroupType } from "@/types/home";

type SiteFooterProps = {
  groups: FooterLinkGroupType[];
};

export function SiteFooter({ groups }: SiteFooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 px-4 py-8 pb-24">
      <div className="space-y-5">
        {groups.map((group) => (
          <FooterLinkGroup key={group.id} group={group} />
        ))}
      </div>
      <div className="mt-7 space-y-2 border-t border-zinc-200 pt-4 text-xs text-zinc-600">
        <p>Espanol · $U UYU</p>
        <p>© 2026 Airbnb, Inc.</p>
        <p>Privacidad · Terminos</p>
      </div>
    </footer>
  );
}
