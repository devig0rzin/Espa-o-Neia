import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CampaignCard } from "@/components/ui/CampaignCard";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { activeCampaigns } from "@/data/campaigns";

export const metadata: Metadata = {
  title: "Campanhas e Promoções | Espaço Néia Cotia",
  description:
    "Confira as campanhas, pacotes e protocolos promocionais do Espaço Néia em Cotia e Granja Viana. Condições especiais por tempo limitado.",
  alternates: { canonical: "/campanhas" },
};

export default function CampanhasPage() {
  const promos = activeCampaigns();
  return (
    <>
      <Section className="bg-gradient-to-b from-creme to-marfim">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua">
              Campanhas &amp; protocolos
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-grafite md:text-5xl">
              Condições especiais para cuidar de você
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grafite-suave">
              Selecionamos protocolos e pacotes com condições especiais. Aproveite e agende sua avaliação para
              começar.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-4">
        {promos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {promos.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <CampaignCard campaign={c} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-grafite-suave">
            Nenhuma campanha ativa no momento. Fale conosco para conhecer as condições atuais.
          </p>
        )}

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-grafite-suave">
          Os valores e condições apresentados são informativos e podem variar conforme avaliação individual,
          disponibilidade de agenda e vigência de cada campanha. Confirme sempre as condições atualizadas
          diretamente com a nossa equipe.
        </p>
      </Section>

      <CtaBanner
        title="Quer aproveitar uma condição?"
        description="Fale com a gente pelo WhatsApp e garanta seu horário."
      />
    </>
  );
}
