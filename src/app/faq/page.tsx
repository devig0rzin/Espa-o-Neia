import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/data/faq";
import { visible } from "@/lib/drafts";

export const metadata: Metadata = {
  title: "Perguntas Frequentes | Espaço Néia Cotia",
  description:
    "Tire suas dúvidas sobre avaliação, agendamento, pagamento, frequência dos tratamentos e atendimento no Espaço Néia, em Cotia e Granja Viana.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const perguntas = visible(faq);
  return (
    <>
      <Section className="bg-gradient-to-b from-creme to-marfim pb-8">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="text-sm font-medium text-framboesa">Perguntas frequentes</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-grafite md:text-5xl">
              Dúvidas? A gente responde
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grafite-suave">
              Reunimos as perguntas mais comuns. Se ficar qualquer dúvida, é só chamar no WhatsApp.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section container="narrow" className="pt-4">
        <SectionHeading align="left" eyebrow="Tudo o que você precisa saber" title="Perguntas e respostas" />
        <div className="mt-10">
          <FaqAccordion items={perguntas} />
        </div>
        <FaqJsonLd items={perguntas} />
      </Section>

      <CtaBanner />
    </>
  );
}
