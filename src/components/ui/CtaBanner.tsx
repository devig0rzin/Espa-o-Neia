import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";

/** Faixa de CTA final, reutilizada ao fim das páginas. */
export function CtaBanner({
  title = "Vamos conversar sobre você?",
  description = "Agende sua avaliação e descubra o protocolo ideal para o seu momento. Atendimento acolhedor, com hora marcada.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-escuro to-framboesa py-16 text-white md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div className="container-narrow relative text-center">
        <p className="mb-3 text-sm font-medium text-white/85">Espaço Néia</p>
        <h2 className="text-balance font-display text-3xl font-medium leading-tight md:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/agendar" variant="white" size="lg">
            Agendar online
          </Button>
          <Button href={whatsappLink()} external variant="outline-light" size="lg">
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
