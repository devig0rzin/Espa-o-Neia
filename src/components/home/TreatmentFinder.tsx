"use client";

import { useId, useState } from "react";

type Option = { id: string; name: string; category: string };

/** "O que você procura?": escolha a área e o tratamento e vá direto para o agendamento. */
export function TreatmentFinder({ options, areas }: { options: Option[]; areas: string[] }) {
  const [area, setArea] = useState("");
  const [servico, setServico] = useState("avaliacao-gratuita");
  const areaId = useId();
  const servicoId = useId();
  const filtered = area ? options.filter((o) => o.category === area) : options;

  return (
    <div className="rounded-2xl bg-blush px-6 py-8 md:px-10">
      <div className="flex flex-col gap-3 border-b border-blush-borda pb-6 md:flex-row md:items-center md:justify-between">
        <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-framboesa md:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
          </span>
          O que você procura?
        </h2>
        <p className="text-sm text-grafite-suave">Encontre o seu tratamento e agende em poucos cliques.</p>
      </div>

      <form action="/agendar" method="get" className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div>
          <label htmlFor={areaId} className="mb-1.5 block text-sm text-grafite-suave">
            Área do tratamento
          </label>
          <select
            id={areaId}
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setServico("avaliacao-gratuita");
            }}
            className="w-full rounded-full border border-blush-borda bg-white px-4 py-3 text-sm text-grafite"
          >
            <option value="">Todas</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={servicoId} className="mb-1.5 block text-sm text-grafite-suave">
            Tratamento
          </label>
          <select
            id={servicoId}
            name="servico"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="w-full rounded-full border border-blush-borda bg-white px-4 py-3 text-sm text-grafite"
          >
            <option value="avaliacao-gratuita">Ainda não sei (avaliação gratuita)</option>
            {filtered.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-framboesa px-7 py-3 text-sm font-medium text-white hover:bg-framboesa-escuro"
        >
          Ver horários <span aria-hidden>→</span>
        </button>
      </form>
    </div>
  );
}
