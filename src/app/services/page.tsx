import type { Metadata } from "next";
import Image from "next/image";
import { Faq, LeadSection, PageHero, ProcessSteps } from "@/components/Sections";
import { services } from "@/lib/content";
import { pick } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Послуги — дизайн-проєкт, авторський супровід, комплектація, ремонт під ключ",
  description: "Дизайн-проєкт інтерʼєру за 1,5–2 місяці, авторський супровід, комплектація та ремонт під ключ у Києві. Етапи роботи та вартість.",
};

const PRICE = [
  { t: "Дизайн-проєкт інтерʼєру", d: "Планування, концепція, 3D-візуалізації, робочі креслення, специфікації", p: "за м²" },
  { t: "Авторський супровід", d: "Виїзди на обʼєкт, контроль робіт, комунікація з підрядниками", p: "щомісяця" },
  { t: "Комплектація", d: "Підбір і замовлення матеріалів, меблів, світла, техніки", p: "за проєкт" },
  { t: "Ремонт під ключ", d: "Кошторис після дизайн-проєкту; орієнтир — 1400 $/м² з меблями й технікою (кейс 67 м²)", p: "за кошторисом" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        img={pick("budynok-185", 9)}
        crumbs={[{ href: "/", label: "Головна" }, { label: "Послуги" }]}
        eyebrow="Дизайн · супровід · комплектація · ремонт"
        lines={["Ремонтна рутина — на нас.", "*Ви — у своєму ритмі*"]}
        sub="Беремо на себе весь процес: від планування й 3D-візуалізацій до підбору матеріалів, комунікації з підрядниками та контролю реалізації."
      />

      <section className="sec">
        <div className="wrap">
          {services.map((s) => (
            <article className="sblock" id={s.id} key={s.id}>
              <div className="sblock__media curtain">
                <Image src={pick(s.img.slug, s.img.i).src} alt={s.title} fill sizes="(max-width: 960px) 100vw, 50vw" quality={80} />
              </div>
              <div data-reveal>
                <span className="sblock__n">{s.n}</span>
                <h2 className="h2">{s.title}</h2>
                <p className="lead">{s.lead}</p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <div className="sblock__term">
                  <span>Термін</span>
                  <b>{s.term}</b>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head">
            <div data-reveal>
              <p className="eyebrow">Процес</p>
              <h2 className="h2">
                Шість кроків до <em>вашого дому</em>
              </h2>
            </div>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section className="sec on-dark">
        <div className="wrap price">
          <div data-reveal>
            <p className="eyebrow">Вартість</p>
            <h2 className="h2" style={{ marginTop: 22 }}>
              Чесний <em>розрахунок</em>
            </h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Вартість залежить від площі, типу обʼєкта та складу послуг. Після короткого брифу ви отримаєте точний розрахунок і графік — без прихованих платежів.
            </p>
            <a href="#lead" className="btn btn--light" style={{ marginTop: 36 }}>
              Отримати розрахунок
            </a>
          </div>
          <div className="price__table" data-reveal style={{ ["--d" as string]: "0.1s" }}>
            {PRICE.map((r) => (
              <div className="price__row" key={r.t}>
                <b>{r.t}</b>
                <span>{r.d}</span>
                <i>{r.p}</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <LeadSection img={pick("novi-petrivtsi", 0)} title={["Розрахуємо", "*ваш проєкт*"]} />
    </>
  );
}
