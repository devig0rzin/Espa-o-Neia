import { Section } from "@/components/ui/Section";

/** Layout padrão para páginas de texto legal (prose elegante e legível). */
export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <Section container="narrow" className="pt-16">
      <p className="text-sm font-medium text-framboesa">Documento legal</p>
      <h1 className="mt-3 font-display text-4xl leading-tight text-grafite">{title}</h1>
      <p className="mt-2 text-sm text-grafite-suave">Última atualização: {updatedAt}</p>
      <div className="rule-gold mt-6" />
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-grafite-suave [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-grafite [&_a]:text-framboesa [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_strong]:text-grafite">
        {children}
      </div>
    </Section>
  );
}
