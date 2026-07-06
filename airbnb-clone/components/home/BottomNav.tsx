"use client";

import { BottomNavItem } from "@/components/home/BottomNavItem";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < 8) {
        return;
      }

      if (delta > 0 && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const exploreActive = pathname === "/" || pathname.startsWith("/busqueda");
  const favoritesActive = pathname.startsWith("/favoritos");
  const loginActive = pathname.startsWith("/iniciar-sesion");

  return (
    <nav
      className={`fixed right-0 bottom-0 left-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur transition-transform duration-300 sm:hidden ${
        isHidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-sm grid-cols-3 px-4">
        <BottomNavItem
          icon="⌕"
          label="Explora"
          href="/"
          active={exploreActive}
        />
        <BottomNavItem
          icon="♡"
          label="Favoritos"
          href="/favoritos"
          active={favoritesActive}
        />
        <BottomNavItem
          icon="◉"
          label="Iniciar sesion"
          href="/iniciar-sesion"
          active={loginActive}
        />
      </div>
    </nav>
  );
}
