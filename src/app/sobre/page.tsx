import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder, Placeholder } from "@/components/ui/Placeholder";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { team } from "@/data/team";
import { visible } from "@/lib/drafts";

export const metadata: Metadata = {
  title: "Sobre o Espaço Néia | Estética e Bem-estar em Cotia",
  description:
    "Conheça o Espaço Néia: um espaço de beleza, estética avançada e bem-estar em Cotia e Granja Viana, com atendimento humanizado e foco na sua autoestima.",
  alternates: { canonical: "/sobre" },
};

const valores = [
  {
    title: "Cuidado individual",
    text: "Cada pessoa é única. Ouvimos antes de indicar, e desenhamos protocolos sob medida.",
  },
  {
    title: "Sofisticação sem arrogância",
    text: "Um ambiente premium e acolhedor, onde você se sente à vontade desde o primeiro momento.",
  },
  {
    title: "Responsabilidade",
    text: "Comunicação transparente, expectativas realistas e respeito ao seu tempo.",
  },
];

export default function SobrePage() {
  const equipe = visible(team);
  return (
    <>
      {/* HERO */}
      <Section className="bg-gradient-to-b from-creme to-marfim">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua">Sobre nós</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-grafite md:text-5xl">
              Beleza que nasce do cuidado
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grafite-suave">
              O Espaço Néia nasceu para ser mais do que uma clínica de estética: um lugar onde tecnologia,
              técnica e acolhimento se encontram para valorizar a sua autoestima.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* MANIFESTO */}
      <Section container="narrow">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Nosso manifesto"
            title="Acreditamos em transformação com naturalidade"
          />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-grafite-suave">
            <p>
              Beleza não é sobre parecer outra pessoa — é sobre se sentir bem sendo quem você é. Por isso,
              cada protocolo do Espaço Néia começa por uma conversa: entender o seu momento, seus objetivos e
              o que faz sentido para você.
            </p>
            <p>
              Unimos estética avançada, emagrecimento e bem-estar em um só endereço, sempre com técnica,
              responsabilidade e um olhar atento aos detalhes. Aqui, você é acompanhada de perto, com
              transparência e cuidado do início ao fim.
            </p>
            <p className="font-display text-2xl text-grafite">
              “Cuidar de você é revelar a sua melhor versão — com confiança e naturalidade.”
            </p>
          </div>
        </Reveal>
      </Section>

      {/* PROPOSTA DE VALOR */}
      <Section className="bg-creme">
        <SectionHeading eyebrow="O que nos guia" title="Nossos valores" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valores.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-3xl bg-marfim p-8 shadow-card">
                <h3 className="font-display text-xl text-rose">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-grafite-suave">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EQUIPE — só aparece com integrantes aprovados (ou nos previews), ver src/data/team.ts */}
      {equipe.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Quem cuida de você" title="Nossa equipe" />
          {equipe.some((m) => m.status === "draft") && (
            <Placeholder label="Equipe" className="mx-auto mt-8 max-w-2xl text-center">
              Nomes fictícios, visíveis só no preview. Substitua por integrantes reais em{" "}
              <code>src/data/team.ts</code> e marque <code>status: &quot;approved&quot;</code>.
            </Placeholder>
          )}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {equipe.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border border-nude-escuro/40 bg-marfim p-6 shadow-card"
              >
                <ImagePlaceholder label="Foto do profissional" ratio="aspect-square" className="mb-5" />
                <p className="font-medium text-grafite">{member.name}</p>
                <p className="text-sm text-rose">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-grafite-suave">{member.bio}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* AMBIENTE / ESTRUTURA */}
      <Section className="bg-creme">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Nosso espaço"
              title="Um ambiente pensado para o seu bem-estar"
            />
            <p className="mt-6 leading-relaxed text-grafite-suave">
              Cada detalhe do Espaço Néia foi pensado para acolher: ambientes clean, confortáveis e
              reservados, para que o seu momento de cuidado seja também um momento de calma.
            </p>
            <p className="mt-4 leading-relaxed text-grafite-suave">
              Estamos em Cotia, na Vila São Francisco de Assis, atendendo clientes de Granja Viana e toda a
              região com hora marcada.
            </p>
          </Reveal>
          <Reveal delay={120}>
            {/* Imagens ilustrativas (geradas por IA) — ver public/images/ilustrativas/.
                Substituir por fotos reais do espaço assim que disponíveis. */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-card">
                <Image
                  src="/images/ilustrativas/spa-pedicure-manicure.png"
                  alt="Ambiente ilustrativo de atendimento no Espaço Néia"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-card">
                <Image
                  src="/images/ilustrativas/micropigmentacao-sobrancelha.png"
                  alt="Ambiente ilustrativo de procedimento facial no Espaço Néia"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] uppercase tracking-wide text-grafite-suave/70">
              Imagens ilustrativas
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        title="Venha nos conhecer"
        description="Agende sua avaliação e sinta de perto o cuidado do Espaço Néia."
      />
    </>
  );
}
