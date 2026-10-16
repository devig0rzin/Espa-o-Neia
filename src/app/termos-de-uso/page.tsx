import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do site do Espaço Néia Beleza e Estética.",
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosPage() {
  return (
    <LegalLayout title="Termos de Uso" updatedAt="12 de julho de 2026">
      <Placeholder label="Revisão jurídica">
        Modelo inicial de Termos de Uso. Recomenda-se revisão por profissional responsável antes da
        publicação.
      </Placeholder>

      <p>
        Ao acessar e utilizar o site do {site.legalName}, você concorda com os termos abaixo. Caso não
        concorde, pedimos que não utilize o site.
      </p>

      <h2>1. Uso do site</h2>
      <p>
        O conteúdo deste site tem caráter informativo sobre os serviços do Espaço Néia. As informações não
        substituem uma avaliação individual e profissional, que é sempre necessária antes de qualquer
        procedimento.
      </p>

      <h2>2. Ausência de promessa de resultado</h2>
      <p>
        Resultados de procedimentos estéticos variam conforme cada pessoa, seu histórico e a adesão ao
        protocolo. Nenhuma informação neste site deve ser interpretada como garantia de resultado específico.
      </p>

      <h2>3. Agendamentos e condições</h2>
      <p>
        Valores, pacotes e campanhas divulgados são informativos e podem sofrer alterações. As condições
        vigentes são confirmadas no momento do atendimento, mediante avaliação.
      </p>

      <h2>4. Propriedade intelectual</h2>
      <p>
        Textos, marca e elementos visuais deste site pertencem ao {site.legalName} e não podem ser
        reproduzidos sem autorização.
      </p>

      <h2>5. Contato</h2>
      <p>
        Dúvidas sobre estes Termos? Fale conosco: {site.phoneDisplay} · {site.email}.
      </p>
    </LegalLayout>
  );
}
