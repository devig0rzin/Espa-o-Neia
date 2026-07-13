import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "aqua" | "petrol" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-rose text-marfim shadow-suave hover:bg-rose-escuro hover:-translate-y-0.5",
  secondary:
    "border border-grafite/20 bg-transparent text-grafite hover:border-rose hover:text-rose",
  ghost: "text-grafite hover:text-rose",
  aqua: "bg-aqua text-petrol shadow-suave hover:bg-aqua-claro hover:-translate-y-0.5",
  petrol: "bg-petrol text-marfim shadow-suave hover:bg-petrol-suave hover:-translate-y-0.5",
  "outline-light":
    "border border-marfim/40 bg-marfim/5 text-marfim backdrop-blur hover:border-marfim hover:bg-marfim/15",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
};

/** Botão/link estilizado da marca. Usa <a> para links externos (WhatsApp). */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
