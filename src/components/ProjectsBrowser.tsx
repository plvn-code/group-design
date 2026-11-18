"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectCardClient } from "./ProjectCardClient";
import { CATEGORY, type Category, type ProjectWithImages } from "@/lib/projects";

type F = "all" | Category | "done";

/** Filter chips synced with ?type= / ?status=done (links from the footer and the home page). */
export function ProjectsBrowser({ projects }: { projects: ProjectWithImages[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const f: F = sp.get("status") === "done" ? "done" : ((sp.get("type") as Category) in CATEGORY ? (sp.get("type") as Category) : "all");

  const opts: { k: F; label: string; n: number }[] = [
    { k: "all", label: "Усі", n: projects.length },
    ...(Object.keys(CATEGORY) as Category[]).map((c) => ({ k: c as F, label: CATEGORY[c], n: projects.filter((p) => p.category === c).length })),
    { k: "done", label: "Реалізовані", n: projects.filter((p) => p.status === "done").length },
  ];
  const list = projects.filter((p) => (f === "all" ? true : f === "done" ? p.status === "done" : p.category === f));

  const set = (k: F) => {
    const q = k === "all" ? "" : k === "done" ? "?status=done" : `?type=${k}`;
    router.replace(`${pathname}${q}`, { scroll: false });
  };

  return (
    <>
      <div className="filters" role="group" aria-label="Фільтр проєктів">
        {opts.map((o) => (
          <button key={o.k} className="chip" aria-pressed={f === o.k} onClick={() => set(o.k)}>
            {o.label}
            <sup>{o.n}</sup>
          </button>
        ))}
      </div>
      <div className="pgrid">
        {list.map((p, i) => (
          <ProjectCardClient key={p.slug} p={p} i={i} />
        ))}
      </div>
    </>
  );
}
