import Image from "next/image";
import Link from "next/link";
import { IArrow, IArrowUR, IInsta, IPhone } from "./Icons";
import { LeadForm } from "./LeadForm";
import { faq, process } from "@/lib/content";
import { CATEGORY, cover, STATUS, type Img, type ProjectWithImages } from "@/lib/projects";
import { site, tel } from "@/lib/site";

/** Headline split into lines that slide up on load. Lines = array items; `*word*` → <em>. */
export function Split({ lines, as: Tag = "h1", className = "" }: { lines: string[]; as?: "h1" | "h2"; className?: string }) {
  return (
    <Tag className={`split ${className}`}>
      {lines.map((l, i) => (
        <span key={i}>
          <span>{rich(l)}</span>
        </span>
      ))}
    </Tag>
  );
}

/** `*word*` → <em>word</em> */
export function rich(s: string) {
  return s.split(/(\*[^*]+\*)/).map((part, i) => (part.startsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part));
}

/** Text whose words light up while scrolling (see Effects). */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`words ${className}`}>
      {text.split(" ").map((w, i) => {
        const em = w.startsWith("*") && w.endsWith("*");
        return <span key={i}>{em ? <em>{w.slice(1, -1)}</em> : w} </span>;
      })}
    </p>
  );
}

export function PageHero({
  img,
  eyebrow,
  lines,
  sub,
  crumbs,
  short = false,
  children,
}: {
  img: Img;
  eyebrow?: string;
  lines: string[];
  sub?: string;
  crumbs?: { href?: string; label: string }[];
  short?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`phero${short ? " phero--short" : ""}`}>
      <div className="phero__img" data-parallax="0.08">
        <Image src={img.src} alt="" fill priority sizes="100vw" quality={80} />
      </div>
      <div className="wrap phero__in">
        {crumbs && (
          <ol className="crumbs fade-up" style={{ ["--d" as string]: "0.3s" }} aria-label="Навігаційний ланцюжок">
            {crumbs.map((c) => (
              <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        )}
        {eyebrow && (
          <p className="eyebrow fade-up" style={{ ["--d" as string]: "0.35s" }}>
            {eyebrow}
          </p>
        )}
        <Split lines={lines} className="display" />
        {sub && (
          <p className="phero__sub fade-up" style={{ ["--d" as string]: "0.7s" }}>
            {sub}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function ProjectCard({ p, i = 0, sizes = "(max-width: 860px) 100vw, 50vw" }: { p: ProjectWithImages; i?: number; sizes?: string }) {
  const c = cover(p);
  return (
    <Link href={`/projects/${p.slug}`} className="pcard" data-reveal style={{ ["--d" as string]: `${(i % 2) * 0.1}s` }}>
      <div className="pcard__img curtain">
        <span className={`pcard__badge${p.status === "done" ? " pcard__badge--done" : ""}`}>{STATUS[p.status]}</span>
        <Image src={c.src} alt={p.title} fill sizes={sizes} quality={80} />
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

export function ProcessSteps() {
  return (
    <ol className="proc" style={{ listStyle: "none", margin: 0 }}>
      {process.map((s, i) => (
        <li key={s.n} className="proc__step" data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
          <span className="proc__dot" />
          <p className="proc__n">{s.n}</p>
          <h3 className="proc__t">{s.t}</h3>
          <p className="proc__d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items = faq }: { items?: { q: string; a: string }[] }) {
  return (
    <section className="sec">
      <div className="wrap faq">
        <div data-reveal>
          <p className="eyebrow">Питання</p>
          <h2 className="h2" style={{ marginTop: 22 }}>
            Часті <em>запитання</em>
          </h2>
          <p className="muted" style={{ marginTop: 24, maxWidth: 340 }}>
            Не знайшли відповіді? Напишіть нам у{" "}
            <a href={site.direct} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
              Direct
            </a>{" "}
            або зателефонуйте — порадимо безкоштовно.
          </p>
        </div>
        <div className="faq__list" data-reveal style={{ ["--d" as string]: "0.1s" }}>
          {items.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <span className="faq__pm" aria-hidden="true" />
              </summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadSection({ img, title = ["Створимо дім", "*вашої мрії*"] }: { img: Img; title?: string[] }) {
  return (
    <section className="sec cta on-dark" id="lead">
      <div className="cta__bg" data-parallax="0.1">
        <Image src={img.src} alt="" fill sizes="100vw" quality={70} />
      </div>
      <div className="wrap cta__in">
        <div data-reveal>
          <p className="eyebrow">Безкоштовна консультація</p>
          <h2 className="display" style={{ marginTop: 24, fontSize: "clamp(44px, 6vw, 96px)" }}>
            {title.map((t, i) => (
              <span key={i} style={{ display: "block" }}>
                {rich(t)}
              </span>
            ))}
          </h2>
          <p className="lead" style={{ marginTop: 28, maxWidth: 460 }}>
            Розкажіть про ваш обʼєкт — обговоримо задачу, формат роботи та орієнтовний бюджет. Ремонтна рутина — на нас, ви — у своєму ритмі.
          </p>
          <div className="cta__contacts">
            <a href={tel}>
              <IPhone /> {site.phoneLabel}
            </a>
            <a href={site.direct} target="_blank" rel="noopener noreferrer">
              <IInsta /> Написати в Instagram Direct
            </a>
          </div>
        </div>
        <div data-reveal style={{ ["--d" as string]: "0.12s" }}>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link">
      {children} <IArrow />
    </Link>
  );
}
