import { cn } from "@/lib/utils";
import { showDrafts } from "@/lib/drafts";

/**
 * Marcação VISUAL de conteúdo pendente de validação pela cliente.
 * Usado para dados que não devem ser inventados (fotos, equipe,
 * certificados, depoimentos, preços). Fica evidente na tela para
 * facilitar a revisão antes da publicação — remova ao inserir o real.
 * Só aparece onde rascunhos aparecem (dev e preview); em produção não renderiza nada.
 */
export function Placeholder({
  children,
  label = "A validar",
  className,
}: {
  children?: React.ReactNode;
  label?: string;
  className?: string;
}) {
  if (!showDrafts()) return null;
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-dashed border-aqua/60 bg-aqua/5 p-6 text-sm text-grafite-suave",
        className,
      )}
    >
      <span className="absolute -top-2.5 left-4 rounded-full bg-aqua px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-grafite">
        {label}
      </span>
      {children}
    </div>
  );
}

/** Bloco de imagem placeholder (proporção configurável) para fotos reais futuras. */
export function ImagePlaceholder({
  label = "Foto real a inserir",
  className,
  ratio = "aspect-[4/5]",
}: {
  label?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-3xl border border-nude-escuro/50 bg-gradient-to-br from-nude/60 via-creme to-marfim text-center",
        ratio,
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div className="px-6">
        <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-aqua/50" />
        <p className="text-xs uppercase tracking-wider text-grafite-suave/70">{label}</p>
      </div>
    </div>
  );
}
