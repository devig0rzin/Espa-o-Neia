import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Placeholder } from "@/components/ui/Placeholder";
import { getServices, canShowPrices } from "@/lib/services-source";
import { formatDuration, formatPrice } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Tratamentos e preços",
  description: "Veja os tratamentos do Espaço Néia em Cotia, duração e valores. Agende online sua avaliação gratuita.",
  alternates: { canonical: "/precos" },
};

export const revalidate = 3600;

export default async function PrecosPage() {
  const services = await getServices();
  const showPrices = canShowPrices();
  const groups = [...services.reduce((m, s) => m.set(s.category, [...(m.get(s.category) ?? []), s]), new Map<string, typeof services>())];

  return (
    <>
      <Section className="pb-6 pt-10 md:pt-16">
        <SectionHeading eyebrow="Tratamentos e preços" title="Transparência desde o primeiro passo" description="Valores de referência por sessão. O protocolo ideal é definido na avaliação individual — que é gratuita." />
        {showPrices && (
          <Placeholder label="Preços" className="mx-auto mt-8 max-w-2xl text-center">
            Valores <strong>estimados</strong> com base no mercado de Cotia/Granja Viana, visíveis só no preview. Confirme com a Néia e
            marque <code>servicesStatus = &quot;approved&quot;</code> em <code>src/data/services.ts</code> para publicar.
          </Placeholder>
        )}
      </Section>
      <Section className="pt-6">
        <div className="space-y-14">
          {groups.map(([cat, list]) => (
            <Reveal key={cat}>
              <h2 className="font-display text-2xl text-petrol md:text-3xl">{cat}</h2>
              <ul className="mt-4 divide-y divide-nude-escuro/50 border-y border-nude-escuro/50">
                {list.map((s) => (
                  <li key={s.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-grafite">{s.name}</p>
                      <p className="text-sm text-grafite-suave">
                        {formatDuration(s.durationMin)}
                        {s.bookable === "avaliacao" ? " · agendamento via avaliação gratuita" : ""}
                      </p>
                    </div>
                    <p className="font-display text-xl text-grafite">{showPrices || s.priceType === "gratuito" ? formatPrice(s) : "Sob avaliação"}</p>
                    <Link href={`/agendar?servico=${s.id}`} className="rounded-full border border-grafite/20 px-5 py-2 text-sm text-grafite transition hover:border-rose hover:text-rose">Agendar</Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-grafite-suave">Os resultados dependem de avaliação individual. Pagamento: Pix, cartão de crédito e débito, e dinheiro.</p>
      </Section>
      <CtaBanner title="Pronta para começar?" description="Escolha o melhor horário e venha conhecer o espaço. A primeira avaliação é por nossa conta." />
    </>
  );
}
