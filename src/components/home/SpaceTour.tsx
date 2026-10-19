"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSequence, type ScrollSequenceHandle } from "@/components/motion/ScrollSequence";
import { scrollSequence } from "@/data/media";

const steps = [
  {
    n: "01",
    title: "Recepção acolhedora",
    text: "Você chega e é recebida com calma, num ambiente claro e pensado para o seu conforto.",
  },
  {
    n: "02",
    title: "Avaliação sem pressa",
    text: "Conversamos sobre seus objetivos e montamos o protocolo ideal para o seu momento.",
  },
  {
    n: "03",
    title: "Seu momento de cuidado",
    text: "Salas reservadas e preparadas para cada tratamento, com atenção em cada detalhe.",
  },
];

/**
 * Tour pelo espaço: o vídeo ocupa a tela inteira e avança quadro a quadro com o scroll,
 * enquanto os textos das etapas trocam por cima. Quadros configurados em data/media.ts.
 */
export function SpaceTour() {
  const root = useRef<HTMLElement>(null);
  const seq = useRef<ScrollSequenceHandle>(null);
  const cfg = scrollSequence.jornada;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".t-step", el);
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: true,
          onUpdate: (self) => seq.current?.setProgress(self.progress),
        },
      });
      tl.to(".t-progress", { scaleX: 1, duration: panels.length }, 0);
      panels.forEach((p, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -30, duration: 0.25 }, i - 0.25);
        tl.to(p, { autoAlpha: 1, y: 0, duration: 0.25 }, i - 0.05);
      });
    });

    // Com menos movimento: um quadro fixo do meio do vídeo, todas as etapas visíveis.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      seq.current?.setProgress(0.75);
    });

    return () => mm.revert();
  }, []);

  if (!cfg.pattern) return null;

  // O GSAP move a seção para um "pin-spacer"; o contêiner externo evita erro do React ao sair da página.
  return (
    <div>
      <section
        ref={root}
        className="relative h-[100svh] min-h-[560px] overflow-hidden bg-grafite"
        aria-labelledby="tour-titulo"
      >
        <ScrollSequence
          ref={seq}
          pattern={cfg.pattern}
          frames={cfg.frames}
          pad={cfg.pad}
          ariaLabel="Passeio em vídeo pela recepção e pelas salas do Espaço Néia"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-grafite/80 via-grafite/20 to-transparent md:bg-gradient-to-r md:from-grafite/85 md:via-grafite/45"
        />

        <div className="container-wide relative flex h-full flex-col justify-end pb-16 text-white md:justify-center md:pb-0">
          <p className="text-sm font-medium text-white/85">Um passeio pelo espaço</p>
          <h2
            id="tour-titulo"
            className="mt-2 max-w-lg text-balance font-display text-4xl font-medium leading-tight md:text-6xl"
          >
            Conheça o Espaço Néia
          </h2>

          <div className="relative mt-8 min-h-[8.5rem] max-w-md">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`t-step ${i === 0 ? "" : "invisible absolute inset-x-0 top-0 opacity-0"}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl font-light text-white/70">{s.n}</span>
                  <h3 className="font-display text-2xl font-medium">{s.title}</h3>
                </div>
                <p className="mt-2 leading-relaxed text-white/85">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 h-0.5 w-full max-w-md bg-white/25" aria-hidden>
            <div className="t-progress h-0.5 origin-left scale-x-0 bg-white" />
          </div>
        </div>
      </section>
    </div>
  );
}
