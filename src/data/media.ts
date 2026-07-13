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
