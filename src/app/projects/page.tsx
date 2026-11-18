import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";
import { LeadSection, PageHero, ProjectCard } from "@/components/Sections";
import { pick, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Проєкти — дизайн квартир, будинків і комерційних просторів",
  description: "Портфоліо Group Design: квартири в ЖК «Варшавський плюс» і Crystal Avenue, будинки 185 м² та в Нових Петрівцях, кавʼярня та офіс. Візуалізації й реальні фото.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        img={pick("panorama", 7)}
        crumbs={[{ href: "/", label: "Головна" }, { label: "Проєкти" }]}
        eyebrow={`${projects.length} проєктів · квартири, будинки, комерція`}
        lines={["Проєкти, у які", "*хочеться повертатися*"]}
        sub="Кожен інтерʼєр — під спосіб життя конкретної родини чи бізнесу. Візуалізації з дизайн-проєктів і фото реалізованих обʼєктів."
      />
      <section className="sec">
        <div className="wrap">
          <Suspense
            fallback={
              <div className="pgrid">
                {projects.map((p, i) => (
                  <ProjectCard key={p.slug} p={p} i={i} />
                ))}
              </div>
            }
          >
            <ProjectsBrowser projects={projects} />
          </Suspense>
        </div>
      </section>
      <LeadSection img={pick("budynok-185", 0)} title={["Хочете так само?", "*Обговорімо ваш простір*"]} />
    </>
  );
}
