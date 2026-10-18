/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const staticPreview = process.env.PREVIEW_STATIC === "1";

const nextConfig = {
  // PREVIEW_STATIC=1 gera um site 100% estático (só para prévia visual; o agendamento roda em modo demo).
  ...(staticPreview
    ? { output: "export", trailingSlash: true, ...(process.env.PREVIEW_BASE_PATH ? { basePath: process.env.PREVIEW_BASE_PATH } : {}) }
    : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  // Fixa a raiz do projeto (evita o Next inferir a pasta de outro package-lock.json acima deste).
  turbopack: { root: import.meta.dirname },
  // Imagens externas podem ser liberadas aqui quando a cliente enviar fotos reais/CDN.
  images: {
    formats: ["image/avif", "image/webp"],
    ...(staticPreview ? { unoptimized: true } : {}),
  },
  ...(staticPreview
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
