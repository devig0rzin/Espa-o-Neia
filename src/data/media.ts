/**
 * ============================================================
 *  VÍDEOS DO SITE — EDITE AQUI QUANDO OS VÍDEOS FICAREM PRONTOS
 * ============================================================
 *  Enquanto `src` estiver null, o componente <VideoPlayer /> exibe
 *  automaticamente uma capa elegante com botão de play desabilitado
 *  e o aviso "Vídeo em produção". Assim que o vídeo existir:
 *
 *  1. Coloque o arquivo .mp4 em public/videos/ (crie a pasta)
 *  2. Preencha `src` com o caminho, ex: "/videos/institucional.mp4"
 *  3. (Opcional) troque `poster` por um frame de capa do próprio vídeo
 *
 *  Nenhuma outra alteração de código é necessária — o player passa
 *  a funcionar automaticamente em todas as seções que o usam.
 * ============================================================
 */

export const media = {
  heroVideo: {
    src: "/videos/campanha-institucional.mp4",
    poster: null as string | null,
    label: "Vídeo institucional — Espaço Néia",
  },
  experienceVideo: {
    src: "/videos/clinica-estetica-facial-corporal.mp4",
    poster: null as string | null,
    label: "Conheça o espaço e os procedimentos",
  },
};

/**
 * ANIMAÇÃO QUADRO A QUADRO (scroll) — preencha quando os quadros estiverem prontos.
 * 1. Exporte os quadros do vídeo como WebP numerados (0001.webp, 0002.webp, ...)
 * 2. Coloque em public/frames/jornada/
 * 3. Preencha `pattern` e `frames`. Enquanto `pattern` for null, a seção
 *    "Sua jornada" usa as imagens ilustrativas como alternativa.
 */
export const scrollSequence = {
  jornada: {
    pattern: "/frames/jornada/{n}.webp" as string | null, // 96 quadros do vídeo (8 s a 12 qps)
    frames: 96,
    pad: 4,
  },
};
