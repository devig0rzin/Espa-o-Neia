import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { galleryReal } from "@/data/gallery";
import { visible } from "@/lib/drafts";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Galeria com as 3 fotos reais de procedimentos do Espaço Néia.
 * As fotos-fonte são montagens "antes e depois" empilhadas. Mostramos a
 * imagem completa (sem zoom agressivo, que deixava a foto com aparência
 * de close-up exagerado) com o aspecto próximo ao original, e sinalizamos
 * claramente as metades "Antes" e "Depois". Ver aviso regulatório em
 * src/data/gallery.ts.
 */
export function RealResultsGallery() {
  const items = visible(galleryReal);
  if (items.length === 0) return null;

  return (
    <Section className="bg-creme">
      <SectionHeading
        eyebrow="Resultados reais"
        title="Registros reais de procedimentos do Espaço Néia"
        description="Alguns registros reais da nossa rotina de atendimento. Cada resultado é individual e depende da avaliação e do protocolo indicado para você."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.src} delay={i * 90}>
            <Link
              href={`/servicos/${item.categorySlug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-nude-escuro/40 bg-marfim shadow-card"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Rótulos Antes / Depois sobre as duas metades da foto-fonte */}
              <span className="absolute left-4 top-4 rounded-full bg-marfim/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-grafite-suave">
                Antes
              </span>
              <span className="absolute left-4 top-[52%] rounded-full bg-marfim/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-petrol">
                Depois
              </span>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-petrol/85 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex items-center rounded-full bg-rose/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-marfim">
                  Foto real
                </span>
                <p className="mt-2 font-display text-lg text-marfim">{item.caption}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-grafite-suave">
        Resultados variam de pessoa para pessoa e dependem de avaliação individual — nenhuma imagem aqui
        representa promessa ou garantia de resultado.
      </p>
      <Placeholder label="Antes e depois" className="mx-auto mt-6 max-w-2xl text-center">
        Galeria visível só no preview. Antes de aprovar em <code>src/data/gallery.ts</code>, a responsável
        técnica precisa confirmar o formato com o conselho profissional e o termo de uso de imagem de cada
        paciente.
      </Placeholder>
    </Section>
  );
}
