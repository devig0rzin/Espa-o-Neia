/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Imagens externas podem ser liberadas aqui quando a cliente enviar fotos reais/CDN.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
