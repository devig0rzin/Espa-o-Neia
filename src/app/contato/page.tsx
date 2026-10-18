import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato e Localização | Espaço Néia em Cotia",
  description:
    "Fale com o Espaço Néia em Cotia. Endereço na Vila São Francisco de Assis, horários de atendimento, WhatsApp e formulário para agendar sua avaliação.",
  alternates: { canonical: "/contato" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapEmbedQuery)}&output=embed`;

export default function ContatoPage() {
  return (
    <>
      {/* HERO + ACOLHIMENTO */}
      <Section className="bg-gradient-to-b from-creme to-marfim pb-10">
        <div className="container-narrow text-center">
          <Reveal>
            <p className="text-sm font-medium text-framboesa">
              Fale com o Espaço Néia
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-grafite md:text-5xl">
              Será um prazer cuidar de você
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grafite-suave">
              Estamos por aqui para tirar suas dúvidas e encontrar o melhor horário para a sua avaliação.
              Escolha o canal que preferir.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* COLUNA: INFORMAÇÕES */}
          <div>
            <Reveal>
              <h2 className="font-display text-2xl text-grafite">Informações de atendimento</h2>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-aqua">Endereço</h3>
                  <address className="mt-2 not-italic leading-relaxed text-grafite-suave">
                    {site.address.street}
                    <br />
                    {site.address.district}
                    <br />
                    {site.address.city} — {site.address.state}, {site.address.zip}
                  </address>
                </div>

                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-aqua">Telefone / WhatsApp</h3>
                  <p className="mt-2 text-grafite-suave">
                    <a href={`tel:+${site.whatsappNumber}`} className="hover:text-framboesa">
                      {site.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-aqua">Horários</h3>
                  <ul className="mt-2 space-y-1 text-grafite-suave">
                    {site.hours.map((h) => (
                      <li
                        key={h.label}
                        className="flex justify-between gap-6 border-b border-nude-escuro/30 py-1"
                      >
                        <span>{h.label}</span>
                        <span>{h.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold uppercase tracking-wider text-aqua">Como chegar</h3>
                  <p className="mt-2 leading-relaxed text-grafite-suave">
                    Estamos na Vila São Francisco de Assis, em Cotia, com fácil acesso para quem vem de Granja
                    Viana e região. Recomendamos chegar com alguns minutos de antecedência. Em caso de dúvida
                    sobre a chegada, chame-nos no WhatsApp.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={whatsappLink()} external>
                  Falar no WhatsApp
                </Button>
                <Button href={`tel:+${site.whatsappNumber}`} external variant="secondary">
                  Ligar agora
                </Button>
              </div>

              {/* Bloco de confiança */}
              <div className="mt-8 rounded-3xl border border-nude-escuro/40 bg-creme p-6 text-sm text-grafite-suave">
                <p className="font-medium text-grafite">Atendimento com hora marcada</p>
                <p className="mt-2 leading-relaxed">
                  Trabalhamos com agendamento para garantir a você um atendimento tranquilo, reservado e sem
                  pressa. Seus dados são tratados com cuidado e usados apenas para o seu atendimento.
                </p>
              </div>
            </Reveal>
          </div>

          {/* COLUNA: FORMULÁRIO */}
          <div>
            <Reveal delay={120}>
              <div className="rounded-3xl border border-nude-escuro/40 bg-marfim p-8 shadow-card">
                <h2 className="font-display text-2xl text-grafite">Solicitar atendimento</h2>
                <p className="mt-2 text-sm text-grafite-suave">
                  Preencha e enviaremos o seu contato pelo WhatsApp para agilizar o retorno.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* MAPA */}
      <Section container="none" className="pt-0">
        <div className="container-wide">
          <div className="overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-card">
            <iframe
              title="Mapa da localização do Espaço Néia"
              src={mapSrc}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
