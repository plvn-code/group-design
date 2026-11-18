import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { IArrow } from "@/components/Icons";
import { LeadSection, PageHero } from "@/components/Sections";
import { CATEGORY, cover, getProject, projects, STATUS } from "@/lib/projects";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.lead} ${STATUS[p.status]} студії Group Design.`,
    openGraph: { images: [cover(p).src] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const [first, ...restLines] = p.title.split(/,\s*/);

  const meta = [
    { k: "Тип", v: CATEGORY[p.category] },
    p.area && { k: "Площа", v: p.area },
    { k: "Рік", v: p.year },
    { k: "Етап", v: STATUS[p.status] },
    p.place && { k: "Локація", v: p.place },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <PageHero img={cover(p)} crumbs={[{ href: "/", label: "Головна" }, { href: "/projects", label: "Проєкти" }, { label: p.title }]} lines={[first, ...restLines.map((l) => `*${l}*`)]}>
        <dl className="pmeta fade-up" style={{ ["--d" as string]: "0.8s" }}>
          {meta.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="sec">
        <div className="wrap pstory">
          <div data-reveal>
            <p className="eyebrow">Про проєкт</p>
            <p className="pstory__lead" style={{ marginTop: 24 }}>
              {p.lead}
            </p>
            <div className="tags">
              {p.rooms.map((r) => (
                <span className="tag" key={r}>
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className="pstory__body" data-reveal style={{ ["--d" as string]: "0.1s" }}>
            {p.story.map((s) => (
              <p key={s.slice(0, 24)}>{s}</p>
            ))}
            <ul className="pfeat">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {p.status === "done" && (
              <p className="muted" style={{ marginTop: 24, fontSize: 14 }}>
                {p.slug === "rodyna" ? "Перші кадри галереї — реальні фото готової квартири, далі — візуалізації з дизайн-проєкту." : "Обʼєкт реалізовано за цим дизайн-проєктом."}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Gallery images={p.images} title={p.title} />
        </div>
      </section>

      {p.quote && (
        <section className="sec sec--sand">
          <figure className="wrap pquote" data-reveal>
            <blockquote>«{p.quote}»</blockquote>
            <figcaption>Олена Якубець, Group Design</figcaption>
          </figure>
        </section>
      )}

      <Link href={`/projects/${next.slug}`} className="next">
        <div className="next__img">
          <Image src={cover(next).src} alt="" fill sizes="100vw" quality={70} />
        </div>
        <div className="wrap next__in">
          <p className="eyebrow" style={{ color: "var(--on-dark-muted)" }}>
            Наступний проєкт
          </p>
          <h2 className="display" style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {next.title} <IArrow size={48} />
          </h2>
        </div>
      </Link>

      <LeadSection img={cover(p)} title={["Хочете такий дім", "*для себе?*"]} />
    </>
  );
}
