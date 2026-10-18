"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

const lines = ["Sua beleza cuidada", "com tecnologia,", "acolhimento e resultado."];
const badges = ["+20 procedimentos", "Avaliação individual", "Cotia & Granja Viana"];

/** Hero editorial: título revelado por linha, imagem em arco com parallax e atalho de agendamento. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".h-eyebrow", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(".h-line", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
        .fromTo(".h-fade", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .fromTo(".h-arch", { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 1.1 }, 0.2)
        .fromTo(".h-card", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.5");

      gsap.to(".h-parallax", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".h-blob", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".h-eyebrow, .h-fade, .h-arch, .h-card", { autoAlpha: 1 });
      gsap.set(".h-line", { yPercent: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-marfim">
      <div aria-hidden className="h-blob pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-aqua/25 blur-3xl" />
      <div aria-hidden className="h-blob pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-rose/15 blur-3xl" />

      <div className="container-wide relative grid items-center gap-10 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pb-28 lg:pt-16">
        <div>
          <p className="h-eyebrow gsap-in mb-6 inline-flex items-center gap-2 rounded-full border border-aqua/50 bg-aqua/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider2 text-aqua-escuro">
            Estética avançada em Cotia &amp; Granja Viana
          </p>

          <h1 className="font-display text-[2.6rem] leading-[1.04] text-grafite sm:text-6xl lg:text-7xl">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-1">
                <span className={`h-line block ${i === 1 ? "italic text-rose" : ""}`}>{l}</span>
              </span>
            ))}
          </h1>

          <p className="h-fade gsap-in mt-7 max-w-xl text-lg leading-relaxed text-grafite-suave">{site.manifesto}</p>

          <div className="h-fade gsap-in mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/agendar" size="lg">
              Agendar agora
            </Button>
            <Button href="/precos" variant="secondary" size="lg">
              Ver tratamentos e preços
            </Button>
          </div>

          <ul className="h-fade gsap-in mt-10 flex flex-wrap gap-x-7 gap-y-2">
            {badges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-grafite-suave">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="h-arch gsap-in relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-nude-escuro/50 shadow-suave">
            <div className="h-parallax absolute inset-x-0 -top-[6%] h-[112%]">
              <Image
                src="/images/ilustrativas/cuidado-facial-gotas.png"
                alt="Ilustração de cuidado facial no Espaço Néia"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="h-card gsap-in absolute -bottom-6 left-2 right-2 rounded-2xl border border-marfim/60 bg-marfim/85 p-5 shadow-suave backdrop-blur-md sm:left-auto sm:right-[-1rem] sm:w-72">
            <p className="text-xs font-semibold uppercase tracking-wider2 text-aqua-escuro">Primeira visita</p>
            <p className="mt-1 font-display text-2xl text-grafite">Avaliação gratuita</p>
            <p className="mt-1 text-sm text-grafite-suave">30 minutos para entender seu objetivo. Escolha dia e horário em 1 minuto.</p>
            <Link href="/agendar?servico=avaliacao-gratuita" className="mt-3 inline-block text-sm font-medium text-rose hover:text-rose-escuro">
              Escolher horário →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
