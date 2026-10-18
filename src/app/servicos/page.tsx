import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Tratamentos e Serviços | Estética em Cotia e Granja Viana",
  description:
    "Estética facial, corporal, emagrecimento, modelagem e cuidados de beleza em Cotia e Granja Viana. Conheça os tratamentos do Espaço Néia e agende sua avaliação.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-creme to-marfim pb-10">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="text-sm font-medium text-framboesa">Nossos tratamentos</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-grafite md:text-5xl">
              Cuidado completo, do rosto ao corpo
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grafite-suave">
              Explore nossas categorias de tratamento. Todos os protocolos começam por uma avaliação
              individual, para indicar o que faz mais sentido para você.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CATEGORIAS PRINCIPAIS */}
      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ÍNDICE COMPLETO DE PROCEDIMENTOS */}
      <Section className="bg-creme">
        <SectionHeading
          eyebrow="Todos os procedimentos"
          title="Um cuidado para cada objetivo"
          description="Veja o catálogo completo, organizado por categoria. Clique para conhecer os detalhes de cada frente de tratamento."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link
                href={`/servicos/${c.slug}`}
                className="group block h-full rounded-3xl border border-nude-escuro/40 bg-marfim p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-suave"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-grafite">{c.name}</h3>
                  <span className="text-framboesa transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.procedures.map((p) => (
                    <li
                      key={p.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-nude-escuro/50 bg-creme px-3 py-1.5 text-xs text-grafite-suave"
                    >
                      {p.name}
                      {p.regulated && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-framboesa"
                          aria-label="Indicação profissional"
                          title="Indicação profissional"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 text-center text-xs text-grafite-suave">
          <span className="h-1.5 w-1.5 rounded-full bg-framboesa" aria-hidden /> Procedimentos com indicação e
          execução restritas a profissional habilitado, mediante avaliação individual.
        </p>
      </Section>

      <CtaBanner
        title="Não sabe por onde começar?"
        description="Na avaliação, indicamos o caminho ideal para o seu objetivo. Fale com a gente."
      />
    </>
  );
}
