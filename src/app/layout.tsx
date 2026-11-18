import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IChat } from "@/components/Icons";
import { single } from "@/lib/projects";
import { site } from "@/lib/site";

/** Inter Tight — light, tight grotesque for big headings and UI; Cormorant Garamond italic — accents in <em>. */
const sans = Inter_Tight({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["200", "300", "400", "500"],
  variable: "--sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--serif",
  display: "swap",
});

const title = "Group Design — дизайн інтерʼєру та ремонт під ключ у Києві";
const description =
  "Дизайн-студія Олени Якубець: дизайн-проєкти квартир, будинків і комерційних просторів, авторський супровід, комплектація та ремонт під ключ у Києві. Портфоліо реалізованих обʼєктів.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s — Group Design" },
  description,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Group Design",
    locale: "uk_UA",
    title,
    description,
    images: ["/img/p/panorama/00.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1814",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: "Group Design by Olena Yakubets",
  founder: { "@type": "Person", name: "Олена Якубець" },
  telephone: site.phone,
  areaServed: "Київ",
  address: { "@type": "PostalAddress", addressLocality: "Київ", addressCountry: "UA" },
  sameAs: [site.instagram],
  image: `${site.url}${single.olena.src}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip" href="#main">
          Перейти до змісту
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <a className="fab" href="#lead" aria-label="Обговорити проєкт">
          <span className="fab__dot" aria-hidden="true" />
          <IChat size={16} /> Консультація
        </a>
        <Effects />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
