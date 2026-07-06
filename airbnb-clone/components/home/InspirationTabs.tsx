import { InspirationTab } from "@/components/home/InspirationTab";

type InspirationTabsProps = {
  tabs: string[];
  activeTab: string;
};

export function InspirationTabs({ tabs, activeTab }: InspirationTabsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <InspirationTab key={tab} label={tab} active={tab === activeTab} />
      ))}
    </div>
  );
}
