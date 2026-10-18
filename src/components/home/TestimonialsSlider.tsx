"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Item = { name: string; city: string; text: string };

/** Depoimentos em destaque: texto num painel claro e foto ao lado. */
export function TestimonialsSlider({ items, image }: { items: Item[]; image: string }) {
  const [i, setI] = useState(0);
  const t = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-blush px-6 py-10 md:px-12">
        <div>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-2xl text-framboesa"
            aria-hidden
          >
            “
          </span>
          <div aria-live="polite">
            <blockquote key={i} className="mt-6 animate-fade-rise">
              <p className="text-lg leading-relaxed text-grafite md:text-xl">{t.text}</p>
            </blockquote>
            <p className="mt-6 border-t border-blush-borda pt-4 text-sm">
              <span className="font-semibold text-framboesa">{t.name}</span>
              <span className="block text-grafite-suave">{t.city}</span>
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/agendar"
            className="rounded-full bg-framboesa px-5 py-2.5 text-sm font-medium text-white hover:bg-framboesa-escuro"
          >
            Agendar tratamento →
          </Link>
          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-framboesa/40 text-framboesa hover:bg-white"
              >
                ←
              </button>
              {items.map((_, k) => (
                <span
                  key={k}
                  aria-hidden
                  className={cn(
                    "h-2 rounded-full bg-framboesa transition-all",
                    k === i ? "w-5" : "w-2 opacity-30",
                  )}
                />
              ))}
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-framboesa/40 text-framboesa hover:bg-white"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative aspect-square lg:aspect-auto">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </div>
  );
}
