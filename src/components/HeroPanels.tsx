"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Img } from "@/lib/projects";

/**
 * Three vertical panels (one on mobile), each crossfading through its own renders with a slow zoom.
 * Panels change in turn, so the picture never switches all at once.
 */
export function HeroPanels({ panels }: { panels: Img[][] }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setTick((v) => v + 1), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hero__panels" aria-hidden="true">
      {panels.map((imgs, p) => {
        // panels advance in turn (right → left), each one every 3rd tick
        const idx = Math.floor((tick + p) / 3) % imgs.length;
        // the previous slide stays fully visible underneath while the new one fades in on top
        const prev = (idx - 1 + imgs.length) % imgs.length;
        return (
          <div className="hero__panel" key={p}>
            {imgs.map((im, i) => (
              <div className={`hero__slide${i === idx ? " is-on" : i === prev ? " is-prev" : ""}`} key={im.src}>
                <Image src={im.src} alt="" fill priority={i === 0} loading={i === 0 ? undefined : "eager"} sizes="(max-width: 860px) 100vw, 34vw" quality={80} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
