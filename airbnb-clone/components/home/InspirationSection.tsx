import { InspirationLinks } from "@/components/home/InspirationLinks";
import { InspirationTabs } from "@/components/home/InspirationTabs";

type InspirationSectionProps = {
  tabs: string[];
  activeTab: string;
  links: string[];
};

export function InspirationSection({
  tabs,
  activeTab,
  links,
}: InspirationSectionProps) {
  return (
    <section className="border-t border-zinc-200 px-4 py-7">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900">
        Inspiracion para escapadas futuras
      </h2>
      <InspirationTabs tabs={tabs} activeTab={activeTab} />
      <div className="mt-4">
        <InspirationLinks links={links} />
      </div>
    </section>
  );
}
