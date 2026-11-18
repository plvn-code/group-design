import { NextResponse } from "next/server";

/**
 * Lead form endpoint. Sends the request to the studio's Telegram via a bot when
 * TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID are set (Vercel env). Nothing is stored.
 * Without them it answers { ok: false, reason: "not-configured" } and the form falls back
 * to "send this text via Viber / Instagram Direct / call".
 */
export const runtime = "nodejs";

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (clip(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const name = clip(body.name, 80);
  const phone = clip(body.phone, 40);
  if (!name || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 422 });
  }
  const type = clip(body.type, 40);
  const area = clip(body.area, 20);
  const services = Array.isArray(body.services) ? body.services.map((s) => clip(s, 40)).filter(Boolean).slice(0, 6) : [];
  const comment = clip(body.comment, 1000);
  const page = clip(body.page, 200);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });

  const text = [
    "<b>Нова заявка з сайту Group Design</b>",
    `Імʼя: ${esc(name)}`,
    `Телефон: ${esc(phone)}`,
    type && `Обʼєкт: ${esc(type)}${area ? `, ${esc(area)} м²` : ""}`,
    services.length > 0 && `Послуги: ${esc(services.join(", "))}`,
    comment && `Коментар: ${esc(comment)}`,
    page && `Сторінка: ${esc(page)}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
}
