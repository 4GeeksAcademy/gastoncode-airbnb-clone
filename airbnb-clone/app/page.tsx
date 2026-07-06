import { BottomNav } from "@/components/home/BottomNav";
import { CategoryScroller } from "@/components/home/CategoryScroller";
import { InspirationSection } from "@/components/home/InspirationSection";
import { ListingSection } from "@/components/home/ListingSection";
import { MobileFrame } from "@/components/home/MobileFrame";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TopSearchBar } from "@/components/home/TopSearchBar";
import {
  activeInspirationTab,
  categoryItems,
  footerGroups,
  inspirationLinks,
  inspirationTabs,
  listingSections,
} from "@/data/home";

export default function Home() {
  return (
    <div className="bg-zinc-100 py-4 sm:py-8">
      <MobileFrame>
        <TopSearchBar placeholder="Empieza la busqueda" />
        <CategoryScroller items={categoryItems} />

        <main className="pb-4">
          {listingSections.map((section) => (
            <ListingSection key={section.id} section={section} />
          ))}

          <InspirationSection
            tabs={inspirationTabs}
            activeTab={activeInspirationTab}
            links={inspirationLinks}
          />

          <SiteFooter groups={footerGroups} />
        </main>
      </MobileFrame>

      <BottomNav />
    </div>
  );
}
