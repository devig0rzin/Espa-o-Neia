import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/data/site";

// Fontes auto-hospedadas pelo Next (sem chamadas externas em runtime)
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Espaço Néia | Estética Avançada, Emagrecimento e Beleza em Cotia",
    template: "%s | Espaço Néia",
  },
  description:
    "Clínica de estética avançada, emagrecimento, beleza e bem-estar em Cotia e Granja Viana. Agende sua avaliação e cuide de você com tecnologia e acolhimento.",
  keywords: [
    "estética Cotia",
    "estética Granja Viana",
    "clínica de estética Cotia",
    "emagrecimento Cotia",
    "estética facial Cotia",
    "estética corporal Granja Viana",
    "Espaço Néia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.legalName,
    title: "Espaço Néia | Estética Avançada e Bem-estar em Cotia",
    description:
      "Estética avançada, emagrecimento e beleza com tecnologia e acolhimento em Cotia e Granja Viana.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Espaço Néia Beleza e Estética" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <LocalBusinessJsonLd />
        {/* Link "pular para conteúdo" — acessibilidade */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-framboesa focus:px-4 focus:py-2 focus:text-marfim"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
