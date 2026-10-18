"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

export type ScrollSequenceHandle = { setProgress: (p: number) => void };

type Props = {
  /** Padrão do caminho, com {n} no lugar do número do quadro. Ex.: "/frames/jornada/{n}.webp" */
  pattern: string;
  frames: number;
  /** Casas do número (0001 → 4). */
  pad?: number;
  className?: string;
  ariaLabel: string;
};

/**
 * Animação quadro a quadro controlada pelo scroll (canvas).
 * Quem usa chama setProgress(0..1) — normalmente a partir de um ScrollTrigger.
 * Carrega os quadros sob demanda e desenha o mais próximo já carregado.
 */
export const ScrollSequence = forwardRef<ScrollSequenceHandle, Props>(function ScrollSequence(
  { pattern, frames, pad = 4, className, ariaLabel },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | undefined)[]>([]);
  const current = useRef(0);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let img = images.current[index];
    // Se o quadro ainda não chegou, usa o mais próximo já carregado.
    for (let d = 1; !img?.complete && d < frames; d++) {
      img = images.current[index - d]?.complete ? images.current[index - d] : images.current[index + d];
    }
    if (!img?.complete || !img.naturalWidth) return;
    if (canvas.width !== img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [frames]);

  useEffect(() => {
    const load = (i: number) => {
      const img = new Image();
      img.decoding = "async";
      img.src = pattern.replace("{n}", String(i + 1).padStart(pad, "0"));
      if (i === 0) img.onload = () => draw(0);
      images.current[i] = img;
    };
    load(0);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    idle(() => {
      for (let i = 1; i < frames; i++) load(i);
    });
  }, [pattern, frames, pad, draw]);

  useImperativeHandle(
    ref,
    () => ({
      setProgress(p: number) {
        const index = Math.min(frames - 1, Math.max(0, Math.round(p * (frames - 1))));
        if (index === current.current) return;
        current.current = index;
        requestAnimationFrame(() => draw(index));
      },
    }),
    [frames, draw],
  );

  return <canvas ref={canvasRef} role="img" aria-label={ariaLabel} className={className} />;
});
