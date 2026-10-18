"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 90;

export default function ScrollEffects() {
  const pathname = usePathname();

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

  /* ---------- 3. Performant Fade/Slide-in on Viewport Entry ---------- */
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.setAttribute("data-revealed", "");
      });
      return;
    }

    // Tag sections and elements that haven't been tagged yet
    const tagElements = () => {
      document
        .querySelectorAll<HTMLElement>("main section")
        .forEach((section) => {
          section
            .querySelectorAll<HTMLElement>(
              "h1, h2, h3:not(.grid h3), section > div > div > p, span.uppercase"
            )
            .forEach((el) => {
              if (!el.closest(".grid") && !el.dataset.reveal) {
                el.dataset.reveal = "up";
              }
            });

          section.querySelectorAll<HTMLElement>(".grid").forEach((grid) => {
            Array.from(grid.children).forEach((child, i) => {
              const c = child as HTMLElement;
              if (c.dataset.reveal) return;
              c.dataset.reveal = "card";
              c.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 60}ms`);
            });
          });
        });
    };

    tagElements();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    // Reveal elements immediately if already inside viewport, otherwise observe
    const vh = window.innerHeight;
    document
      .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          el.setAttribute("data-revealed", "");
        } else {
          io.observe(el);
        }
      });

    return () => {
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
