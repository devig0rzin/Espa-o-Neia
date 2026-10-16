import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { RealResultsGallery } from "@/components/home/RealResultsGallery";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { CampaignCard } from "@/components/ui/CampaignCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { categories } from "@/data/categories";
import { campaigns } from "@/data/campaigns";
import { liveCampaigns } from "@/lib/campaigns";
import { faq } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { visible } from "@/lib/drafts";
import { whatsappLink, site } from "@/data/site";

const pilares = [
  {
    title: "Estética avançada",
    text: "Protocolos faciais e corporais com tecnologia aplicada conforme avaliação.",
  },
  {
    title: "Emagrecimento & modelagem",
    text: "Planos personalizados para o contorno corporal e o bem-estar.",
  },
  { title: "Beleza & cuidados", text: "Sobrancelhas, cílios e cuidados de beleza com padrão de clínica." },
  { title: "Bem-estar", text: "Momentos de autocuidado em um ambiente clean e acolhedor." },
];

const diferenciais = [
  {
    title: "Avaliação individual",
    text: "Nada de protocolos genéricos. Tudo começa entendendo você e o seu objetivo.",
  },
  {
    title: "Tecnologia e técnica",
    text: "Equipamentos e técnicas aplicados com critério e responsabilidade.",
  },
  { title: "Acolhimento real", text: "Atendimento discreto, humano e atencioso do início ao fim." },
  { title: "Transparência", text: "Comunicação clara sobre expectativas, frequência e cuidados." },
  { title: "Ambiente premium", text: "Um espaço pensado para o seu conforto e bem-estar." },
  { title: "Localização", text: "No coração de Cotia, atendendo Granja Viana e toda a região." },
];

const etapas = [
  { n: "01", title: "Avaliação", text: "Conversamos sobre seus objetivos, histórico e expectativas." },
  { n: "02", title: "Plano personalizado", text: "Desenhamos o protocolo ideal para o seu momento." },
  {
    n: "03",
    title: "Acompanhamento",
    text: "Cuidamos de você a cada sessão, com ajustes quando necessário.",
  },
];

// Revalida a cada 1h: campanhas vencidas saem do ar sem novo deploy (no máximo ~1h após o fim do dia).
export const revalidate = 3600;

export default function HomePage() {
  const depoimentos = visible(testimonials);
  const perguntas = visible(faq);
  const campanhas = liveCampaigns(campaigns);
  return (
    <>
      <Hero />

      {/* AUTORIDADE & ACOLHIMENTO */}
      <Section container="narrow" className="text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua">
            Bem-vinda ao Espaço Néia
          </p>
          <p className="mt-6 font-display text-2xl leading-relaxed text-grafite md:text-3xl">
            {site.manifesto}
          </p>
          <div className="rule-gold mx-auto mt-8" />
        </Reveal>
      </Section>

      {/* SOLUÇÕES EM UM SÓ LUGAR */}
      <Section className="bg-creme">
        <SectionHeading
          eyebrow="Soluções em um só lugar"
          title="Tudo o que a sua beleza precisa, com o cuidado que você merece"
          description="Reunimos diferentes frentes de cuidado para que você encontre, em um só endereço, atenção completa à sua estética e ao seu bem-estar."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-3xl bg-marfim p-7 shadow-card">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-aqua/50 font-display text-lg text-rose">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl text-grafite">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grafite-suave">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CATEGORIAS DE TRATAMENTO */}
      <Section>
        <SectionHeading
          eyebrow="Tratamentos"
          title="Escolha por onde começar"
          description="Cada categoria reúne protocolos pensados para objetivos diferentes. Explore e agende a sua avaliação."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/servicos" variant="secondary" size="lg">
            Ver todos os tratamentos
          </Button>
        </div>
      </Section>

      {/* POR QUE ESCOLHER O ESPAÇO NÉIA */}
      <Section className="bg-grafite text-marfim">
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que escolher o Espaço Néia"
          className="[&_h2]:text-marfim [&_p]:text-marfim/70"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 70}>
              <div className="h-full rounded-3xl border border-marfim/15 bg-marfim/5 p-7">
                <h3 className="font-display text-xl text-aqua-claro">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-marfim/75">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TECNOLOGIA & PERSONALIZAÇÃO */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            {/* Imagem ilustrativa (gerada por IA) — ver public/images/ilustrativas/ */}
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-card">
              <Image
                src="/images/ilustrativas/cuidado-facial-gotas.png"
                alt="Ilustração de cuidado facial personalizado no Espaço Néia"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua">
              Tecnologia &amp; personalização
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-grafite md:text-4xl">
              O seu protocolo, desenhado passo a passo
            </h2>
            <p className="mt-4 leading-relaxed text-grafite-suave">
              Acreditamos que resultado de verdade vem de um plano feito para você — nunca de fórmulas
              prontas. Veja como conduzimos a sua jornada:
            </p>
            <ol className="mt-8 space-y-6">
              {etapas.map((e) => (
                <li key={e.n} className="flex gap-5">
                  <span className="font-display text-2xl text-rose">{e.n}</span>
                  <div>
                    <h3 className="font-medium text-grafite">{e.title}</h3>
                    <p className="text-sm text-grafite-suave">{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Button href={whatsappLink()} external>
                Começar pela avaliação
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* PROTOCOLOS EXCLUSIVOS (destaque premium) */}
      <Section className="bg-gradient-to-br from-nude/60 via-creme to-marfim">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua">Protocolos exclusivos</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-grafite md:text-4xl">
              Experiências de cuidado pensadas nos mínimos detalhes
            </h2>
            <p className="mt-4 leading-relaxed text-grafite-suave">
              Nossos protocolos combinam técnicas, tecnologia e um roteiro de atendimento acolhedor, para que
              cada visita seja um momento só seu. Personalização é o que nos define.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-grafite">
              {[
                "Roteiro de cuidado individualizado",
                "Ambiente reservado e confortável",
                "Orientação para prolongar os resultados em casa",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {campanhas.length > 0 && <Button href="/campanhas">Ver protocolos em destaque</Button>}
              <Button href={whatsappLink()} external variant="secondary">
                Falar no WhatsApp
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            {/* Imagem ilustrativa (gerada por IA) — ver public/images/ilustrativas/ */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-suave">
              <Image
                src="/images/ilustrativas/micropigmentacao-sobrancelha.png"
                alt="Ilustração de procedimento de precisão no Espaço Néia"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <ExperienceSection />

      {/* CAMPANHAS EM DESTAQUE — some quando não há campanha vigente */}
      {campanhas.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Campanhas"
            title="Condições especiais em destaque"
            description="Protocolos e pacotes selecionados para você começar. Consulte disponibilidade e condições atualizadas."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campanhas.slice(0, 3).map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <CampaignCard campaign={c} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <RealResultsGallery />

      {/* DEPOIMENTOS — só aparece com depoimentos aprovados (ou nos previews) */}
      {depoimentos.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Quem cuida da beleza aqui"
            title="Histórias de quem confia no Espaço Néia"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {depoimentos.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <figure className="flex h-full flex-col rounded-3xl bg-marfim p-7 shadow-card">
                  <div className="mb-3 text-aqua" aria-hidden>
                    ★★★★★
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-grafite-suave">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-nude-escuro/40 pt-4 text-sm">
                    <span className="font-medium text-grafite">{t.name}</span>
                    <span className="block text-grafite-suave">{t.city}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          {depoimentos.some((t) => t.status === "draft") && (
            <Placeholder label="Depoimentos" className="mx-auto mt-8 max-w-2xl text-center">
              Depoimentos fictícios, visíveis só no preview. Substitua pelo texto real autorizado pelas
              clientes em <code>src/data/testimonials.ts</code> e marque{" "}
              <code>status: &quot;approved&quot;</code>.
            </Placeholder>
          )}
        </Section>
      )}

      {/* FAQ */}
      <Section container="narrow">
        <SectionHeading eyebrow="Dúvidas frequentes" title="Tudo o que você precisa saber antes de agendar" />
        <div className="mt-12">
          <FaqAccordion items={perguntas.slice(0, 5)} />
        </div>
        <div className="mt-8 text-center">
          <Button href="/faq" variant="ghost">
            Ver todas as perguntas →
          </Button>
        </div>
        <FaqJsonLd items={perguntas} />
      </Section>

      <CtaBanner />
    </>
  );
}
