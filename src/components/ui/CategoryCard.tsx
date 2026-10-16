import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/data/categories";

/** Card de categoria de tratamento (Home e página de serviços). */
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/servicos/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-nude-escuro/40 bg-marfim shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-suave"
    >
      <div className="relative flex h-40 items-end overflow-hidden p-6">
        {category.heroImage ? (
          <>
            <Image
              src={category.heroImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-petrol/85 via-petrol/10 to-transparent"
            />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-nude via-creme to-marfim" />
        )}
        <div
          className="absolute right-5 top-5 h-10 w-10 rounded-full border border-marfim/60 transition-transform duration-500 group-hover:rotate-45"
          aria-hidden
        />
        <span
          className={`relative text-xs font-semibold uppercase tracking-wider2 ${category.heroImage ? "text-marfim" : "text-aqua"}`}
        >
          {category.eyebrow}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-grafite">{category.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-grafite-suave">{category.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-rose transition-all group-hover:gap-2">
          Conhecer tratamentos <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
