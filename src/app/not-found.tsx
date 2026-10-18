import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section container="narrow" className="text-center">
      <p className="font-display text-6xl text-framboesa">404</p>
      <h1 className="mt-4 font-display text-3xl text-grafite">Página não encontrada</h1>
      <p className="mx-auto mt-4 max-w-md text-grafite-suave">
        O endereço que você procurou não existe ou foi movido. Vamos te levar de volta ao cuidado.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Voltar ao início</Button>
        <Button href="/servicos" variant="secondary">
          Ver tratamentos
        </Button>
      </div>
    </Section>
  );
}
