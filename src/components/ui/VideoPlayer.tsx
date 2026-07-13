"use client";

import { cn } from "@/lib/utils";

type Props = {
  src: string | null;
  poster?: string | null;
  label?: string;
  ratio?: string;
  className?: string;
};

/**
 * Player de vídeo institucional com fallback elegante.
 * - Sem `src`: mostra uma capa premium com botão de play desabilitado
 *   e aviso "Vídeo em produção" — pronto para receber o arquivo depois
 *   (basta preencher em src/data/media.ts).
 * - Com `src`: inicia automaticamente, sem som, em loop e mantém
 *   os controles nativos disponíveis.
 */
export function VideoPlayer({ src, poster, label = "Vídeo institucional", ratio = "aspect-[4/5]", className }: Props) {
  if (!src) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-3xl border border-nude-escuro/50 bg-gradient-to-br from-petrol/90 via-petrol to-aqua-escuro/80 text-center shadow-suave",
          ratio,
          className,
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
        <div className="relative px-6">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-marfim/50 bg-marfim/10 backdrop-blur">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-marfim" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider2 text-marfim/90">{label}</p>
          <p className="mt-1 text-[11px] text-marfim/60">Vídeo em produção — em breve por aqui</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-nude-escuro/50 shadow-suave", ratio, className)}>
      <video
        src={src}
        poster={poster ?? undefined}
        autoPlay
        loop
        muted
        playsInline
        controls
        preload="auto"
        className="h-full w-full object-cover"
        aria-label={label}
      />
    </div>
  );
}
