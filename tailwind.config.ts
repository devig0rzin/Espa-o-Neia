import type { Config } from "tailwindcss";

/**
 * Design tokens do Espaço Néia.
 * Paleta extraída diretamente da logo real da marca (círculo água-marinha,
 * traço em azul petróleo e assinatura em rosé) — ver public/images/logo/.
 * Toda a identidade visual do site vive aqui — mudar a cor de destaque
 * do site inteiro é alterar um único valor abaixo.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base clara / marfim (neutros que equilibram as cores vivas da marca)
        marfim: "#FBFAF8",
        creme: "#F3EFEA",
        // Nude sofisticado (apoio neutro quente)
        nude: "#E9DFD3",
        "nude-escuro": "#D9C9B6",
        // Água-marinha / turquesa — cor de assinatura da logo (círculo)
        aqua: "#5FCFCE",
        "aqua-claro": "#BDEDEC",
        "aqua-escuro": "#3FA3A3",
        // Rosé — cor da assinatura manuscrita "Néia" (acento principal / CTAs)
        rose: "#E19DB6",
        "rose-escuro": "#C97694",
        // Azul petróleo — cor do traço/tipografia da logo (contraste, headings escuros)
        petrol: "#2C5B6B",
        "petrol-suave": "#436F7E",
        // Framboesa — rosé profundo da marca: CTAs e painéis de destaque (contraste AA com branco)
        framboesa: "#B4537A",
        "framboesa-escuro": "#94405F",
        // Blush — faixas e painéis claros
        blush: "#FCEFF2",
        "blush-borda": "#F3DCE3",
        // Grafite (texto de leitura)
        grafite: "#2A2B2C",
        "grafite-suave": "#5B5D5E",
      },
      fontFamily: {
        // Aplicadas via next/font em layout.tsx (variáveis CSS)
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.2em",
      },
      boxShadow: {
        suave: "0 10px 40px -12px rgba(44, 42, 40, 0.18)",
        card: "0 4px 24px -8px rgba(44, 42, 40, 0.12)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.7s ease-out both",
        breathe: "breathe 2.8s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
