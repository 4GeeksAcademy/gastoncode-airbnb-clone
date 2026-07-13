"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HeartIcon, SearchIcon, UserIcon } from "./icons";
import type { MobileNavProps, MobileNavTab } from "../types/ui";

function getActiveTab(pathname: string): MobileNavTab {
  if (pathname.startsWith("/catalog")) {
    return "favoritos";
  }

  if (pathname.startsWith("/location")) {
    return "sesion";
  }

  return "explora";
}

export function MobileNav({ hidden = false }: MobileNavProps) {
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 12) {
        setScrollHidden(false);
      } else if (delta > 4) {
        setScrollHidden(true);
      } else if (delta < -4) {
        setScrollHidden(false);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <nav className={`mobile-nav ${hidden || scrollHidden ? "is-hidden" : ""}`} aria-label="Navegacion principal">
      <Link href="/" className={activeTab === "explora" ? "active" : ""} aria-current={activeTab === "explora" ? "page" : undefined}>
        <SearchIcon />
        <span>Explora</span>
      </Link>
      <Link href="/catalog" className={activeTab === "favoritos" ? "active" : ""} aria-current={activeTab === "favoritos" ? "page" : undefined}>
        <HeartIcon />
        <span>Favoritos</span>
      </Link>
      <Link href="/location" className={activeTab === "sesion" ? "active" : ""} aria-current={activeTab === "sesion" ? "page" : undefined}>
        <UserIcon />
        <span>Iniciar sesion</span>
      </Link>
    </nav>
  );
}