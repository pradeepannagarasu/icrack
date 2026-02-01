"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SCROLL_KEY = "icrack_scroll";

function saveScroll() {
  if (typeof window === "undefined") return;
  try {
    const key = `${SCROLL_KEY}_${window.location.pathname}`;
    sessionStorage.setItem(key, String(window.scrollY));
  } catch (_) {}
}

export default function ScrollRestoration() {
  const pathname = usePathname();

  // Restore scroll position only after a full page refresh (not client-side navigation)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const nav =
        typeof performance !== "undefined" && performance.getEntriesByType
          ? performance.getEntriesByType("navigation")[0]
          : null;
      const isReload = nav && (nav as PerformanceNavigationTiming).type === "reload";
      if (!isReload) return;
      const key = `${SCROLL_KEY}_${pathname}`;
      const saved = sessionStorage.getItem(key);
      if (saved !== null) {
        const y = parseInt(saved, 10);
        if (!isNaN(y) && y > 0) {
          window.requestAnimationFrame(() => {
            window.scrollTo(0, y);
          });
        }
      }
    } catch (_) {}
  }, [pathname]);

  // Save scroll position on scroll (throttled) and before unload
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          saveScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleBeforeUnload = () => saveScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
