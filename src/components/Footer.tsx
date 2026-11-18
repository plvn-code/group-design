import Link from "next/link";
import { MadeBy } from "./MadeBy";
import { Logo } from "./Logo";
import { CATEGORY } from "@/lib/projects";
import { nav, site, tel } from "@/lib/site";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div>
            <Logo />
            <p className="ftr__claim" style={{ marginTop: 36 }}>
              Створюємо дім, який хочеться <em className="serif" style={{ color: "var(--bronze-2)" }}>назвати своїм</em>
            </p>
          </div>
          <div>
            <h4>Навігація</h4>
            <ul>
              <li>
                <Link href="/">Головна</Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Проєкти</h4>
            <ul>
              {Object.entries(CATEGORY).map(([k, v]) => (
                <li key={k}>
                  <Link href={`/projects?type=${k}`}>{v}</Link>
                </li>
              ))}
              <li>
                <Link href="/projects?status=done">Реалізовані</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Контакти</h4>
            <ul>
              <li>
                <a href={tel}>{site.phoneLabel}</a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li>
                <a href={site.direct} target="_blank" rel="noopener noreferrer">
                  Написати в Direct
                </a>
              </li>
              <li>{site.city}</li>
            </ul>
          </div>
        </div>
        <div className="ftr__big" aria-hidden="true">
          Group Design <em>by Olena</em>
        </div>
        <div className="ftr__bottom">
          <span>© {new Date().getFullYear()} Group Design · Олена Якубець. Дизайн інтерʼєру та ремонт під ключ, Київ.</span>
          <MadeBy />
        </div>
      </div>
    </footer>
  );
}
