"use client";

import { useEffect } from "react";

const HEADER_OFFSET = 90;

export default function ScrollEffects() {
  /* ---------- 1. Smooth In-Page Anchor Links (Zero Wheel Hijacking) ---------- */
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const top =
          targetEl.getBoundingClientRect().top +
          window.scrollY -
          HEADER_OFFSET;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  /* ---------- 2. Navbar Scrolled State (Throttled & Passive) ---------- */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            document.documentElement.dataset.scrolled = "true";
          } else {
            delete document.documentElement.dataset.scrolled;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
