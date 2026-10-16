"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { site, whatsappLink } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu mobile ao trocar de página (ajuste de estado durante o render, sem effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-nude-escuro/40 bg-marfim/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-wide flex items-center justify-between py-3">
        {/* Logo real da marca — public/images/logo/logo-espaco-neia.jpg */}
        <Link href="/" className="group flex items-center" aria-label="Espaço Néia — página inicial">
          <Image
            src="/images/logo/logo-espaco-neia.jpg"
            alt="Espaço Néia Beleza e Estética"
            width={320}
            height={320}
            priority
            className="h-16 w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105 md:h-20"
          />
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Menu principal" className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm tracking-wide text-grafite-suave transition-colors hover:text-rose",
                  active && "text-rose",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={whatsappLink()} external size="md">
            Avaliação gratuita
          </Button>
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-grafite lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <div className="space-y-1.5">
            <span className={cn("block h-0.5 w-6 bg-grafite transition-transform", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-grafite transition-opacity", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-grafite transition-transform", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu principal"
          className="border-t border-nude-escuro/40 bg-marfim lg:hidden"
        >
          <ul className="container-wide flex flex-col py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-base text-grafite-suave hover:text-rose"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button href={whatsappLink()} external size="lg" className="w-full">
                Avaliação gratuita
              </Button>
            </li>
            <li className="pt-2 text-center text-sm text-grafite-suave">
              ou ligue: {site.phoneDisplay}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
