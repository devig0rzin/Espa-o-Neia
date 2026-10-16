import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/Placeholder";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { categories, getCategory } from "@/data/categories";
import { whatsappLink } from "@/data/site";

// Gera estaticamente uma página para cada categoria (performance/SEO)
export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) return {};
  return {
    title: `${cat.name} em Cotia e Granja Viana`,
    description: `${cat.shortDescription} Agende sua avaliação no Espaço Néia, em Cotia.`,
    alternates: { canonical: `/servicos/${cat.slug}` },
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const cat = getCategory(categoria);
  if (!cat) notFound();

  const waMsg = `Olá! Tenho interesse em ${cat.name} e gostaria de agendar uma avaliação.`;

  return (
    <>
      {/* HERO ESPECÍFICO */}
      <Section className="bg-gradient-to-b from-creme to-marfim">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <nav aria-label="Trilha de navegação" className="mb-5 text-xs text-grafite-suave">
              <Link href="/servicos" className="hover:text-rose">
                Tratamentos
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-grafite">{cat.name}</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua">{cat.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-grafite md:text-5xl">
              {cat.heroTitle}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-grafite-suave">{cat.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappLink(waMsg)} external size="lg">
                Avaliação gratuita
              </Button>
              <Button href={whatsappLink(waMsg)} external variant="secondary" size="lg">
                Falar no WhatsApp
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            {cat.heroImage ? (
              // Imagem ilustrativa (gerada por IA) — ver public/images/ilustrativas/.
              // Substituir por foto real do ambiente/procedimento quando disponível.
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-suave">
                <Image
                  src={cat.heroImage}
                  alt={`Ilustração de ${cat.name.toLowerCase()} no Espaço Néia`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <span className="absolute left-4 top-4 rounded-full bg-marfim/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-grafite-suave">
                  Imagem ilustrativa
                </span>
              </div>
            ) : (
              <ImagePlaceholder label={`Foto: ${cat.name}`} ratio="aspect-[4/5]" className="shadow-suave" />
            )}
          </Reveal>
        </div>
      </Section>

      {/* DESEJOS ATENDIDOS */}
      <Section container="narrow">
        <SectionHeading align="left" eyebrow="Para você que deseja" title="O que este cuidado atende" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {cat.desires.map((d) => (
            <li key={d} className="flex items-start gap-3 rounded-2xl bg-creme p-5 text-sm text-grafite">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-rose" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      {/* PRINCIPAIS PROCEDIMENTOS */}
      <Section className="bg-creme">
        <SectionHeading eyebrow="Como cuidamos" title="Principais procedimentos" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cat.procedures.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div className="flex h-full gap-5 rounded-3xl bg-marfim p-7 shadow-card">
                <span className="font-display text-2xl text-aqua">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl text-grafite">{p.name}</h3>
                    {p.regulated && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose">
                        Indicação profissional
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-grafite-suave">{p.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {cat.regulatoryNote && (
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-aqua/60 bg-aqua/5 p-5 text-center text-xs text-grafite-suave">
            {cat.regulatoryNote}
          </p>
        )}
      </Section>

      {/* DIFERENCIAIS */}
      <Section>
        <SectionHeading eyebrow="Diferenciais" title="Por que cuidar disso no Espaço Néia" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {cat.differentials.map((d) => (
            <div
              key={d}
              className="rounded-3xl border border-nude-escuro/40 bg-marfim p-7 text-center shadow-card"
            >
              <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-aqua/50" aria-hidden />
              <p className="text-sm leading-relaxed text-grafite">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ ESPECÍFICO */}
      {cat.faq.length > 0 && (
        <Section container="narrow" className="bg-creme">
          <SectionHeading eyebrow="Dúvidas frequentes" title={`Sobre ${cat.name.toLowerCase()}`} />
          <div className="mt-10">
            <FaqAccordion items={cat.faq} />
          </div>
          <FaqJsonLd items={cat.faq} />
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
