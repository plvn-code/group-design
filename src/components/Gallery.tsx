"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IChevron, IClose } from "./Icons";
import type { Img } from "@/lib/projects";

/** Editorial grid + full-screen lightbox (arrows, swipe, Esc, thumbnails). */
export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const n = images.length;
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    document.documentElement.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", k);
    };
  }, [open, go]);

  useEffect(() => {
    if (open === null) return;
    document.querySelector(`.lb__thumbs [data-i="${open}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [open]);

  return (
    <>
      <div className="gal">
        {images.map((im, i) => (
          <button key={im.src} className="gal__item curtain" style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }} onClick={() => setOpen(i)} aria-label={`Відкрити фото ${i + 1} з ${n}`}>
            <Image src={im.src} alt={`${title} — фото ${i + 1}`} fill sizes="(max-width: 760px) 100vw, 58vw" quality={75} />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={`${title}: перегляд фото`}>
          <div className="lb__bar">
            <span>
              {String(open + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span className="serif" style={{ fontSize: 20, opacity: 0.8 }}>
              {title}
            </span>
            <button className="lb__close" onClick={() => setOpen(null)} aria-label="Закрити" autoFocus>
              <IClose size={26} />
            </button>
          </div>
          <div
            className="lb__stage"
            onClick={(e) => e.target === e.currentTarget && setOpen(null)}
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            <Image key={images[open].src} src={images[open].src} alt={`${title} — фото ${open + 1}`} width={images[open].w} height={images[open].h} sizes="100vw" quality={85} />
            <button className="lb__nav lb__nav--prev" onClick={() => go(-1)} aria-label="Попереднє фото">
              <IChevron dir="left" />
            </button>
            <button className="lb__nav lb__nav--next" onClick={() => go(1)} aria-label="Наступне фото">
              <IChevron />
            </button>
          </div>
          <div className="lb__thumbs">
            {images.map((im, i) => (
              <button key={im.src} data-i={i} aria-current={i === open} onClick={() => setOpen(i)} aria-label={`Фото ${i + 1}`}>
                <Image src={im.src} alt="" width={54} height={54} sizes="54px" quality={70} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
