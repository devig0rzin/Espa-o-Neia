/** Faixa de texto em rolagem contínua (CSS puro; pausa com prefers-reduced-motion). */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic text-petrol md:text-3xl">
          {t}
          <span className="h-1.5 w-1.5 rounded-full bg-rose" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-nude-escuro/50 bg-creme py-5" role="presentation">
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
      <p className="sr-only">{items.join(", ")}</p>
    </div>
  );
}
