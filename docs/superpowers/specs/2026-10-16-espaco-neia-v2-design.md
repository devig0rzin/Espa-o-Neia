# Espaço Néia v2 — Especificação técnica

- **Data:** 2026-10-16
- **Status:** aguardando aprovação
- **Plano de execução:** [`docs/superpowers/plans/2026-10-16-espaco-neia-v2.md`](../plans/2026-10-16-espaco-neia-v2.md)
- **Origem:** briefing "Missão v2" + diagnóstico da Fase 0 (sessão de 16/10/2026)

## 1. Objetivo

Levar o site de protótipo para produção real, nesta ordem:

- **P0:** nada de dado fictício ou vencido no ar, dependências seguras, SEO apontando para uma URL que existe, acessibilidade e contraste em WCAG AA, menu mobile correto, CI.
- **P1:** acabamento visual e de mídia (OG, favicon, logo, vídeos) e animações de scroll em GSAP como assinatura do site.
- **P2:** conversão e medição, encurtamento da Home e repositório com cara de portfólio.

**Tom:** premium, acolhedor, feminino, calmo. As animações devem parecer seda, não fogos de artifício.

## 2. Decisões já tomadas

| # | Decisão | Fonte |
|---|---|---|
| D1 | O domínio de produção é **temporariamente `.vercel.app`**. Hoje a URL de produção confirmada é `https://espa-o-neia.vercel.app`. Nenhum domínio próprio será registrado ou configurado agora. | usuário |
| D2 | A URL do site sai de **um único helper**, `getSiteUrl()`, com esta precedência: `NEXT_PUBLIC_SITE_URL`, depois `https://${VERCEL_PROJECT_PRODUCTION_URL}`, depois `http://localhost:3000`. **Não é preciso criar env var na Vercel agora:** a Vercel injeta `VERCEL_PROJECT_PRODUCTION_URL` com o domínio de produção, que acompanha o rename do projeto automaticamente. `NEXT_PUBLIC_SITE_URL` só será definida quando houver domínio próprio (com aprovação). | usuário + análise |
| D3 | Sistema de rascunho: o campo `status: "draft" \| "approved"` substitui `pending`. `showDrafts()` retorna verdadeiro em dev e em preview, e falso em produção. Seção que fica vazia some inteira. | briefing |
| D4 | **Ficam como `draft`**, por serem fictícios ou sem autorização confirmada: os 3 depoimentos, os 3 membros da equipe, **as 3 campanhas** (o cabeçalho de `campaigns.ts` declara fictícios os valores, sessões e datas de todas), as 3 fotos da galeria antes/depois, a resposta de pagamento do FAQ, o Instagram e o e-mail. | código + regra "não inventar" |
| D5 | O CTA global "Agende sua avaliação gratuita" (`site.ctaPrimary`) **permanece**: é texto de posicionamento da cliente, sem marca de fictício. Entra na issue de confirmação com a cliente. | premissa (pode ser vetada na aprovação) |
| D6 | O GitHub é operado pelo `gh` CLI, porque o MCP do GitHub não está disponível. Para a Vercel uso as permissões disponíveis; a validação de preview é feita no navegador, na URL que o GitHub recebe da integração da Vercel. | usuário |
| D7 | O repositório local fica em `C:\dev\espaco-neia`, para evitar o limite de caminho do Turbopack no Windows. | usuário |
| D8 | **Uma só lib de animação: GSAP** (ScrollTrigger, SplitText, `@gsap/react`), mais **Lenis**. Micro-interações ficam em CSS puro. Não usar shadcn; Sheet e Accordion são implementados à mão, sem dependência. | briefing |
| D9 | **Exigem aprovação explícita, a cada vez:** renomear o repositório ou o projeto na Vercel, mexer em domínio ou env de produção, fazer merge na `main`, promover para produção, apagar branches ou mídia. | briefing |

## 3. Arquitetura

### 3.1 Novos módulos de lógica (`src/lib/`, todos com testes em Vitest)

| Módulo | Responsabilidade |
|---|---|
| `site-url.ts` | `getSiteUrl(env?)` resolve e normaliza a URL (sem barra final). `absoluteUrl(path)`. |
| `drafts.ts` | `showDrafts(env?)` e `visible(items, env?)`, que filtra por `status`. |
| `campaigns.ts` | `isCampaignLive(c, now)`, `liveCampaigns(list, now, env?)`, `formatDateBR(iso)`. O dia de validade conta inteiro no fuso America/Sao_Paulo. |
| `whatsapp.ts` | `buildWhatsappUrl(message)` codifica uma única vez. `contactMessage(fields)` monta texto puro com `\n`. `whatsappLink` em `site.ts` passa a delegar para cá. |
| `contact-validation.ts` | `validateContact(input)` devolve `{ ok, errors }`, com mensagens em pt-BR. |
| `contrast.ts` | `contrastRatio(hexA, hexB)`. Os testes verificam todos os pares texto/fundo dos tokens. |
| `motion.ts` (P1) | Tokens de movimento: easings, durações, distâncias, stagger. |

### 3.2 Dados (`src/data/*`, mantendo o padrão "edite aqui")

- Tipos ganham `status: ContentStatus`. `campaigns.validUntil` passa a ser ISO `"YYYY-MM-DD"` (opcional). Textos que não são data, como "Agenda sujeita à disponibilidade", vão para `availabilityNote`.
- `site.social.instagram` e `site.email` viram `{ value, status }`. O "@espaconeia" do rodapé passa a ser derivado do dado, não fica mais fixo no código.
- `faq.ts`: cada item ganha `status`. O FAQPage em JSON-LD só inclui itens visíveis.

### 3.3 Renderização

- Server Components por padrão. Componentes client são ilhas pequenas: `MobileMenu`, `VideoPlayer`, `ContactForm`, `FaqAccordion`, `Reveal` e os componentes `motion/*` (P1).
- **Sem JS, o conteúdo aparece:** um script inline no `<head>` adiciona a classe `js` ao `<html>` antes da pintura. O estado escondido do Reveal só existe sob `.js`. **H1 e a imagem do hero (LCP) nunca ficam escondidos.**
- **ISR:** `export const revalidate = 86400` em `/` e `/campanhas`, para que campanhas vencidas saiam do ar sem deploy.

### 3.4 SEO

- `metadataBase`, canonical, OG, `sitemap.ts`, `robots.ts` e JSON-LD usam `getSiteUrl()`.
- `robots.ts`: **`Disallow: /` quando `VERCEL_ENV !== "production"`**, para que previews não sejam indexados.
- OG via `opengraph-image.tsx` (`next/og`) na raiz e em `/servicos/[categoria]` (P1). A referência a `/images/og.jpg` sai em P0.
- Favicon e apple-icon em `src/app/icon.png` e `src/app/apple-icon.png`, gerados da logo (P1).
- JSON-LD:
  - `BeautySalon` com `telephone` em formato internacional (+55…), `image` apontando para o OG e `sameAs` só com redes aprovadas.
  - `FaqJsonLd` **só no /faq** e nas categorias. A Home deixa de emitir esse schema, porque hoje ele aparece duplicado.
  - `BreadcrumbList` nas páginas internas (P2).

### 3.5 Tokens de cor (WCAG AA)

| Token | Valor | Uso | Meta |
|---|---|---|---|
| `rose-profundo` (novo) | `#A84D6F` | Texto e CTA primário, com texto marfim | ≥ 4,5:1 sobre marfim e creme (medido: 5,09 e 4,64) |
| `rose-profundo-hover` (novo) | a definir pelo teste | Hover do CTA | ≥ 4,5:1 com marfim |
| `aqua-texto` (novo) | a definir pelo teste, no matiz do aqua | Sobretítulos sobre fundo claro | ≥ 4,5:1 sobre marfim e creme |
| `rose`, `aqua`, `aqua-claro` | inalterados | Só fundos, bordas e detalhes | — |

Botão `aqua`: o texto vira grafite (hoje é petróleo, que dá 4,01). `contrast.test.ts` lista todos os pares usados e falha abaixo de 4,5 (3,0 para texto ≥ 24px ou ≥ 18,66px em negrito).

### 3.6 Acessibilidade e comportamento

- **Menu mobile:**
  - Esc fecha e devolve o foco ao botão.
  - Foco preso enquanto aberto.
  - Rolagem do `<html>` travada.
  - Fecha ao trocar de rota.
  - Transição CSS de 300 ms em P0; animação em GSAP em P1.
  - Desligado com `prefers-reduced-motion`.
- **FAQ:** cada painel ganha `id` e `role="region"`, e o botão ganha `aria-controls`. O painel fechado recebe `inert`. A animação `grid-rows 0fr → 1fr` se mantém.
- **Formulário:**
  - Validação própria: erros com `aria-invalid` e `aria-describedby`.
  - Foco vai para o primeiro campo inválido; resumo em `role="alert"`.
  - O consentimento é validado como os outros campos. O botão deixa de ficar `disabled`, porque botão desabilitado esconde o motivo.
- **Vídeos:**
  - `preload="metadata"`.
  - Sem controles nativos; botão próprio de pausar/tocar, com `aria-pressed` e rótulo (WCAG 2.2.2).
  - Sem autoplay com reduced motion.
  - O vídeo do Ambiente só toca dentro da viewport (IntersectionObserver) e pausa ao sair.
  - Poster com frame do próprio vídeo (P1).
- **Links:**
  - `tel:` nunca abre em `_blank`.
  - O pulso do botão flutuante do WhatsApp roda só 3 ciclos.

### 3.7 Animações (P1): linguagem e guardrails

- **Tokens (`motion.ts`):**
  - Ease `power3.out` / `expo.out`.
  - Entradas de 0,8 a 1,2 s; interações de 0,3 s.
  - Deslocamento de 16 a 40 px; stagger de 60 a 100 ms; parallax de até ±10%.
  - Só `transform`, `opacity`, `clip-path` e `filter`.
- **`gsap.matchMedia()` separa três contextos:**
  - **Desktop (≥ 1024px):** pin e scrub permitidos.
  - **Mobile:** fade-rise simples.
  - **Reduced motion:** sem Lenis, pin, scrub ou parallax; fade de no máximo 200 ms.
- **Lenis:** ligado ao ticker do GSAP; desligado com reduced motion e em dispositivos touch.
- **Infra:** `ScrollTrigger.refresh()` depois de imagens e vídeos carregarem. Cleanup via `useGSAP` (sem vazamento entre rotas).
- **Proibido:** cursor customizado, som, scroll travado.
- **Mapa de efeitos:** igual ao do briefing (seção "Mapa por seção da Home"). Campanhas, depoimentos e o slider antes/depois só animam quando houver conteúdo aprovado.
- **View Transitions:** ficam de fora, a menos que estejam estáveis no Next 16.4. A checagem é feita na documentação na hora da tarefa.

### 3.8 Ferramentas e CI

- **Next `16.4.2`** (corrige os avisos críticos ≤ 16.3.7) e React/React-DOM no patch mais recente de 19.2. Depois, `npm audit` sem nada high ou critical.
- **Scripts:**
  - ESLint 9 em flat config (`eslint.config.mjs`, `eslint-config-next`): `lint`.
  - `typecheck`: `tsc --noEmit`.
  - Prettier: `format` e `format:check`.
  - Vitest: `test`.
- **`.github/workflows/ci.yml`:** em todo PR, roda `npm ci`, lint, typecheck, test e build, com o Node definido no `.nvmrc` (22).
- **`next.config.mjs`:**
  - `turbopack.root` fixado no projeto (há um `package-lock.json` solto em `C:\Users\igorf`).
  - Headers de segurança: `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` mínima.
- **Fora de escopo:** CSP com nonce (iframe do Maps e JSON-LD inline tornam o custo alto para o benefício).

## 4. Dependências novas

| Pacote | Tipo | Peso aproximado | Por que o que já existe não resolve |
|---|---|---|---|
| `next@16.4.2`, `react@19.2.x` | atualização | — | Avisos críticos de segurança |
| `eslint@9`, `eslint-config-next@16.4.2` | dev | só dev | `next lint` foi removido no Next 16 |
| `prettier@3` | dev | só dev | Formatação consistente pedida no briefing |
| `vitest@3` | dev | só dev | TDD da lógica; zero config com TS/ESM |
| `gsap@3.15` + `@gsap/react@2.1` | runtime, só nas ilhas client | ~27 KB gz core, ~17 KB ScrollTrigger, ~6 KB SplitText; hook < 1 KB | Pin, scrub e SplitText com máscara não saem bem em CSS ou IntersectionObserver |
| `lenis@1.3` | runtime | ~4 KB gz | Smooth scroll sincronizado com o ScrollTrigger num único rAF |
| `sharp` | dev (scripts) | só dev | Recorte antes/depois, PNG transparente da logo, conversão WebP. O Next usa sharp internamente, mas não o expõe para scripts |
| `ffmpeg-static` | dev (scripts) | ~75 MB em `node_modules`, fora do bundle | Poster, WebM e redução de bitrate; não há ffmpeg instalado |
| `@vercel/analytics`, `@vercel/speed-insights` (P2) | runtime | ~1–2 KB cada, sem cookies | Medição pedida respeitando a LGPD |

## 5. Critérios de aceite globais (todo PR)

1. `npm run lint`, `typecheck`, `test` e `build` passam localmente e no CI.
2. Nenhum warning novo no console do navegador no preview.
3. Preview da Vercel conferido no navegador, em desktop e mobile, com prints anexados ao PR.
4. Sem JS, as páginas mostram todo o conteúdo (verificado com JS desligado).
5. Com `prefers-reduced-motion: reduce`, nada se move além de fades de até 200 ms.
6. Nenhum texto "fictício", "placeholder", "a validar" ou nome de arquivo `src/data` visível com `VERCEL_ENV=production` (verificado por teste de render e por busca no HTML do build).

**Metas de fechamento (P2), Lighthouse mobile em build de produção com animações ligadas:**
- Performance ≥ 90, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO = 100.
- LCP < 2,5 s, CLS < 0,1, INP < 200 ms.

## 6. Pendências da cliente (viram issues com a label `aguardando-cliente`)

1. Depoimentos reais com autorização, ou link para as avaliações no Google.
2. Equipe real: nomes, funções, registros profissionais e fotos.
3. Preços, sessões, validade e condições reais das campanhas, e confirmação da "avaliação gratuita".
4. E-mail e @ do Instagram oficiais.
5. Formas de pagamento e parcelamento reais.
6. Fotos reais do espaço.
7. Antes/depois: validação da responsável técnica junto ao conselho profissional e termo de uso de imagem de cada paciente.
8. Revisão jurídica da Política de Privacidade e dos Termos de Uso (LGPD).
9. Arquivo original da logo (vetor).
10. Decisão sobre o domínio `espaconeia.com.br` (livre em 16/10/2026).

## 7. Fora de escopo

- Registro ou configuração de domínio.
- Back-end para o formulário (continua abrindo o WhatsApp).
- Migração para shadcn.
- CSP com nonce.
- Carrossel de depoimentos antes de existir depoimento aprovado.
