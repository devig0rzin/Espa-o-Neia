"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";
import { cn } from "@/lib/utils";

/** Accordion acessível de FAQ (navegável por teclado). */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-nude-escuro/50 border-y border-nude-escuro/50">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg text-grafite">{item.question}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-aqua/50 text-rose transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-12 text-sm leading-relaxed text-grafite-suave">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
