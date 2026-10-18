import type { Campaign } from "@/data/campaigns";
import { whatsappLink } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatDateBR } from "@/lib/campaigns";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Card de campanha/promoção reutilizável.
 * Todos os elementos pedidos: selo, preço de referência, preço atual,
 * nº de sessões, CTA imediato, observação legal e validade.
 */
export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const message = `Olá! Tenho interesse na campanha "${campaign.title}" que vi no site. Pode me passar mais informações?`;
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl border bg-marfim p-8 shadow-card transition-all duration-300 hover:shadow-suave",
        campaign.highlight ? "border-aqua/60 ring-1 ring-aqua/30" : "border-nude-escuro/40",
      )}
    >
      {/* Selo promocional */}
      <span className="inline-flex w-fit items-center rounded-full bg-rose/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-framboesa">
        {campaign.badge}
      </span>

      <h3 className="mt-4 font-display text-2xl leading-snug text-grafite">{campaign.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-grafite-suave">{campaign.description}</p>

      {campaign.sessions && <p className="mt-4 text-sm font-medium text-grafite">{campaign.sessions}</p>}

      {/* Preços */}
      <div className="mt-4 flex items-end gap-3">
        {campaign.referencePrice && (
          <span className="text-sm text-grafite-suave line-through">{campaign.referencePrice}</span>
        )}
        {campaign.currentPrice && (
          <span className="font-display text-2xl text-framboesa">{campaign.currentPrice}</span>
        )}
      </div>
      {campaign.installment && <p className="mt-1 text-xs text-grafite-suave">{campaign.installment}</p>}

      <div className="mt-6">
        <Button href={whatsappLink(message)} external className="w-full">
          Quero esta condição
        </Button>
      </div>

      {/* Validade + observação legal */}
      <div className="mt-5 space-y-1 border-t border-nude-escuro/40 pt-4 text-xs text-grafite-suave">
        {campaign.validUntil && <p>Válido até {formatDateBR(campaign.validUntil)}</p>}
        {campaign.availabilityNote && <p>{campaign.availabilityNote}</p>}
        {campaign.legalNote && <p className="italic">{campaign.legalNote}</p>}
      </div>
      {campaign.draftNote && (
        <Placeholder label="Rascunho" className="mt-5 p-4 text-xs">
          {campaign.draftNote}
        </Placeholder>
      )}
    </article>
  );
}
