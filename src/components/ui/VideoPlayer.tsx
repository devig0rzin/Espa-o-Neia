"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
 * - Com `src`: mostra o poster com botão de play; ao clicar, inicia
 *   a reprodução inline com controles nativos.
 */
export function VideoPlayer({ src, poster, label = "Vídeo institucional", ratio = "aspect-[4/5]", className }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  }

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
        ref={videoRef}
        src={src}
        poster={poster ?? undefined}
        controls={playing}
        className="h-full w-full object-cover"
        aria-label={label}
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Reproduzir ${label}`}
          className="group absolute inset-0 flex items-center justify-center bg-petrol/20 transition-colors hover:bg-petrol/30"
        >
          {poster && (
            <Image src={poster} alt="" fill className="absolute inset-0 -z-10 object-cover" />
          )}
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-marfim/90 shadow-suave transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-petrol" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
