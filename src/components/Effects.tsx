"use client";

/**
 * Scroll effects, mounted once in the layout:
 *  - [data-reveal] / .curtain → adds .is-in when the element enters the viewport (once)
 *  - [data-count="185"] → counts the number up when visible
 *  - [data-parallax="0.12"] → gentle vertical drift relative to the viewport centre
 *  - .words → words light up one by one as the block scrolls through the viewport
 *  - .fab → floating contact button appears after the first screen
 * Re-scans on every route change. Reduced motion: everything is shown immediately.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function countUp(el: HTMLElement) {
  const end = parseFloat(el.dataset.count || "0");
  const start = performance.now();
  const dur = 1600;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), .curtain:not(.is-in), [data-count]:not([data-counted])"));
    const words = Array.from(document.querySelectorAll<HTMLElement>(".words"));
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const fab = document.querySelector<HTMLElement>(".fab");

    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      words.forEach((w) => w.querySelectorAll("span").forEach((s) => s.classList.add("on")));
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          if (el.dataset.count && !el.dataset.counted) {
            el.dataset.counted = "1";
            countUp(el);
          }
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    if (!reduce) els.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        if (fab) fab.classList.toggle("is-on", window.scrollY > vh * 0.9 && window.scrollY + vh < document.documentElement.scrollHeight - 260);
        if (reduce) return;
        for (const el of par) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const k = parseFloat(el.dataset.parallax || "0.1");
          const off = (r.top + r.height / 2 - vh / 2) * -k;
          el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
        }
        for (const w of words) {
          const r = w.getBoundingClientRect();
          const spans = w.children;
          // 0 when the block's top hits 85% of the viewport, 1 when its bottom reaches 55%
          const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
          const n = Math.round(p * spans.length);
          for (let i = 0; i < spans.length; i++) spans[i].classList.toggle("on", i < n);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
