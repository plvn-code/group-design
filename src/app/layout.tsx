import type { Metadata, Viewport } from "next";
import { Geologica, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IChat } from "@/components/Icons";
import { single } from "@/lib/projects";
import { site } from "@/lib/site";

/** Same type system as ALUABRI: Geologica (light display), Manrope (text/UI), JetBrains Mono (small uppercase labels). */
const display = Geologica({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["200", "300", "400", "500"],
  variable: "--display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  variable: "--sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--mono",
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
    <html lang="uk" className={`${display.variable} ${sans.variable} ${mono.variable}`} data-scroll-behavior="smooth">
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
