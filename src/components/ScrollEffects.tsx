"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 80;
const DURATION = 900;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Run fn once the page is loaded and React hydration has settled. */
function afterHydration(fn: () => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const run = () => {
    timer = setTimeout(fn, 400);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    window.removeEventListener("load", run);
    if (timer) clearTimeout(timer);
  };
}

export default function ScrollEffects() {
  const pathname = usePathname();

  /* ---------- Section-by-section scrolling ---------- */
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return; // keep native scroll on touch / reduced motion

    let animating = false;
    let wheelLock = 0;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main section, footer")).filter(
        (el) => el.offsetHeight > 120 && !el.parentElement?.closest("section")
      );

    const topOf = (el: HTMLElement) =>
      Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);

    const animateTo = (target: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.min(Math.max(0, target), max);
      const start = window.scrollY;
      const dist = target - start;
      if (Math.abs(dist) < 2) return;
      animating = true;
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION);
        window.scrollTo(0, start + dist * easeInOutCubic(p));
        if (p < 1) requestAnimationFrame(step);
        else {
          html.style.scrollBehavior = prevBehavior;
          setTimeout(() => (animating = false), 120);
        }
      };
      requestAnimationFrame(step);
    };

    const currentIndex = (sections: HTMLElement[]) => {
      const y = window.scrollY + HEADER_OFFSET + 4;
      let idx = 0;
      sections.forEach((s, i) => {
        if (topOf(s) + HEADER_OFFSET <= y) idx = i;
      });
      return idx;
    };

    const move = (dir: 1 | -1): boolean => {
      const sections = getSections();
      if (!sections.length) return false;
      const i = currentIndex(sections);
      const cur = sections[i];
      const rect = cur.getBoundingClientRect();
      const vh = window.innerHeight;

      // Tall section: scroll natively inside it until we reach its edge
      if (dir === 1 && rect.bottom > vh + 4) return false;
      if (dir === -1 && rect.top < HEADER_OFFSET - 4) {
        return false;
      }

      const next = sections[i + dir];
      if (!next) return false;
      if (dir === -1 && next.offsetHeight > vh) {
        // land at the bottom of a tall previous section
        animateTo(topOf(next) + next.offsetHeight - vh + HEADER_OFFSET);
      } else {
        animateTo(topOf(next));
      }
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < 4) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-native-scroll], textarea, select, .overflow-y-auto, .overflow-auto")) return;
      if (animating || Date.now() < wheelLock) {
        e.preventDefault();
        return;
      }
      const handled = move(e.deltaY > 0 ? 1 : -1);
      if (handled) {
        e.preventDefault();
        wheelLock = Date.now() + DURATION + 250;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      let dir: 1 | -1 | 0 = 0;
      if (["PageDown", "ArrowDown", " "].includes(e.key) && !e.shiftKey) dir = 1;
      if (["PageUp", "ArrowUp"].includes(e.key) || (e.key === " " && e.shiftKey)) dir = -1;
      if (!dir) return;
      if (animating) return e.preventDefault();
      if (move(dir)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [pathname]);

  /* ---------- Navbar state ---------- */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) document.documentElement.dataset.scrolled = "true";
      else delete document.documentElement.dataset.scrolled;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const cancel = afterHydration(onScroll);
    return () => {
      cancel();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ---------- Reveal animations (fade / slide-up / stagger) ---------- */
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const tag = () => {
      document.querySelectorAll<HTMLElement>("main section").forEach((section) => {
        section
          .querySelectorAll<HTMLElement>("h1, h2, h3:not(.grid h3), section > div > div > p, span.uppercase")
          .forEach((el) => {
            if (!el.closest(".grid") && !el.dataset.reveal) el.dataset.reveal = "up";
          });
        section.querySelectorAll<HTMLElement>(".grid").forEach((grid) => {
          Array.from(grid.children).forEach((child, i) => {
            const c = child as HTMLElement;
            if (c.dataset.reveal) return;
            c.dataset.reveal = "card";
            c.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 110}ms`);
          });
        });
      });
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.setAttribute("data-revealed", "");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const show = (el: Element) => el.setAttribute("data-revealed", "");
    const observeAll = () => {
      tag();
      const vh = window.innerHeight;
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) requestAnimationFrame(() => requestAnimationFrame(() => show(el)));
          else io.observe(el);
        });
    };
    // Safety net: never leave content hidden
    const failSafe = setInterval(() => {
      const vh = window.innerHeight;
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) show(el);
      });
    }, 1500);

    const mo = new MutationObserver(() => observeAll());
    // Only touch the DOM after React has finished hydrating
    const cancel = afterHydration(() => {
      observeAll();
      // pick up cards rendered later (filters, async data)
      const main = document.querySelector("main");
      if (main) mo.observe(main, { childList: true, subtree: true });
    });

    return () => {
      cancel();
      clearInterval(failSafe);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
