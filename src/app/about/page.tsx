import type { Metadata } from "next";
import Image from "next/image";
import { LeadSection, MoreLink, PageHero, Words } from "@/components/Sections";
import { stats, why } from "@/lib/content";
import { pick, projects, single } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Про студію — Олена Якубець",
  description: "Group Design — дизайн-студія Олени Якубець у Києві. Підхід, цінності та команда перевірених підрядників.",
};

const EVENTS = ["KYIV DESIGN TALK", "Презентація SANGIACOMO у Roomers Interiors", "«Дотик бронзи» — Svitplus × JUNG", "Техніка V-ZUG у просторі Mirs Home"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        img={pick("panorama", 0)}
        crumbs={[{ href: "/", label: "Головна" }, { label: "Про студію" }]}
        eyebrow="Group Design by Olena Yakubets"
        lines={["Дім, який хочеться", "*залишити собі*"]}
        sub="Найкращий комплімент для дизайнера — створити інтерʼєр, у якому сам із задоволенням жив би."
      />

      <section className="sec">
        <div className="wrap about">
          <div className="about__media">
            <div className="about__img curtain">
              <Image src={single.olena.src} alt="Олена Якубець на KYIV DESIGN TALK" fill sizes="(max-width: 960px) 90vw, 42vw" quality={80} priority />
            </div>
            <div className="about__small curtain" style={{ ["--d" as string]: "0.3s" }} data-parallax="0.08">
              <Image src={single["olena-2"].src} alt="Олена Якубець на заході для архітекторів і дизайнерів" fill sizes="20vw" quality={70} />
            </div>
          </div>
          <div className="about__text" data-reveal>
            <p className="eyebrow">Засновниця</p>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Олена <em>Якубець</em>
            </h2>
            <p className="lead">
              «Любити свою справу — це привілей і велика відповідальність. Щоразу, коли я бачу реалізований проєкт, усвідомлюю: я на своєму місці».
            </p>
            <p className="muted">
              Олена отримує справжнє задоволення від складних задач: планувати, думати, шукати нестандартні рішення. Її інтерʼєри — це нюансні теплі палітри, натуральний камінь і дерево, багаторівневе світло та системи зберігання, продумані до кожної шухляди.
            </p>
            <p className="muted">
              Дизайн для неї — це тандем досвіду, знань, діалогу та емпатії: зрозуміти, як живе родина, і зробити простір, що працює роками, а не до першого ремонту.
            </p>
          </div>
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap intro">
          <p className="eyebrow" data-reveal>
            Підхід
          </p>
          <Words
            className="intro__text"
            text="Хороший інтерʼєр — це не тільки гарний дизайн. Це злагоджена робота великої кількості людей, де кожен виконує свою частину *бездоганно.*"
          />
        </div>
      </section>

      <section className="sec on-dark">
        <div className="wrap">
          <div className="why">
            {why.map((w, i) => (
              <div className="why__item" key={w.t} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span className="why__n">0{i + 1}</span>
                <h3 className="why__t">{w.t}</h3>
                <p className="why__d">{w.d}</p>
              </div>
            ))}
          </div>
          <div className="stats" style={{ marginTop: "clamp(64px, 8vw, 120px)" }}>
            {stats.map((s, i) => (
              <div className="stat" key={s.d} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <div className="stat__v">
                  {s.v}
                  <small>{s.u}</small>
                </div>
                <p className="stat__d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap faq">
          <div data-reveal>
            <p className="eyebrow">Партнери</p>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Перевірені <em>команди</em>
            </h2>
          </div>
          <div data-reveal style={{ ["--d" as string]: "0.1s" }}>
            <p className="lead">
              Для нас важливо працювати з людьми, які розуміють свою відповідальність, уважні до деталей і в складних ситуаціях шукають рішення, а не виправдання. Будівельні бригади, мебляри, постачальники матеріалів і техніки — перевірені на реальних обʼєктах.
            </p>
            <p className="eyebrow" style={{ marginTop: 48 }}>
              Ми буваємо на
            </p>
            <ul className="pfeat">
              {EVENTS.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <div style={{ marginTop: 40 }}>
              <MoreLink href="/projects">Дивитися {projects.length} проєктів</MoreLink>
            </div>
          </div>
        </div>
      </section>

      <LeadSection img={pick("panorama", 17)} />
    </>
  );
}
