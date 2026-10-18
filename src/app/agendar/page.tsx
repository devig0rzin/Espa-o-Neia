import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Section } from "@/components/ui/Section";
import { getServices, canShowPrices } from "@/lib/services-source";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Agendar horário",
  description: "Agende online sua avaliação gratuita ou tratamento no Espaço Néia, em Cotia. Escolha dia e horário em 1 minuto.",
  alternates: { canonical: "/agendar" },
};

export const revalidate = 60;

export default async function AgendarPage() {
  const services = await getServices();
  const demo = process.env.NEXT_PUBLIC_PREVIEW_STATIC === "1";
  return (
    <Section container="narrow" className="pt-10 md:pt-16">
      <p className="text-sm font-medium text-framboesa-escuro">Agendamento online</p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-grafite md:text-5xl">
        Reserve seu <span className="italic text-framboesa">momento</span>
      </h1>
      <p className="mt-4 text-grafite-suave">Escolha o tratamento, o dia e o horário. A confirmação é imediata — e você ainda adiciona ao seu Google Agenda.</p>
      <div className="mt-10">
        <Suspense>
          <BookingWizard services={services} showPrices={canShowPrices()} demo={demo} />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-sm text-grafite-suave">
        Prefere conversar? <a href={whatsappLink()} className="text-framboesa underline" target="_blank" rel="noopener noreferrer">Chame no WhatsApp</a> · {site.phoneDisplay}
      </p>
    </Section>
  );
}
