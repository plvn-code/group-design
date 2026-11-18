import Image from "next/image";
import Link from "next/link";
import { Compare } from "@/components/Compare";
import { HeroPanels } from "@/components/HeroPanels";
import { IArrow, IArrowUR } from "@/components/Icons";
import { Faq, LeadSection, MoreLink, ProcessSteps, ProjectCard, Split, Words } from "@/components/Sections";
import { services, stats, why } from "@/lib/content";
import { CATEGORY, compare, getProject, pick, projects, single, type Category } from "@/lib/projects";

const HERO = [
  [pick("panorama", 1), pick("budynok-185", 0), pick("novi-petrivtsi", 0)],
  [pick("panorama", 0), pick("olyva", 0), pick("panorama", 23)],
  [pick("panorama", 17), pick("bordo", 0), pick("panorama", 11)],
];

const FEATURED = ["panorama", "varshavskyi", "budynok-185", "rodyna", "novi-petrivtsi", "kavyarnya"];

const RAIL = [
  { img: pick("panorama", 23), t: "Онікс із підсвіткою" },
  { img: pick("novi-petrivtsi", 12), t: "Кварцит Patagonia" },
  { img: pick("bordo", 10), t: "Бордовий мармур" },
  { img: pick("budynok-185", 9), t: "Камін у вітальні" },
  { img: pick("rodyna", 1), t: "Реалізація · кухня" },
  { img: pick("budynok-185", 23), t: "Гардеробна за склом" },
  { img: pick("olyva", 8), t: "Дитяча на виріст" },
  { img: pick("kavyarnya", 0), t: "Кавʼярня" },
  { img: pick("panorama", 21), t: "Гардеробна з островом" },
  { img: pick("zelena-kukhnya", 6), t: "Український орнамент" },
];

export default function Home() {
  const counts = projects.reduce<Record<string, number>>((a, p) => ((a[p.category] = (a[p.category] || 0) + 1), a), {});
  const featured = FEATURED.map((s) => getProject(s)!);

  return (
    <>
      {/* 1. hero */}
      <section className="hero">
        <HeroPanels panels={HERO} />
        <div className="wrap hero__content">
          <p className="eyebrow fade-up" style={{ ["--d" as string]: "0.5s" }}>
            Дизайн-студія Олени Якубець · Київ
          </p>
          <Split lines={["Створюємо дім", "*вашої мрії*"]} className="display" />
          <div className="hero__grid">
            <p className="hero__sub fade-up">Дизайн-проєкт, авторський супровід, комплектація та ремонт під ключ — від концепції до повної реалізації.</p>
            <div className="hero__cta fade-up" style={{ ["--d" as string]: "1.25s" }}>
              <a href="#lead" className="btn btn--light">
                Безкоштовна консультація <IArrow />
              </a>
              <Link href="/projects" className="btn btn--ghost">
                Дивитися проєкти
              </Link>
            </div>
          </div>
          <div className="hero__foot fade-up" style={{ ["--d" as string]: "1.4s" }}>
            <ul>
              <li>Квартири</li>
              <li>Будинки</li>
              <li>Комерційні простори</li>
            </ul>
            <span className="hero__scroll">
              Гортайте <i />
            </span>
          </div>
        </div>
      </section>

      {/* 2. statement */}
      <section className="sec">
        <div className="wrap intro">
          <p className="eyebrow" data-reveal>
            Group Design
          </p>
          <div>
            <Words
              className="intro__text"
              text="Ми створюємо інтерʼєри під ваш спосіб життя — тихі, теплі й продумані до деталей. Спочатку функція та ергономіка, потім матеріали й світло, що створюють *вау-ефект.*"
            />
          </div>
          <div className="intro__cats" data-reveal>
            {(Object.keys(CATEGORY) as Category[]).map((c) => (
              <Link key={c} href={`/projects?type=${c}`} className="intro__cat">
                <span>
                  {CATEGORY[c]}
                  <sup>{String(counts[c] || 0).padStart(2, "0")}</sup>
                </span>
                <IArrowUR />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. projects */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal>
              <p className="eyebrow">Портфоліо</p>
              <h2 className="h2">
                Вибрані <em>проєкти</em>
              </h2>
            </div>
            <div className="sec-head__side" data-reveal style={{ ["--d" as string]: "0.1s" }}>
              <p className="muted" style={{ marginBottom: 20 }}>
                Готові обʼєкти, етапи й рішення — в одному місці. Від компактної квартири 50 м² до будинку 185 м² і кавʼярні.
              </p>
              <MoreLink href="/projects">Усі проєкти · {projects.length}</MoreLink>
            </div>
          </div>
          <div className="pgrid pgrid--home">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} p={p} i={i} sizes="(max-width: 860px) 100vw, 58vw" />
            ))}
          </div>
        </div>
      </section>

      {/* 4. stats */}
      <section className="sec--tight on-dark" style={{ padding: "clamp(64px, 8vw, 120px) 0" }}>
        <div className="wrap">
          <div className="stats">
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

      {/* 5. plan vs result */}
      <section className="sec sec--sand">
        <div className="wrap cmp">
          <div data-reveal>
            <p className="eyebrow">Реалізація</p>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Проєкт <em>=</em> реальність
            </h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Порівняйте 3D-візуалізацію з дизайн-проєкту та фото готової квартири. Повний пакет креслень і авторський супровід — щоб результат збігся до деталей.
            </p>
            <blockquote className="cmp__quote">
              Без компромісів, без «ну майже». Точно. Чітко. Красиво.
              <cite>Олена Якубець</cite>
            </blockquote>
            <div style={{ marginTop: 36 }}>
              <MoreLink href="/projects/rodyna">Дивитися реалізований обʼєкт</MoreLink>
            </div>
          </div>
          <div data-reveal style={{ ["--d" as string]: "0.1s" }}>
            <Compare pairs={compare} />
          </div>
        </div>
      </section>

      {/* 6. services */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal>
              <p className="eyebrow">Послуги</p>
              <h2 className="h2">
                Повний цикл — <em>в одних руках</em>
              </h2>
            </div>
            <div className="sec-head__side" data-reveal style={{ ["--d" as string]: "0.1s" }}>
              <p className="muted">Можна замовити лише дизайн-проєкт або довірити нам усе — від обміру до заселення.</p>
            </div>
          </div>
          <div className="svc">
            {services.map((s, i) => (
              <Link key={s.id} href={`/services#${s.id}`} className="svc__row" data-reveal style={{ ["--d" as string]: `${i * 0.06}s` }}>
                <span className="svc__n">{s.n}</span>
                <span className="svc__t">{s.title}</span>
                <span className="svc__d">{s.lead}</span>
                <span className="svc__term">{s.term}</span>
                <IArrow size={22} className="svc__arr" />
                <span className="svc__peek" aria-hidden="true">
                  <Image src={pick(s.img.slug, s.img.i).src} alt="" width={220} height={275} sizes="220px" quality={70} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. why */}
      <section className="sec on-dark">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal>
              <p className="eyebrow">Підхід</p>
              <h2 className="h2">
                Чому нам <em>довіряють</em> дім
              </h2>
            </div>
          </div>
          <div className="why">
            {why.map((w, i) => (
              <div className="why__item" key={w.t} data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }}>
                <span className="why__n">0{i + 1}</span>
                <h3 className="why__t">{w.t}</h3>
                <p className="why__d">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. about */}
      <section className="sec">
        <div className="wrap about">
          <div className="about__media">
            <div className="about__img curtain">
              <Image src={single.olena.src} alt="Олена Якубець, дизайнерка інтерʼєру, засновниця Group Design" fill sizes="(max-width: 960px) 90vw, 42vw" quality={80} />
            </div>
            <div className="about__small curtain" style={{ ["--d" as string]: "0.3s" }} data-parallax="0.08">
              <Image src={pick("panorama", 0).src} alt="" fill sizes="20vw" quality={70} />
            </div>
          </div>
          <div className="about__text" data-reveal>
            <p className="eyebrow">Засновниця студії</p>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Олена <em>Якубець</em>
            </h2>
            <p className="lead">
              Дизайнерка інтерʼєру з Києва. Створює житлові та комерційні простори, у яких хочеться жити, а не лише фотографувати, — і веде їх від першого планування до заселення.
            </p>
            <p className="muted">
              Тільки зробивши ремонт у власній квартирі, Олена зрозуміла, що найважливіше — перший етап, планування. Бо якщо в усій цій красі незручно жити, працювати, готувати й приймати гостей — у чому сенс?
            </p>
            <blockquote className="quote">Моя робота — це не лише про естетику. Це про атмосферу і про те, як простір може змінювати настрій і життя.</blockquote>
            <div className="about__sign">
              <div>
                <b>Olena Yakubets</b>
                <span>Group Design</span>
              </div>
            </div>
            <div style={{ marginTop: 36 }}>
              <MoreLink href="/about">Про студію</MoreLink>
            </div>
          </div>
        </div>
      </section>

      {/* 9. details rail */}
      <section className="sec--tight sec--paper" style={{ padding: "clamp(56px, 7vw, 100px) 0" }} aria-label="Деталі з проєктів">
        <div className="wrap" style={{ marginBottom: 36 }}>
          <p className="eyebrow">Деталі вирішують усе</p>
        </div>
        <div className="rail">
          <div className="rail__track">
            {[...RAIL, ...RAIL].map((r, i) => (
              <div className="rail__item" key={i} aria-hidden={i >= RAIL.length}>
                <Image src={r.img.src} alt={i < RAIL.length ? r.t : ""} fill sizes="320px" quality={70} />
                <span>{r.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. process */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal>
              <p className="eyebrow">Як ми працюємо</p>
              <h2 className="h2">
                Від ідеї до <em>реалізації</em>
              </h2>
            </div>
            <div className="sec-head__side" data-reveal style={{ ["--d" as string]: "0.1s" }}>
              <p className="muted">Дизайн-проєкт — 1,5–2 місяці, ремонт — 6–9 місяців. На кожному етапі ви знаєте, що відбувається і скільки це коштує.</p>
            </div>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <Faq />
      <LeadSection img={pick("panorama", 1)} />
    </>
  );
}
