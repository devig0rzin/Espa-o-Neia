import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { media } from "@/data/media";
import { whatsappLink } from "@/data/site";

const pontos = [
  "Ambiente clean, reservado e climatizado",
  "Protocolos individuais, sem pressa",
  "Equipamentos e técnicas atualizados",
];

/** Seção "Ambiente / Experiência" — preparada para vídeo institucional (com fallback elegante). */
export function ExperienceSection() {
  return (
    <Section className="bg-creme">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <VideoPlayer
            src={media.experienceVideo.src}
            poster={media.experienceVideo.poster}
            label={media.experienceVideo.label}
            ratio="aspect-[16/10]"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="text-sm font-medium text-framboesa-escuro">Ambiente &amp; experiência</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-grafite md:text-4xl">
            Um espaço para você desacelerar
          </h2>
          <p className="mt-4 leading-relaxed text-grafite-suave">
            Mais do que procedimentos, o Espaço Néia é um convite à pausa. Cada detalhe do ambiente foi
            pensado para que a sua visita seja também um momento de bem-estar — do primeiro contato à
            despedida.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-grafite">
            {pontos.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-framboesa" aria-hidden /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink()} external>
              Conhecer o espaço
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
