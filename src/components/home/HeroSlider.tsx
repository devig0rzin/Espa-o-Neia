"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Sua jornada de beleza e bem-estar começa aqui",
    text: "Estética avançada, emagrecimento e beleza em um só lugar, no coração de Cotia, com tecnologia e acolhimento.",
    cta: { label: "Agendar avaliação gratuita", href: "/agendar?servico=avaliacao-gratuita" },
    alt: "Cuidado facial com tratamento de pele",
  },
  {
    title: "Modelagem corporal com protocolo feito para você",
    text: "Criolipólise, lipocavitação, drenagem e mais, definidos depois de uma avaliação individual e sem compromisso.",
    cta: { label: "Ver tratamentos corporais", href: "/servicos/emagrecimento-e-modelagem-corporal" },
    alt: "Tratamento corporal com massagem",
  },
  {
    title: "Seu momento de autocuidado, com hora marcada",
    text: "Escolha o tratamento, o dia e o horário em menos de um minuto e receba a confirmação na hora.",
    cta: { label: "Escolher meu horário", href: "/agendar" },
    alt: "Cuidados de beleza para mãos e pés",
  },
];

/** Estrela de brilho na emenda entre foto e painel. */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M50 0l7 27 21-18-11 26 28-3-24 15 24 15-28-3 11 26-21-18-7 27-7-27-21 18 11-26-28 3 24-15L5 32l28 3L22 9l21 18z"
      />
    </svg>
  );
}

/** Banner principal em carrossel: foto à esquerda, painel de cor à direita. */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const go = useCallback((i: number) => setIndex((i + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), 6500);
    return () => window.clearInterval(id);
  }, [paused, total]);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques do Espaço Néia"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className="sr-only">
        Espaço Néia: estética avançada, emagrecimento e beleza em Cotia e Granja Viana
      </h1>
      <div className="relative grid lg:min-h-[560px] lg:grid-cols-2">
        {/* Fotos (crossfade) */}
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          {slides.map((s, i) => (
            <Image
              key={i}
              src={images.hero[i]}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                "object-cover transition-all duration-[1200ms] ease-out",
                i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
              )}
            />
          ))}
        </div>

        {/* Painel de texto */}
        <div className="relative flex flex-col justify-center bg-gradient-to-br from-rose-escuro to-framboesa px-6 pb-8 pt-12 text-white md:px-14 lg:py-16">
          <Sparkle className="absolute -top-10 left-8 h-20 w-20 text-white lg:-left-12 lg:top-14 lg:h-24 lg:w-24" />
          <div className="relative grid w-full max-w-xl">
            {slides.map((s, i) => (
              <div
                key={i}
                aria-hidden={i !== index}
                inert={i !== index}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-700 ease-out",
                  i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
                )}
              >
                <h2 className="text-balance font-display text-4xl font-medium leading-[1.1] md:text-5xl">
                  {s.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/90">{s.text}</p>
                <Link
                  href={s.cta.href}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-framboesa transition-transform hover:-translate-y-0.5"
                >
                  {s.cta.label} <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Controles */}
          <div className="mt-8 flex items-center gap-3 lg:absolute lg:bottom-6 lg:right-14 lg:mt-0">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Destaque anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 hover:bg-white/15"
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir para o destaque ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-2 rounded-full bg-white transition-all",
                    i === index ? "w-6" : "w-2 opacity-50",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próximo destaque"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 hover:bg-white/15"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
