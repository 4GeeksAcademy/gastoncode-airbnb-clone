import { HeartIcon, SearchIcon, UserIcon } from "./icons";

type MobileNavTab = "explora" | "favoritos" | "sesion";

type MobileNavProps = {
  hidden?: boolean;
  activeTab: MobileNavTab;
};

export function MobileNav({ hidden = false, activeTab }: MobileNavProps) {
  return (
    <nav className={`mobile-nav ${hidden ? "is-hidden" : ""}`} aria-label="Navegacion principal">
      <button type="button" className={activeTab === "explora" ? "active" : ""} aria-current={activeTab === "explora" ? "page" : undefined}>
        <SearchIcon />
        <span>Explora</span>
      </button>
      <button type="button" className={activeTab === "favoritos" ? "active" : ""} aria-current={activeTab === "favoritos" ? "page" : undefined}>
        <HeartIcon />
        <span>Favoritos</span>
      </button>
      <button type="button" className={activeTab === "sesion" ? "active" : ""} aria-current={activeTab === "sesion" ? "page" : undefined}>
        <UserIcon />
        <span>Iniciar sesion</span>
      </button>
    </nav>
  );
}