"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { categories } from "@/data/categories";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/** Atalhos em pílula exibidos ao lado da logo (desktop). */
const quickLinks = [
  { label: "Agendar online", href: "/agendar", filled: true },
  { label: "Tratamentos", href: "/servicos" },
  { label: "Preços", href: "/precos" },
];

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu ao trocar de página (ajuste de estado durante o render, sem effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Trava a rolagem da página e fecha com Esc enquanto o menu está aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-blush-borda bg-white/95 backdrop-blur-md">
        <div className="container-wide flex items-center justify-between gap-4 py-2.5">
          <div className="flex items-center gap-6">
            {/* Logo real da marca — public/images/logo/logo-espaco-neia.png (fundo transparente) */}
            <Link href="/" className="flex items-center" aria-label="Espaço Néia — página inicial">
              <Image
                src="/images/logo/logo-espaco-neia.png"
                alt="Espaço Néia Beleza e Estética"
                width={900}
                height={440}
                priority
                className="h-11 w-auto object-contain md:h-14"
              />
            </Link>
            <span className="hidden h-10 w-px bg-blush-borda lg:block" aria-hidden />
            <nav aria-label="Atalhos" className="hidden items-center gap-2.5 lg:flex">
              {quickLinks.map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    q.filled
                      ? "bg-framboesa text-white hover:bg-framboesa-escuro"
                      : "bg-blush text-framboesa hover:bg-blush-borda",
                    pathname === q.href && !q.filled && "ring-1 ring-framboesa/40",
                  )}
                >
                  {q.filled && <CalendarIcon />}
                  {q.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-framboesa text-white transition-colors hover:bg-framboesa-escuro sm:flex"
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.4 14.6c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-2.9-1.6-4.1-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
              </svg>
            </a>
            <Link
              href="/agendar"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-framboesa px-4 text-sm font-medium text-white lg:hidden"
            >
              <CalendarIcon />
              <span className="hidden min-[380px]:inline">Agendar</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 items-center gap-3 rounded-full border border-framboesa/50 px-5 text-sm font-medium text-framboesa transition-colors hover:bg-blush"
              aria-expanded={open}
              aria-controls="menu-principal"
            >
              <span className="space-y-1" aria-hidden>
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-4 bg-current" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Menu lateral (todas as telas). Fica fora do <header>: o backdrop-blur dele prenderia o position:fixed. */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full bg-grafite/40"
        />
        <nav
          id="menu-principal"
          aria-label="Menu principal"
          inert={!open}
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white px-8 pb-10 pt-6 shadow-suave transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-framboesa">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-framboesa/50 px-4 text-sm text-framboesa hover:bg-blush"
            >
              Fechar <span aria-hidden>✕</span>
            </button>
          </div>

          <ul className="mt-8 divide-y divide-blush-borda border-y border-blush-borda">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-4 font-display text-xl text-grafite transition-colors hover:text-framboesa",
                    pathname === item.href && "text-framboesa",
                  )}
                >
                  {item.label}
                  <span aria-hidden className="text-framboesa">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm font-medium text-framboesa">Tratamentos</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/servicos/${c.slug}`}
                  className="inline-block rounded-full bg-blush px-4 py-2 text-sm text-framboesa hover:bg-blush-borda"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-10">
            <Link
              href="/agendar"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-framboesa py-3.5 font-medium text-white hover:bg-framboesa-escuro"
            >
              <CalendarIcon /> Agendar avaliação gratuita
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full border border-framboesa/50 py-3.5 font-medium text-framboesa hover:bg-blush"
            >
              Falar no WhatsApp
            </a>
            <p className="pt-2 text-center text-sm text-grafite-suave">{site.phoneDisplay}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
