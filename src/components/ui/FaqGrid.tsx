"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** FAQ em duas colunas, cada pergunta abre e fecha de forma independente. */
export function FaqGrid({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="grid gap-x-12 md:grid-cols-2">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="border-b border-blush-borda">
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[0.95rem] text-grafite hover:text-framboesa"
              >
                {item.question}
                <span
                  aria-hidden
                  className={cn(
                    "text-2xl font-light leading-none text-framboesa transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
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
                <p className="pb-5 pr-8 text-sm leading-relaxed text-grafite-suave">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
