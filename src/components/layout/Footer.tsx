import Link from "next/link";
import Image from "next/image";
import { site, whatsappLink } from "@/data/site";
import { mainNav } from "@/data/navigation";
import { categories } from "@/data/categories";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-nude-escuro/40 bg-creme">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-aqua/10 blur-3xl"
      />
      <div className="container-wide relative grid gap-12 py-16 md:grid-cols-4">
        {/* Marca */}
        <div className="md:col-span-1">
          <Image
            src="/images/logo/logo-espaco-neia.jpg"
            alt="Espaço Néia Beleza e Estética"
            width={320}
            height={320}
            className="h-20 w-auto object-contain mix-blend-multiply"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-grafite-suave">
            Estética avançada, emagrecimento, beleza e bem-estar em Cotia, Granja Viana e região.
          </p>
          {site.social.instagram && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-rose hover:text-rose-escuro"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2.2.28 2.9.55.7.28 1.3.65 1.9 1.25.6.6.97 1.2 1.25 1.9.27.7.49 1.7.55 2.9.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.28 2.2-.55 2.9-.28.7-.65 1.3-1.25 1.9-.6.6-1.2.97-1.9 1.25-.7.27-1.7.49-2.9.55-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2.2-.28-2.9-.55-.7-.28-1.3-.65-1.9-1.25-.6-.6-.97-1.2-1.25-1.9-.27-.7-.49-1.7-.55-2.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.28-2.2.55-2.9.28-.7.65-1.3 1.25-1.9.6-.6 1.2-.97 1.9-1.25.7-.27 1.7-.49 2.9-.55C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-1 .05-1.6.21-2 .36-.5.2-.86.43-1.24.81-.38.38-.6.74-.81 1.24-.15.4-.3 1-.36 2C2.76 9.48 2.76 9.85 2.76 13s0 3.52.07 4.76c.05 1 .21 1.6.36 2 .2.5.43.86.81 1.24.38.38.74.6 1.24.81.4.15 1 .3 2 .36 1.24.06 1.6.07 4.76.07s3.52 0 4.76-.07c1-.05 1.6-.21 2-.36.5-.2.86-.43 1.24-.81.38-.38.6-.74.81-1.24.15-.4.3-1 .36-2 .06-1.24.07-1.6.07-4.76s0-3.52-.07-4.76c-.05-1-.21-1.6-.36-2-.2-.5-.43-.86-.81-1.24a3.4 3.4 0 0 0-1.24-.81c-.4-.15-1-.3-2-.36C15.52 4 15.15 4 12 4z" />
                <path d="M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM18.4 6.4a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z" />
              </svg>
              @espaconeia
            </a>
          )}
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé — navegação">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider2 text-aqua">Navegação</h3>
          <ul className="space-y-2 text-sm text-grafite-suave">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-rose">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tratamentos */}
        <nav aria-label="Rodapé — tratamentos">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider2 text-aqua">Tratamentos</h3>
          <ul className="space-y-2 text-sm text-grafite-suave">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/servicos/${c.slug}`} className="hover:text-rose">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contato */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider2 text-aqua">Contato</h3>
          <address className="space-y-2 text-sm not-italic leading-relaxed text-grafite-suave">
            <p>{site.address.street}</p>
            <p>
              {site.address.district}
              <br />
              {site.address.city} — {site.address.state}, {site.address.zip}
            </p>
            <p>
              <a href={`tel:+${site.whatsappNumber}`} className="hover:text-rose">
                {site.phoneDisplay}
              </a>
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block pt-1 text-rose hover:text-rose-escuro"
            >
              Falar no WhatsApp →
            </a>
          </address>
          <div className="mt-5 border-t border-nude-escuro/40 pt-4 text-xs text-grafite-suave">
            {site.hours.map((h) => (
              <div key={h.label} className="flex justify-between gap-4">
                <span>{h.label}</span>
                <span>{h.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-nude-escuro/40">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-grafite-suave md:flex-row">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            <Link href="/politica-de-privacidade" className="hover:text-rose">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="hover:text-rose">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
