import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound on-dark" style={{ background: "var(--dark)" }}>
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display" style={{ marginTop: 24 }}>
          Сторінку <em>не знайдено</em>
        </h1>
        <Link href="/" className="btn btn--light">
          На головну
        </Link>
      </div>
    </section>
  );
}
