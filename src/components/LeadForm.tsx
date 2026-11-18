"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { IArrow, IChat, IInsta, IPhone } from "./Icons";
import { site, tel } from "@/lib/site";

const TYPES = ["Квартира", "Будинок", "Комерція"];
const SERVICES = ["Дизайн-проєкт", "Авторський супровід", "Комплектація", "Ремонт під ключ"];

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "fallback"; text: string; copied: boolean } | { kind: "error"; msg: string };

/**
 * Lead form → POST /api/lead (Telegram bot). If the bot isn't configured or fails, the visitor
 * gets the ready text plus Viber / Direct / phone buttons, so a request is never silently lost.
 */
export function LeadForm({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  const [st, setSt] = useState<State>({ kind: "idle" });
  const [type, setType] = useState("Квартира");
  const [services, setServices] = useState<string[]>(["Дизайн-проєкт"]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      area: String(fd.get("area") || ""),
      comment: String(fd.get("comment") || ""),
      website: String(fd.get("website") || ""),
      type,
      services,
      page: pathname,
    };
    if (!data.name.trim() || data.phone.replace(/\D/g, "").length < 9) {
      setSt({ kind: "error", msg: "Вкажіть, будь ласка, імʼя та номер телефону." });
      return;
    }
    const text = [
      `Добрий день! Мене звати ${data.name.trim()}.`,
      `Обʼєкт: ${type}${data.area ? `, ${data.area} м²` : ""}.`,
      services.length ? `Цікавить: ${services.join(", ").toLowerCase()}.` : "",
      data.comment.trim(),
      `Мій телефон: ${data.phone.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    setSt({ kind: "sending" });
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean };
      if (j.ok) return setSt({ kind: "sent" });
    } catch {
      /* network error → fallback below */
    }
    const copied = await navigator.clipboard?.writeText(text).then(
      () => true,
      () => false,
    );
    setSt({ kind: "fallback", text, copied: !!copied });
  }

  const cls = `form${light ? " form--light" : ""}`;

  if (st.kind === "sent")
    return (
      <div className={`${cls} form__done`} role="status">
        <span className="eyebrow">Заявку отримано</span>
        <h3>Дякуємо! Ми звʼяжемося з вами найближчим часом.</h3>
        <p className="form__note">Якщо питання термінове — телефонуйте: {site.phoneLabel}</p>
      </div>
    );

  if (st.kind === "fallback")
    return (
      <div className={`${cls} form__done`} role="status">
        <span className="eyebrow">Майже готово</span>
        <h3>Надішліть заявку зручним способом</h3>
        <p className="form__note">{st.copied ? "Ми підготували текст і вже скопіювали його — просто вставте в чат." : "Ми підготували текст — скопіюйте його та надішліть у чат."}</p>
        <div className="form__copy">{st.text}</div>
        <div className="opts">
          <a className="btn btn--sm" href={`${site.viber}&draft=${encodeURIComponent(st.text)}`}>
            <IChat size={16} /> Viber
          </a>
          <a className="btn btn--sm btn--ghost" href={site.direct} target="_blank" rel="noopener noreferrer">
            <IInsta size={16} /> Direct
          </a>
          <a className="btn btn--sm btn--ghost" href={tel}>
            <IPhone size={16} /> Подзвонити
          </a>
        </div>
      </div>
    );

  return (
    <form
      className={cls}
      onSubmit={submit}
      noValidate
      onFocus={() => {
        if (st.kind === "error") setSt({ kind: "idle" });
      }}
    >
      <div className="form__row">
        <label className="field">
          <span>Імʼя</span>
          <input name="name" autoComplete="name" placeholder="Як до вас звертатися" required maxLength={80} />
        </label>
        <label className="field">
          <span>Телефон</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+380" required maxLength={40} />
        </label>
      </div>
      <fieldset>
        <legend>Обʼєкт</legend>
        <div className="opts">
          {TYPES.map((t) => (
            <label key={t} className="opt">
              <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Що потрібно</legend>
        <div className="opts">
          {SERVICES.map((s) => (
            <label key={s} className="opt">
              <input
                type="checkbox"
                value={s}
                checked={services.includes(s)}
                onChange={(e) => setServices((v) => (e.target.checked ? [...v, s] : v.filter((x) => x !== s)))}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form__row">
        <label className="field">
          <span>Площа, м²</span>
          <input name="area" inputMode="numeric" placeholder="Напр., 75" maxLength={20} />
        </label>
        <label className="field">
          <span>Коментар</span>
          <input name="comment" placeholder="ЖК, терміни, побажання" maxLength={1000} />
        </label>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      {st.kind === "error" && (
        <p className="form__err" role="alert">
          {st.msg}
        </p>
      )}
      <button className={`btn btn--block ${light ? "" : "btn--light"}`} type="submit" disabled={st.kind === "sending"}>
        {st.kind === "sending" ? "Надсилаємо…" : "Отримати консультацію"} <IArrow />
      </button>
      <p className="form__note">Відповімо протягом робочого дня. Дані використовуємо лише для звʼязку з вами.</p>
    </form>
  );
}
