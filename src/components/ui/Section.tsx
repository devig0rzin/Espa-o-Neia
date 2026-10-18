import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: "wide" | "narrow" | "none";
  as?: "section" | "div" | "header" | "footer";
};

/** Wrapper de seção com espaçamento vertical e container padronizados. */
export function Section({ children, className, id, container = "wide", as: Tag = "section" }: SectionProps) {
  const inner = container === "wide" ? "container-wide" : container === "narrow" ? "container-narrow" : "";
  return (
    <Tag id={id} className={cn("py-16 md:py-24", className)}>
      {container === "none" ? children : <div className={inner}>{children}</div>}
    </Tag>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Cabeçalho de seção padronizado: sobretítulo framboesa + título leve + descrição. */
export function SectionHeading({ eyebrow, title, description, align = "center", className }: HeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && <p className="mb-2 text-sm font-medium text-framboesa">{eyebrow}</p>}
      <h2 className="text-balance font-display text-3xl font-normal leading-tight text-grafite md:text-[2.5rem]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-grafite-suave">{description}</p>}
    </div>
  );
}
