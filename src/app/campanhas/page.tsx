import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CampaignCard } from "@/components/ui/CampaignCard";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Button } from "@/components/ui/Button";
import { campaigns } from "@/data/campaigns";
import { whatsappLink } from "@/data/site";
import { liveCampaigns } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Campanhas e Promoções | Espaço Néia Cotia",
  description:
    "Confira as campanhas, pacotes e protocolos promocionais do Espaço Néia em Cotia e Granja Viana. Condições especiais por tempo limitado.",
  alternates: { canonical: "/campanhas" },
};

// Revalida a cada 1h: campanhas vencidas saem do ar sem novo deploy (no máximo ~1h após o fim do dia).
export const revalidate = 3600;

const mensagemSemCampanha = "Olá! Vim pela página de campanhas e gostaria de saber das condições atuais.";

export default function CampanhasPage() {
  const promos = liveCampaigns(campaigns);
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
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {promos.map((c, i) => (
                <Reveal key={c.id} delay={i * 80}>
                  <CampaignCard campaign={c} />
                </Reveal>
              ))}
            </div>
            <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-grafite-suave">
              Os valores e condições apresentados são informativos e podem variar conforme avaliação
              individual, disponibilidade de agenda e vigência de cada campanha. Confirme sempre as condições
              atualizadas diretamente com a nossa equipe.
            </p>
          </>
        ) : (
          <div className="mx-auto max-w-xl rounded-3xl border border-nude-escuro/40 bg-creme/60 px-8 py-14 text-center shadow-card">
            <div className="rule-gold mx-auto" />
            <h2 className="mt-6 font-display text-3xl leading-tight text-grafite">
              Novas condições em breve
            </h2>
            <p className="mt-4 leading-relaxed text-grafite-suave">
              No momento não há campanhas vigentes. Fale com a nossa equipe pelo WhatsApp e conheça as
              condições disponíveis para o seu protocolo.
            </p>
            <div className="mt-8">
              <Button href={whatsappLink(mensagemSemCampanha)} external size="lg">
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        )}
      </Section>

      {promos.length > 0 && (
        <CtaBanner
          title="Quer aproveitar uma condição?"
          description="Fale com a gente pelo WhatsApp e garanta seu horário."
        />
      )}
    </>
  );
}
