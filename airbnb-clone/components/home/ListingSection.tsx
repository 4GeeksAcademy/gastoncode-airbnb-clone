import { ListingGrid } from "@/components/home/ListingGrid";
import { SectionHeader } from "@/components/home/SectionHeader";
import type { ListingSectionData } from "@/types/home";

type ListingSectionProps = {
  section: ListingSectionData;
};

export function ListingSection({ section }: ListingSectionProps) {
  return (
    <section className="px-4 pb-6">
      <SectionHeader title={section.title} />
      <ListingGrid listings={section.listings} />
    </section>
  );
}
