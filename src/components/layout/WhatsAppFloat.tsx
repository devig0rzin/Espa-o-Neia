import { whatsappLink } from "@/data/site";

/** Botão flutuante de WhatsApp, presente em todas as páginas. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-4 right-4 z-50 flex items-center gap-3 md:bottom-6 md:right-6"
    >
      <span className="pointer-events-none hidden rounded-full bg-grafite/90 px-4 py-2 text-sm text-marfim opacity-0 shadow-suave transition-opacity duration-300 group-hover:opacity-100 md:block">
        Falar no WhatsApp
      </span>
      <span className="relative flex h-12 w-12 items-center md:h-14 md:w-14 justify-center rounded-full bg-[#25D366] shadow-suave transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-breathe rounded-full bg-[#25D366]/40" aria-hidden />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden>
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.3l-.4-.2-4.9 1 .9-4.8-.3-.4c-.9-1.5-1.4-3.2-1.4-5 0-5.3 4.4-9.6 9.8-9.6 5.4 0 9.8 4.3 9.8 9.6S21.4 24.8 16 24.8zm5.4-7.2c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-2.9-1.6-4.1-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
        </svg>
      </span>
    </a>
  );
}
