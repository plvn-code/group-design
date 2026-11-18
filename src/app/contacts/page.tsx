import type { Metadata } from "next";
import { IArrowUR } from "@/components/Icons";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/Sections";
import { pick } from "@/lib/projects";
import { site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Group Design, Київ. Телефон ${site.phoneLabel}, Instagram ${site.instagramHandle}. Безкоштовна консультація щодо дизайну інтерʼєру та ремонту під ключ.`,
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        short
        img={pick("panorama", 2)}
        crumbs={[{ href: "/", label: "Головна" }, { label: "Контакти" }]}
        eyebrow="Київ · онлайн-консультації"
        lines={["Обговоримо", "*ваш простір*"]}
        sub="Залиште заявку або напишіть у зручний месенджер — розповімо про формат роботи, терміни та бюджет."
      />
      <section className="sec" id="lead">
        <div className="wrap contacts">
          <div data-reveal>
            <p className="eyebrow">Звʼязатися</p>
            <div className="clist" style={{ marginTop: 28 }}>
              <a href={tel}>
                <small>Телефон</small>
                <strong>{site.phoneLabel}</strong>
                <IArrowUR size={20} />
              </a>
              <a href={site.viber}>
                <small>Viber</small>
                <strong>{site.phoneLabel}</strong>
                <IArrowUR size={20} />
              </a>
              <a href={site.direct} target="_blank" rel="noopener noreferrer">
                <small>Instagram</small>
                <strong>{site.instagramHandle}</strong>
                <IArrowUR size={20} />
              </a>
              <div>
                <small>Місто</small>
                <strong>Київ та область</strong>
                <span />
              </div>
            </div>
          </div>
          <div data-reveal style={{ ["--d" as string]: "0.1s" }}>
            <LeadForm light />
          </div>
        </div>
      </section>
    </>
  );
}
