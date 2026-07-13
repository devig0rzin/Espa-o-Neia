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
  const inner =
    container === "wide" ? "container-wide" : container === "narrow" ? "container-narrow" : "";
  return (
    <Tag id={id} className={cn("py-20 md:py-28", className)}>
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

/** Cabeçalho de seção padronizado: sobretítulo aqua + título serifado + descrição. */
export function SectionHeading({ eyebrow, title, description, align = "center", className }: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider2 text-aqua">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight text-grafite md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-grafite-suave">{description}</p>
      )}
      <div className={cn("rule-gold mt-6", align === "center" && "mx-auto")} />
    </div>
  );
}
