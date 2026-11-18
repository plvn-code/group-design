"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IClose, IInsta, IPhone } from "./Icons";
import { Logo } from "./Logo";
import { nav, site, tel } from "@/lib/site";

/**
 * Fixed header. Every page starts with a dark image hero, so at the top the header is transparent
 * with light text; after 40px it turns into a cream bar, hides on scroll down and returns on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 500 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <>
      <header className={`hdr${solid ? " is-solid" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="wrap hdr__in">
          <Link href="/" aria-label="Group Design — на головну">
            <Logo />
          </Link>
          <nav className="hdr__nav" aria-label="Головне меню">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hdr__right">
            <a className="hdr__phone" href={tel}>
              {site.phoneLabel}
            </a>
            <a className={`btn btn--sm ${solid ? "" : "btn--light"}`} href="#lead">
              Обговорити проєкт
            </a>
            <button className="hdr__burger" aria-label="Відкрити меню" aria-expanded={open} onClick={() => setOpen(true)}>
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Меню" aria-hidden={!open}>
        <div className="drawer__top">
          <Link href="/" tabIndex={open ? 0 : -1}>
            <Logo />
          </Link>
          <button className="drawer__close" aria-label="Закрити меню" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <IClose size={26} />
          </button>
        </div>
        <nav className="drawer__nav" aria-label="Мобільне меню">
          <Link href="/" tabIndex={open ? 0 : -1}>
            Головна
          </Link>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} tabIndex={open ? 0 : -1}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="drawer__foot">
          <a href={tel} tabIndex={open ? 0 : -1} style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
            <IPhone /> {site.phoneLabel}
          </a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
            <IInsta /> {site.instagramHandle}
          </a>
          <a className="btn btn--light btn--block" href="#lead" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Обговорити проєкт
          </a>
        </div>
      </div>
    </>
  );
}
