import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { whatsappLink, site } from "@/data/site";
import { media } from "@/data/media";

const badges = ["+20 procedimentos", "Avaliação individual", "Cotia & Granja Viana"];

/** Hero premium da Home: headline forte, subheadline persuasiva, CTA duplo e vídeo/imagem. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-marfim via-creme to-marfim">
      {/* Elementos decorativos nas cores da marca (água-marinha + rosé) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-aqua/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-rose/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-aqua-claro/40 blur-2xl"
      />

      <div className="container-wide grid items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-aqua/50 bg-aqua/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider2 text-aqua-escuro">
            Estética avançada em Cotia &amp; Granja Viana
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-grafite sm:text-5xl lg:text-6xl">
            Sua beleza cuidada com <span className="text-rose">tecnologia</span>, acolhimento e resultado.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-grafite-suave">{site.manifesto}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink()} external size="lg">
              {site.ctaPrimary}
            </Button>
            <Button href="/servicos" variant="secondary" size="lg">
              Conhecer tratamentos
            </Button>
          </div>

          {/* Selos de confiança */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {badges.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm text-grafite-suave">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />
                {b}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-grafite-suave">
            Atendimento com hora marcada · {site.phoneDisplay}
          </p>
        </div>

        <div className="relative">
          <VideoPlayer
            src={media.heroVideo.src}
            poster={media.heroVideo.poster}
            label={media.heroVideo.label}
            ratio="aspect-[4/5]"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-aqua/40 bg-marfim/90 px-6 py-4 shadow-card backdrop-blur md:block">
            <p className="font-display text-2xl text-rose">Protocolos</p>
            <p className="text-sm text-grafite-suave">personalizados para você</p>
          </div>
        </div>
      </div>
    </section>
  );
}
