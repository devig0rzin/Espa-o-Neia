"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSequence, type ScrollSequenceHandle } from "@/components/motion/ScrollSequence";
import { scrollSequence } from "@/data/media";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Avaliação",
    text: "Conversamos sobre seus objetivos, histórico e expectativas — sem pressa e sem compromisso.",
    image: "/images/site/avaliacao.jpg",
  },
  {
    n: "02",
    title: "Plano personalizado",
    text: "Desenhamos o protocolo ideal para o seu momento, com metas realistas e frequência clara.",
    image: "/images/site/servicos/limpeza-de-pele.jpg",
  },
  {
    n: "03",
    title: "Acompanhamento",
    text: "Cuidamos de você a cada sessão, com ajustes quando necessário e orientação para casa.",
    image: "/images/site/sobre-bem-estar.jpg",
  },
];

/**
 * "Sua jornada": seção fixada que avança com o scroll.
 * Com quadros em public/frames (ver data/media.ts) usa animação quadro a quadro;
 * sem eles, alterna as imagens ilustrativas.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  const seq = useRef<ScrollSequenceHandle>(null);
  const cfg = scrollSequence.jornada;
  const useFrames = Boolean(cfg.pattern && cfg.frames > 1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".j-step");
      const imgs = gsap.utils.toArray<HTMLElement>(".j-img");
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });
      gsap.set(imgs.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: `+=${panels.length * 80}%`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => seq.current?.setProgress(self.progress),
        },
      });
      tl.to(".j-progress", { scaleX: 1, duration: panels.length }, 0);
      panels.forEach((p, i) => {
        if (i > 0) {
          tl.to(panels[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }, i - 0.4);
          tl.to(p, { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.2);
          if (imgs[i]) {
            tl.to(imgs[i - 1], { autoAlpha: 0, duration: 0.4 }, i - 0.4);
            tl.to(imgs[i], { autoAlpha: 1, duration: 0.4 }, i - 0.3);
          }
        }
        if (imgs[i]) tl.to(imgs[i], { scale: 1.08, duration: 1 }, i);
      });
    });

    return () => mm.revert();
  }, []);

  // O GSAP move a seção para dentro de um "pin-spacer"; o contêiner externo evita que o React
  // tente remover a seção do pai original ao sair da página.
  return (
    <div>
      <section
        ref={root}
        className="relative flex min-h-screen items-center overflow-hidden bg-creme py-16"
        aria-labelledby="jornada-titulo"
      >
        <div className="container-wide grid items-center gap-10 lg:grid-cols-2">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-3xl border border-nude-escuro/40 shadow-suave",
              useFrames ? "aspect-video" : "aspect-[4/3] lg:aspect-[4/5] lg:max-h-[78vh]",
            )}
          >
            {useFrames ? (
              <ScrollSequence
                ref={seq}
                pattern={cfg.pattern!}
                frames={cfg.frames}
                pad={cfg.pad}
                ariaLabel="Animação da jornada de cuidado no Espaço Néia"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              steps.map((s, i) => (
                <div key={s.n} className="j-img absolute inset-0">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-framboesa-escuro">Sua jornada</p>
            <h2
              id="jornada-titulo"
              className="mt-3 font-display text-3xl leading-tight text-grafite md:text-5xl"
            >
              Do primeiro contato ao <span className="italic text-framboesa">resultado</span>
            </h2>

            <div className="relative mt-10 min-h-[11rem]">
              {steps.map((s, i) => (
                <div key={s.n} className={`j-step ${i === 0 ? "" : "absolute inset-x-0 top-0"}`}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-5xl text-framboesa">{s.n}</span>
                    <h3 className="font-display text-3xl text-grafite">{s.title}</h3>
                  </div>
                  <p className="mt-3 max-w-md leading-relaxed text-grafite-suave">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 h-px w-full max-w-md bg-nude-escuro/60" aria-hidden>
              <div className="j-progress h-px origin-left scale-x-0 bg-framboesa" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
