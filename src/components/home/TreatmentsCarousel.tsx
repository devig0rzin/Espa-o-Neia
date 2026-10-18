"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TreatmentItem = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  duration: string;
  /** Preço já formatado; null quando os preços ainda não podem aparecer. */
  priceLabel: string | null;
  needsEvaluation: boolean;
};

/** "Tratamentos mais procurados": abas por categoria + carrossel horizontal de cards. */
export function TreatmentsCarousel({ items, tabs }: { items: TreatmentItem[]; tabs: string[] }) {
  const [tab, setTab] = useState(tabs[0]);
  const track = useRef<HTMLUListElement>(null);
  const visibleItems = items.filter((i) => i.category === tab);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorias de tratamento"
        className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto border-y border-blush-borda px-5 py-3 md:justify-center"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => {
              setTab(t);
              track.current?.scrollTo({ left: 0 });
            }}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
              tab === t ? "bg-framboesa font-medium text-white" : "text-framboesa hover:bg-blush",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative mt-8">
        <ul
          ref={track}
          role="tabpanel"
          aria-label={tab}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {visibleItems.map((s) => (
            <li
              key={s.id}
              className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[23.5%]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-blush-borda bg-white">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 72vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="bg-rose-escuro px-4 py-3 text-center text-white">
                  <h3 className="truncate text-sm font-semibold">{s.name}</h3>
                  <p className="text-xs text-white/85">
                    {s.duration}
                    {s.needsEvaluation && " · com avaliação"}
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-between gap-2 bg-blush/60 px-4 py-3">
                  {s.priceLabel ? (
                    <span className="text-sm font-semibold text-framboesa">{s.priceLabel}</span>
                  ) : (
                    <Link href={`/servicos/${s.categorySlug}`} className="text-sm text-grafite-suave hover:text-framboesa">
                      Saiba mais
                    </Link>
                  )}
                  <Link
                    href={`/agendar?servico=${s.id}`}
                    className="rounded-full bg-framboesa px-3 py-1.5 text-xs font-medium text-white hover:bg-framboesa-escuro"
                    aria-label={`Agendar ${s.name}`}
                  >
                    Agendar
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Ver tratamentos anteriores"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-framboesa/40 text-framboesa hover:bg-blush"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Ver mais tratamentos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-framboesa/40 text-framboesa hover:bg-blush"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
