# Espaço Néia — Site institucional

Site premium para a **Espaço Néia Beleza e Estética** (Cotia / Granja Viana), construído com **Next.js (App Router) + TypeScript + Tailwind CSS**.

---

## 🚀 Como rodar localmente

Pré-requisito: **Node.js 18.18+** instalado.

```bash
npm install
npm run dev
```

Abra **http://localhost:3000**.

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

---

## ☁️ Como publicar na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com), clique em **New Project** e importe o repositório.
3. A Vercel detecta o Next.js automaticamente — clique em **Deploy**.
4. Depois de publicar, atualize o campo `url` em `src/data/site.ts` com o domínio final.

---

## ✏️ Onde editar cada coisa (guia rápido)

Quase tudo é editável em **arquivos de dados** na pasta `src/data/`, sem mexer no código visual.

| O que você quer mudar                     | Arquivo                    | O que fazer                                                                       |
| ----------------------------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| **Telefone / WhatsApp**                   | `src/data/site.ts`         | Altere `phoneDisplay` e `whatsappNumber`. Muda no site inteiro.                   |
| **Endereço / horários**                   | `src/data/site.ts`         | Edite os campos `address` e `hours`.                                              |
| **Redes sociais / e-mail**                | `src/data/site.ts`         | Campos `social` e `email`.                                                        |
| **Textos e procedimentos das categorias** | `src/data/categories.ts`   | Cada bloco vira uma página `/servicos/...`.                                       |
| **Promoções / campanhas**                 | `src/data/campaigns.ts`    | Copie um bloco, ajuste e deixe `active: true`. Para tirar do ar, `active: false`. |
| **Perguntas do FAQ**                      | `src/data/faq.ts`          | Adicione/edite perguntas e respostas.                                             |
| **Depoimentos**                           | `src/data/testimonials.ts` | Substitua os placeholders pelo texto real e marque `pending: false`.              |
| **Menu do site**                          | `src/data/navigation.ts`   | Ordene/adicione itens do menu.                                                    |
| **Cores e fontes da marca**               | `tailwind.config.ts`       | Toda a paleta e tipografia ficam aqui.                                            |

### Trocar o telefone (exemplo)

Em `src/data/site.ts`:

```ts
phoneDisplay: "(11) 99604-5920",   // como aparece na tela
whatsappNumber: "5511996045920",   // só números, com 55 na frente (para os links do WhatsApp)
```

### Trocar textos das páginas

Textos "de vitrine" (Home, Sobre, etc.) ficam nos próprios arquivos em `src/app/*/page.tsx`, em português, fáceis de localizar e alterar.

### Trocar imagens (placeholders → fotos reais)

Veja `public/images/README.txt`. Em resumo: coloque a foto em `public/images/` e substitua o componente `<ImagePlaceholder />` por um `<Image />` do Next.

### Trocar vídeos

Em `src/data/media.ts`, preencha `src` com o caminho do arquivo (coloque o `.mp4` em `public/videos/`).
Sem vídeo definido, o site mostra automaticamente uma capa elegante com aviso "vídeo em produção" —
nenhuma outra alteração é necessária.

---

## 🎨 Identidade visual (paleta da logo real)

A paleta foi extraída da logo oficial (`public/images/logo/logo-espaco-neia.jpg`): círculo
água-marinha, traço em azul petróleo e assinatura em rosé. Tokens em `tailwind.config.ts`:

| Token                                 | Uso                                                   |
| ------------------------------------- | ----------------------------------------------------- |
| `aqua` / `aqua-claro` / `aqua-escuro` | cor de assinatura (selos, ícones, detalhes)           |
| `rose` / `rose-escuro`                | acento principal / CTAs                               |
| `petrol` / `petrol-suave`             | contraste escuro (textos de destaque, botões escuros) |
| `marfim` / `creme` / `nude`           | base neutra clara                                     |
| `grafite` / `grafite-suave`           | texto de leitura                                      |

## 🖼️ Banco de imagens

| Pasta                         | Conteúdo                                                       |
| ----------------------------- | -------------------------------------------------------------- |
| `public/images/logo/`         | Logo real da marca                                             |
| `public/images/real/`         | 3 fotos reais de procedimentos (ver aviso regulatório abaixo)  |
| `public/images/ilustrativas/` | Imagens ilustrativas geradas por IA, no estilo visual da marca |
| `public/videos/`              | Vídeos institucionais reais                                    |

Precisa de mais imagens ilustrativas na mesma linha visual? Use os prompts prontos em
[`PROMPTS-IMAGENS-IA.md`](./PROMPTS-IMAGENS-IA.md).

⚠️ **As 3 fotos reais de procedimentos são registros "antes e depois".** Publicidade desse formato
para procedimentos injetáveis (botox, preenchimento) tem restrições do CFM/ANVISA no Brasil. Antes
da publicação final, confirme com a responsável técnica o consentimento de uso de imagem e se o
formato está adequado — detalhes em `src/data/gallery.ts`.

---

## 🔎 SEO local

- Metadados, Open Graph e `sitemap.xml`/`robots.txt` já configurados.
- Schema **LocalBusiness / BeautySalon** e **FAQPage** em JSON-LD.
- Menções naturais a **Cotia**, **Granja Viana** e região nos textos.
- Ao publicar: cadastre o negócio no **Google Meu Negócio** e envie o `sitemap.xml` no Google Search Console.

---

## ⚠️ Itens marcados para validação (não inventados)

O site sinaliza visualmente (blocos "A validar", em contorno tracejado água-marinha) tudo que **não deve ser inventado** e precisa da confirmação da cliente:

- Depoimentos reais (com consentimento)
- Equipe e responsável técnica (nomes, funções, registros)
- Preços e condições das campanhas
- Certificados, formações e títulos
- E-mail, perfis de redes sociais e URL final
- Textos legais (revisão jurídica / adequação LGPD)

> **Importante:** não publicar certificados, formações, resultados clínicos, antes-e-depois ou depoimentos sem verificação e autorização.

---

## 🧱 Estrutura do projeto

```
src/
├─ app/                 # páginas (App Router)
│  ├─ page.tsx          # Home
│  ├─ sobre/
│  ├─ servicos/         # página-mãe + /[categoria] (páginas internas)
│  ├─ campanhas/
│  ├─ contato/
│  ├─ faq/
│  ├─ politica-de-privacidade/
│  └─ termos-de-uso/
├─ components/          # componentes reutilizáveis (layout, ui, forms, seo)
├─ data/                # 👈 CONTEÚDO EDITÁVEL fica aqui
└─ lib/                 # utilitários (máscara de telefone, cn)
```
