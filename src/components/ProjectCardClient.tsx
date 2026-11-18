"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IArrowUR } from "./Icons";
import { CATEGORY, cover, STATUS, type ProjectWithImages } from "@/lib/projects";

/** Same markup as <ProjectCard>, but reveals itself (cards appear after filtering, when Effects has already scanned the page). */
export function ProjectCardClient({ p, i }: { p: ProjectWithImages; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add("is-in");
        el.querySelector(".curtain")?.classList.add("is-in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const c = cover(p);
  return (
    <Link ref={ref} href={`/projects/${p.slug}`} className="pcard" data-reveal style={{ ["--d" as string]: `${(i % 2) * 0.1}s` }}>
      <div className="pcard__img curtain">
        <span className={`pcard__badge${p.status === "done" ? " pcard__badge--done" : ""}`}>{STATUS[p.status]}</span>
        <Image src={c.src} alt={p.title} fill sizes="(max-width: 860px) 100vw, 50vw" quality={80} />
      </div>
      <div className="pcard__meta">
        <span>{CATEGORY[p.category]}</span>
        <span>
          {p.area ? `${p.area} · ` : ""}
          {p.year}
        </span>
      </div>
      <h3 className="pcard__title">
        {p.title}
        <IArrowUR size={22} />
      </h3>
      <p className="pcard__short">{p.short}</p>
    </Link>
  );
}
