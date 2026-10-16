import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";
import { Placeholder } from "@/components/ui/Placeholder";
import { site } from "@/data/site";
import { publicEmail } from "@/lib/public-contact";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do Espaço Néia Beleza e Estética.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

export default function PoliticaPage() {
  const email = publicEmail();
  return (
    <LegalLayout title="Política de Privacidade" updatedAt="12 de julho de 2026">
      <Placeholder label="Adequação LGPD">
        Este documento é um <strong>modelo inicial</strong> e não substitui orientação jurídica. Antes de
        publicar, recomenda-se a revisão por profissional responsável para adequação plena à{" "}
        <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong> e ao negócio real.
      </Placeholder>

      <p>
        A sua privacidade é importante para o {site.legalName}. Esta Política explica como coletamos, usamos e
        protegemos os dados pessoais fornecidos por você ao utilizar este site.
      </p>

      <h2>1. Dados que coletamos</h2>
      <p>
        Coletamos apenas os dados que você nos fornece voluntariamente, por exemplo ao preencher o formulário
        de contato ou nos chamar pelo WhatsApp: nome, telefone, e a mensagem/assunto de interesse.
      </p>

      <h2>2. Como usamos os seus dados</h2>
      <ul>
        <li>Responder à sua solicitação de contato ou agendamento;</li>
        <li>Prestar atendimento e informações sobre nossos serviços;</li>
        <li>Aprimorar a sua experiência e a comunicação conosco.</li>
      </ul>
      <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>

      <h2>3. Base legal e consentimento</h2>
      <p>
        O tratamento dos seus dados ocorre mediante o seu consentimento, manifestado ao enviar o formulário,
        e/ou para atender à sua solicitação. Você pode retirar o consentimento a qualquer momento.
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Conforme a LGPD, você pode solicitar acesso, correção, exclusão ou informações sobre o uso dos seus
        dados. Para exercer seus direitos, entre em contato pelo telefone {site.phoneDisplay}
        {email && <> ou pelo e-mail {email}</>}.
      </p>

      <h2>5. Segurança e retenção</h2>
      <p>
        Adotamos medidas razoáveis para proteger seus dados. Eles são mantidos apenas pelo tempo necessário ao
        atendimento da finalidade para a qual foram coletados.
      </p>

      <h2>6. Contato</h2>
      <p>
        Dúvidas sobre esta Política? Fale conosco: {site.phoneDisplay}
        {email && <> · {email}</>}.
      </p>
    </LegalLayout>
  );
}
