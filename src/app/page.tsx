import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { TreatmentsCarousel, type TreatmentItem } from "@/components/home/TreatmentsCarousel";
import { TreatmentFinder } from "@/components/home/TreatmentFinder";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { Journey } from "@/components/home/Journey";
import { SpaceTour } from "@/components/home/SpaceTour";
import { scrollSequence } from "@/data/media";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CampaignCard } from "@/components/ui/CampaignCard";
import { FaqGrid } from "@/components/ui/FaqGrid";
import { Button } from "@/components/ui/Button";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { campaigns } from "@/data/campaigns";
import { liveCampaigns } from "@/lib/campaigns";
import { faq } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { services } from "@/data/services";
import { images } from "@/data/images";
import { visible } from "@/lib/drafts";
import { canShowPrices } from "@/lib/services-source";
import { formatDuration, formatPrice } from "@/lib/booking";
import { whatsappLink, site } from "@/data/site";

/** Categoria do serviço (nome curto) → página da categoria. */
const categorySlug: Record<string, string> = {
  "Estética facial": "estetica-facial",
  "Emagrecimento e modelagem": "emagrecimento-e-modelagem-corporal",
  "Estética corporal": "estetica-corporal",
  "Beleza e cuidados": "beleza-e-cuidados",
};
const tabs = Object.keys(categorySlug);

const destaques = [
  {
    title: "Avaliação gratuita",
    text: "Antes de qualquer protocolo, uma conversa individual para entender o seu objetivo.",
    href: "/agendar?servico=avaliacao-gratuita",
  },
  {
    title: "Tudo em um só lugar",
    text: "Estética facial, corporal, emagrecimento e beleza no mesmo endereço, em Cotia.",
    href: "/servicos",
  },
  {
    title: "Agenda online",
    text: "Escolha o tratamento, o dia e o horário pelo site e receba a confirmação na hora.",
    href: "/agendar",
  },
];

const motivos = [
  { title: "Ambiente acolhedor", text: "Um espaço reservado e confortável, pensado para o seu bem-estar." },
  {
    title: "Tecnologia com critério",
    text: "Equipamentos e técnicas aplicados com responsabilidade, a partir da avaliação.",
  },
  {
    title: "Atendimento próximo",
    text: "Acompanhamento em cada sessão, com orientação para cuidar de você em casa.",
  },
];

const pilares = [
  { word: "Beleza", image: images.sobre.beleza },
  { word: "Autoestima", image: images.sobre.autoestima },
  { word: "Bem-estar", image: images.sobre.bemEstar },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapEmbedQuery)}`;

// Revalida a cada 1h: campanhas vencidas saem do ar sem novo deploy (no máximo ~1h após o fim do dia).
export const revalidate = 3600;

export default function HomePage() {
  const depoimentos = visible(testimonials);
  const perguntas = visible(faq);
  const campanhas = liveCampaigns(campaigns);
  const mostrarPrecos = canShowPrices();

  const tratamentos: TreatmentItem[] = services
    .filter((s) => s.priceType !== "gratuito" && categorySlug[s.category])
    .map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      categorySlug: categorySlug[s.category],
      image: images.servicos[s.id] ?? images.servicoPadrao,
      duration: formatDuration(s.durationMin),
      priceLabel: mostrarPrecos ? formatPrice(s) : null,
      needsEvaluation: s.bookable === "avaliacao",
    }));
  const opcoes = services
    .filter((s) => s.priceType !== "gratuito")
    .map((s) => ({ id: s.id, name: s.name, category: s.category }));

  return (
    <>
      <HeroSlider />

      {/* DESTAQUES */}
      <section className="border-b border-blush-borda">
        <div className="container-wide grid divide-y divide-blush-borda md:grid-cols-3 md:divide-x md:divide-y-0">
          {destaques.map((d, i) => (
            <Reveal key={d.title} delay={i * 80} className="py-8 md:px-8 md:py-10 md:first:pl-0">
              <h2 className="font-display text-xl font-semibold text-petrol">{d.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-grafite-suave">{d.text}</p>
              <Link
                href={d.href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-framboesa hover:gap-3"
              >
                Saiba mais <span aria-hidden>→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRATAMENTOS MAIS PROCURADOS */}
      <Section id="tratamentos" className="pb-10 md:pb-14">
        <SectionHeading eyebrow="Tratamentos" title="Tratamentos mais procurados no Espaço Néia" />
        <TreatmentsCarousel items={tratamentos} tabs={tabs} />
      </Section>

      {/* BUSCA POR TRATAMENTO */}
      <div className="container-wide pb-16 md:pb-24">
        <Reveal>
          <TreatmentFinder options={opcoes} areas={tabs} />
        </Reveal>
      </div>

      {/* LOCALIZAÇÃO */}
      <Section className="pt-4 md:pt-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="dots-rose absolute inset-0 rounded-full opacity-80 [mask-image:radial-gradient(circle,black_55%,transparent_72%)]" />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-suave">
                  <svg viewBox="0 0 24 24" className="h-9 w-9 text-framboesa" fill="currentColor" aria-hidden>
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <span className="mt-1 text-xs font-semibold text-framboesa">Espaço Néia</span>
                </span>
              </div>
              <div className="absolute bottom-6 left-2 md:left-0">
                <p className="font-display text-4xl font-semibold text-framboesa">Cotia</p>
                <p className="text-sm text-grafite-suave">e Granja Viana</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              align="left"
              title="Pertinho de você, no coração de Cotia"
              description={`${site.address.street} - ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.zip}. Atendemos Cotia, Granja Viana e região.`}
            />
            <ol className="mt-8 divide-y divide-blush-borda border-y border-blush-borda">
              {motivos.map((m, i) => (
                <li key={m.title} className="flex gap-4 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-sm font-semibold text-framboesa">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-grafite">{m.title}</p>
                    <p className="text-sm text-grafite-suave">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={mapsUrl} external>
                Como chegar
              </Button>
              <Button href="/contato" variant="secondary">
                Horários e contato
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* DEPOIMENTOS — só aparece com depoimentos aprovados (ou nos previews) */}
      {depoimentos.length > 0 && (
        <Section className="pt-0 md:pt-0">
          <SectionHeading
            eyebrow="Quem cuida da beleza aqui"
            title="Histórias de quem confia no Espaço Néia"
          />
          <Reveal className="mt-10">
            <TestimonialsSlider items={depoimentos} image={images.depoimentos} />
          </Reveal>
        </Section>
      )}

      {/* FAIXA AGENDE AGORA */}
      <section className="container-wide">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col justify-center bg-gradient-to-br from-rose-escuro to-framboesa px-8 py-12 text-white md:px-12">
              <h2 className="text-balance font-display text-3xl font-light leading-tight md:text-4xl">
                Agende agora a sua experiência no <strong className="font-semibold">Espaço Néia</strong>
              </h2>
              <p className="mt-3 text-white/90">Viva o seu momento de autocuidado.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/agendar" variant="white">
                  Agendar agora
                </Button>
                <Button href={whatsappLink()} external variant="outline-light">
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src={images.bannerAgende}
                alt=""
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* SOBRE / PROPÓSITO */}
      <Section>
        <SectionHeading
          eyebrow="Sobre nós"
          title="Cuidar da sua beleza é o nosso propósito"
          description="Acreditamos que beleza e autoestima caminham juntas. Nosso compromisso é com o seu bem-estar em cada detalhe, com técnica, tecnologia e um atendimento acolhedor."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {pilares.map((p, i) => (
            <Reveal key={p.word} delay={i * 90}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-grafite/50 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-8 text-center font-display text-3xl font-semibold uppercase tracking-wide text-white md:text-4xl">
                  {p.word}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-6 border-b border-blush-borda pb-12 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-semibold text-petrol md:max-w-xs">
            Tudo o que a sua beleza precisa, em um só lugar
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-grafite-suave">{site.manifesto}</p>
          <Button href="/sobre" variant="secondary">
            Saiba mais
          </Button>
        </div>
      </Section>

      {/* TOUR PELO ESPAÇO — vídeo quadro a quadro no scroll (sem quadros, cai na jornada com fotos) */}
      {scrollSequence.jornada.pattern ? <SpaceTour /> : <Journey />}

      {/* CAMPANHAS EM DESTAQUE — some quando não há campanha vigente */}
      {campanhas.length > 0 && (
        <Section className="bg-blush">
          <SectionHeading
            eyebrow="Campanhas"
            title="Condições especiais em destaque"
            description="Protocolos e pacotes selecionados para você começar. Consulte disponibilidade e condições atualizadas."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campanhas.slice(0, 6).map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <CampaignCard campaign={c} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Dúvidas frequentes" />
        <div className="mt-10">
          <FaqGrid items={perguntas.slice(0, 8)} />
        </div>
        <div className="mt-8 text-center">
          <Button href="/faq" variant="ghost">
            Ver todas as perguntas →
          </Button>
        </div>
        <FaqJsonLd items={perguntas} />
      </Section>

      {/* AVALIAÇÃO GRATUITA */}
      <section className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image
            src={images.avaliacao}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="bg-gradient-to-br from-rose-escuro to-framboesa px-6 py-14 text-white md:px-14 lg:py-20">
          <h2 className="font-display text-3xl font-medium md:text-4xl">Avaliação estética gratuita!</h2>
          <p className="mt-3 max-w-md text-white/90">
            É muito simples: escolha o melhor dia e horário e receba a confirmação na hora.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              "Escolha “Avaliação gratuita” ou o tratamento que deseja",
              "Selecione o dia e o horário livres na agenda",
              "Informe nome e WhatsApp e pronto: horário confirmado",
            ].map((passo, i) => (
              <li key={passo} className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm md:text-base">{passo}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/agendar?servico=avaliacao-gratuita" variant="white" size="lg">
              Escolher dia e horário
            </Button>
            <Button href={whatsappLink()} external variant="outline-light" size="lg">
              Prefiro o WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
