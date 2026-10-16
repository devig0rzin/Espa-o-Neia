# Espaço Néia v2 — Plano de implementação

> **Para quem executa:** execução nativa nesta sessão, tarefa por tarefa, porque as skills `subagent-driven-development` e `executing-plans` não estão instaladas. Os passos usam checkbox (`- [ ]`). Ao final de cada PR roda `requesting-code-review`, mais `security-review` ou `review-animations` quando aplicável, e `verification-before-completion`.

**Objetivo:** levar o site a produção real (P0), dar a assinatura visual (P1) e fechar conversão e portfólio (P2), sem inventar dado da cliente.

**Arquitetura:** a lógica pura fica em `src/lib/*` com testes em Vitest. Os dados continuam em `src/data/*` com `status`. Server Components por padrão e ilhas client pequenas. GSAP fica isolado em `src/components/motion/*`.

**Stack:** Next 16.4.2 (App Router), React 19.2, TypeScript, Tailwind 3.4, Vitest, ESLint 9 em flat config, Prettier, GSAP 3.15 com Lenis 1.3.

**Spec:** [`docs/superpowers/specs/2026-10-16-espaco-neia-v2-design.md`](../specs/2026-10-16-espaco-neia-v2-design.md)

## Restrições globais

- Repositório em `C:\dev\espaco-neia`; Node 22.
- A URL do site vem só de `getSiteUrl()`. Nenhum domínio fixo no código.
- `showDrafts()` é falso só quando `VERCEL_ENV === "production"`, ou quando `NODE_ENV === "production"` sem `VERCEL_ENV` (como no `next start` local).
- Nunca inventar preço, nome, depoimento, autorização, contato ou política. Na falta de dado: `status: "draft"`.
- Commits pequenos em Conventional Commits, em português. **Um PR por bloco** (A até F, abaixo), aberto via `gh pr create`.
- **Exigem parada para aprovação explícita:**
  - merge na `main`;
  - promover para produção;
  - renomear repo ou projeto na Vercel;
  - env de produção ou domínio;
  - apagar mídia ou branch.
- Animação: só `transform`, `opacity`, `clip-path` e `filter`. Tokens em `src/lib/motion.ts`. Reduced motion desliga Lenis, pin, scrub e parallax.

## Foco de revisão (falhas prováveis que os testes de cada tarefa fixam)

1. **Campanha que vence no próprio dia:** `validUntil: "2026-08-31"` continua visível às 23h59 de 31/08 no horário de Brasília e some em 01/09. Teste na Tarefa A3.
2. **Mensagem do WhatsApp com `& # % ? +`, emoji e quebra de linha** chega intacta. Teste de ida e volta com `decodeURIComponent` na Tarefa A4.
3. **Telefone digitado com máscara parcial** (`(11) 9999`) é rejeitado com mensagem clara; fixo com 10 dígitos é aceito. Teste na Tarefa A4.
4. **Seção cujos itens são todos draft some inteira em produção**, sem título órfão. Teste de render na Tarefa A2.
5. **Página sem JS:** o HTML do servidor não tem `opacity-0` no H1 nem no hero. Teste na Tarefa B3 (busca no HTML do build).

---

## Bloco A — PR "P0 · ferramentas, segurança e base" (branch `fix/p0-base`)

### Tarefa A1: Atualização de segurança e ferramentas

**Arquivos:**
- Modificar: `package.json`, `package-lock.json`, `next.config.mjs`, `.gitignore`
- Criar: `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`, `vitest.config.ts`, `.nvmrc` (`22`), `.github/workflows/ci.yml`

- [ ] Atualizar `next@16.4.2`, `react` e `react-dom` para o patch 19.2 mais recente e os `@types/*` correspondentes. Depois, `npm audit fix`.
- [ ] Adicionar como dev: `eslint@9`, `eslint-config-next@16.4.2`, `prettier@3`, `vitest@3`.
- [ ] Definir os scripts:
  - `"lint": "eslint ."`
  - `"typecheck": "tsc --noEmit"`
  - `"test": "vitest run"`
  - `"format": "prettier --write ."`
  - `"format:check": "prettier --check ."`
- [ ] Em `next.config.mjs`: `turbopack: { root: import.meta.dirname }` e `headers()` com `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` e `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- [ ] No CI, em `pull_request` e em `push` para a main, com `actions/setup-node` lendo o `.nvmrc`: `npm ci`, depois lint, typecheck, test e build.
- [ ] **Verificar:**
  - `npm run lint && npm run typecheck && npm test && npm run build` termina com exit 0.
  - O build roda com Turbopack (padrão), sem `--webpack`.
  - `npm audit --omit=dev` mostra 0 high e 0 critical.
  - `curl -I` no preview mostra os 4 headers.
- [ ] Commits: `chore(deps): atualiza next para 16.4.2 (avisos críticos)`, `chore: eslint flat config, prettier e vitest`, `ci: lint, typecheck, testes e build em PRs`. **Prettier em commit separado** (`style: aplica prettier`), para não poluir o diff.

**Aceite:** CI verde no PR e `npm audit` limpo de high/critical.

### Tarefa A2: Sistema de rascunho

**Arquivos:**
- Criar: `src/lib/drafts.ts`, `src/lib/drafts.test.ts`, `src/data/types.ts`
- Modificar: todos os `src/data/*.ts` com conteúdo, `src/components/ui/Placeholder.tsx` e as páginas que os consomem

**Interfaces (produz):**
```ts
export type ContentStatus = "draft" | "approved";              // src/data/types.ts
export function showDrafts(env?: NodeJS.ProcessEnv): boolean;  // src/lib/drafts.ts
export function visible<T extends { status: ContentStatus }>(items: readonly T[], env?: NodeJS.ProcessEnv): T[];
```

- [ ] **Testes primeiro** (`drafts.test.ts`):
  - `showDrafts({ VERCEL_ENV: "production" })` → `false`
  - `showDrafts({ VERCEL_ENV: "preview" })` → `true`
  - `showDrafts({ NODE_ENV: "development" })` → `true`
  - `showDrafts({ NODE_ENV: "production" })` → `false`
  - `visible([{status:"draft"},{status:"approved"}], {VERCEL_ENV:"production"})` tem tamanho 1
- [ ] Rodar `npm test`: deve FALHAR. Implementar e rodar de novo: deve PASSAR.
- [ ] **Migrar os dados** (`pending` → `status`), conforme a D4 do spec:
  - `testimonials`, `team` e `gallery`: todos `draft`.
  - `campaigns`: os 3 itens `draft`.
  - `faq`: o item "formas de pagamento" `draft`, o resto `approved`.
  - `site.email` e `site.social.instagram` viram `{ value, status: "draft" }`.
- [ ] **Consumidores** (Home, `/sobre`, Footer, `LocalBusinessJsonLd`, `FaqJsonLd`) passam a usar `visible()`. Seção com lista vazia não renderiza.
- [ ] **Avisos internos:**
  - O `<Placeholder>` retorna `null` quando `!showDrafts()`.
  - O aviso de depoimentos, o texto "Nomes fictícios…" do /sobre e a `legalNote` fictícia das campanhas viram `<Placeholder>`.
  - A frase "utilizadas com a devida autorização" sai da galeria.
- [ ] **Teste de render** (`src/app/page.test.tsx`, com `renderToString` de `react-dom/server`): com `VERCEL_ENV=production`, o HTML da Home não contém nenhuma destas strings: "Depoimentos", "Histórias de quem confia", "fictíci", "placeholder", "src/data", "Registros reais".
- [ ] Commits: `feat(data): status draft/approved e showDrafts()`, `fix: oculta conteúdo fictício em produção`.

**Aceite:**
- No preview aparece tudo, com os selos "A validar".
- Com `VERCEL_ENV=production` local (`next build && next start`), nenhuma das seções draft aparece e não fica buraco no layout.

### Tarefa A3: Campanhas com validade real e ISR

**Arquivos:**
- Criar: `src/lib/campaigns.ts`, `src/lib/campaigns.test.ts`
- Modificar: `src/data/campaigns.ts`, `src/components/ui/CampaignCard.tsx`, `src/app/page.tsx`, `src/app/campanhas/page.tsx`

**Interfaces (produz):**
```ts
export function isCampaignLive(c: Campaign, now: Date): boolean;
export function liveCampaigns(list: readonly Campaign[], now?: Date, env?: NodeJS.ProcessEnv): Campaign[];
export function formatDateBR(iso: string): string; // "2026-08-31" → "31/08/2026"
```

- [ ] **Testes primeiro:**
  - Validade `"2026-08-31"` está viva em `2026-08-31T23:59:00-03:00` e morta em `2026-09-01T00:00:00-03:00`.
  - Sem `validUntil` = viva.
  - `active:false` = morta.
  - Em produção, `draft` é filtrada.
  - `formatDateBR("2026-01-05")` → `"05/01/2026"`.
- [ ] Rodar: FALHA. Implementar e rodar de novo: PASSA. Fim do dia calculado em `America/Sao_Paulo` (UTC−3, sem horário de verão desde 2019).
- [ ] **Dados:** `validUntil` em ISO; o texto "Agenda sujeita à disponibilidade" vai para `availabilityNote`. O card mostra `Válido até {formatDateBR}`.
- [ ] **Páginas:**
  - `export const revalidate = 86400` em `/` e `/campanhas`.
  - A Home esconde a seção quando `liveCampaigns()` vem vazio.
  - O `/campanhas` vazio mostra um estado elegante: título "Novas condições em breve", um parágrafo e um CTA de WhatsApp com a mensagem "Olá! Vim pela página de campanhas e gostaria de saber das condições atuais."
- [ ] Commit: `fix(campanhas): expira por data com ISR e estado vazio`.

**Aceite:**
- No build de produção local, `/campanhas` mostra o estado vazio e a Home não tem a seção.
- A validade vale em todos os ambientes. Como as 3 campanhas venceram em 31/08/2026, o preview também mostra o estado vazio.
- Um teste com `now` anterior à data comprova que o card draft aparece no preview.

### Tarefa A4: WhatsApp e formulário de contato

**Arquivos:**
- Criar: `src/lib/whatsapp.ts`, `src/lib/whatsapp.test.ts`, `src/lib/contact-validation.ts`, `src/lib/contact-validation.test.ts`
- Modificar: `src/data/site.ts` (`whatsappLink` delega para cá), `src/components/forms/ContactForm.tsx`

**Interfaces (produz):**
```ts
export function buildWhatsappUrl(message: string, number?: string): string;
export type ContactFields = { nome: string; telefone: string; interesse: string; mensagem: string; consent: boolean };
export function contactMessage(f: ContactFields): string;  // texto puro com "\n"
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export function validateContact(f: ContactFields): { ok: boolean; errors: ContactErrors };
```

- [ ] **Testes primeiro:**
  - `decodeURIComponent(new URL(buildWhatsappUrl("a & b #1 100% ✨\nok")).searchParams.get("text")!)` é igual à entrada.
  - Não existe `%250A` (codificação dupla).
  - `contactMessage` contém `"*Nome:* Ana\n"` e omite a linha "Mensagem" quando ela está vazia.
  - `validateContact`:
    - nome `" a "` → erro "Informe seu nome completo.";
    - telefone `"(11) 9999"` → "Informe um telefone com DDD.";
    - `"(11) 4612-3456"` passa;
    - interesse vazio → "Escolha um assunto.";
    - `consent:false` → "É preciso autorizar o contato para continuar.";
    - mensagem com mais de 1000 caracteres → "Use até 1000 caracteres.".
- [ ] Rodar: FALHA. Implementar e rodar de novo: PASSA.
- [ ] **Formulário:**
  - Manter `noValidate`: a validação passa a ser a de `validateContact()`.
  - No submit: valida; se falhar, marca `aria-invalid` e `aria-describedby="{campo}-erro"`, mostra o erro sob cada campo, um resumo `role="alert"`, e foca o primeiro campo inválido.
  - Se passar: `window.open(buildWhatsappUrl(contactMessage(f)), "_blank", "noopener")`.
  - O botão deixa de ser `disabled`.
- [ ] Commit: `fix(contato): validação acessível e mensagem do WhatsApp codificada uma vez`. Rodar `security-review` no diff.

**Aceite:**
- Enviar vazio mostra 4 erros, anunciados por leitor de tela (`role="alert"`).
- O texto "Teste & #1" chega íntegro no WhatsApp (verificado no preview pela URL gerada).

**Abrir o PR A**, com o checklist da tarefa e os links do spec e do plano. CI verde, preview conferido em desktop e mobile, prints anexados. **Parar para revisão e merge (aprovação).**

---

## Bloco B — PR "P0 · SEO, acessibilidade e contraste" (branch `fix/p0-seo-a11y`, a partir do A)

### Tarefa B1: URL única e SEO correto

**Arquivos:**
- Criar: `src/lib/site-url.ts`, `src/lib/site-url.test.ts`
- Modificar: `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/seo/JsonLd.tsx`, `src/app/page.tsx`, `src/data/site.ts` (remover `url`)

**Interfaces (produz):**
```ts
export function getSiteUrl(env?: NodeJS.ProcessEnv): string; // sem barra final
export function absoluteUrl(path: string, env?: NodeJS.ProcessEnv): string;
```

- [ ] **Testes primeiro:**
  - `NEXT_PUBLIC_SITE_URL` vence.
  - Sem ela, `VERCEL_PROJECT_PRODUCTION_URL="espa-o-neia.vercel.app"` → `"https://espa-o-neia.vercel.app"`.
  - Sem nenhuma → `"http://localhost:3000"`.
  - `"https://x.com/"` é normalizado para `"https://x.com"`.
  - `absoluteUrl("/faq")` → `"…/faq"`.
- [ ] Rodar: FALHA. Implementar e rodar de novo: PASSA.
- [ ] **Metadados:**
  - `metadataBase: new URL(getSiteUrl())`.
  - Remover `images: /images/og.jpg`; o OG vem do arquivo convencional na Tarefa C1.
  - `robots.ts`: `disallow: "/"` quando `VERCEL_ENV !== "production"`.
  - JSON-LD: `telephone: "+55 11 99604-5920"` derivado de `whatsappNumber`; `sameAs` só com redes aprovadas.
  - A Home deixa de renderizar `FaqJsonLd`.
- [ ] **Verificar:**
  - No preview, `/robots.txt` mostra `Disallow: /` e o canonical aponta para `https://espa-o-neia.vercel.app/…`.
  - `grep -r "espaconeia.com.br" src` volta vazio.
- [ ] Commit: `fix(seo): URL do site centralizada em getSiteUrl()`.

### Tarefa B2: Contraste AA

**Arquivos:**
- Criar: `src/lib/contrast.ts`, `src/lib/contrast.test.ts`
- Modificar: `tailwind.config.ts` e as classes nos componentes

**Interfaces (produz):**
```ts
export function contrastRatio(a: string, b: string): number;
```

- [ ] **Testes primeiro:**
  - `contrastRatio("#000000","#FFFFFF")` ≈ 21.
  - Uma tabela `PAIRS`, importando as cores do `tailwind.config.ts`, verifica ≥ 4,5 para cada par de texto pequeno: `rose-profundo`/marfim, marfim/`rose-profundo`, marfim/`rose-profundo-hover`, `aqua-texto`/marfim, `aqua-texto`/creme, `grafite-suave`/creme, grafite/aqua (botão).
- [ ] Rodar: FALHA (tokens inexistentes). Escolher `aqua-texto` e `rose-profundo-hover` como os valores mais claros, no mesmo matiz, que passam no teste; o teste é o critério. Rodar de novo: PASSA.
- [ ] **Trocas:**
  - Botão `primary`: `bg-rose-profundo hover:bg-rose-profundo-hover`.
  - `text-rose` em texto (H1, preços, links, selos) → `text-rose-profundo`.
  - `text-aqua` e `text-aqua-escuro` em sobretítulos sobre fundo claro → `text-aqua-texto`.
  - Botão `aqua` → `text-grafite`.
  - O `rose` claro continua em fundos e bordas.
- [ ] Commit: `fix(a11y): tokens de contraste AA para texto e CTA`. Prints antes e depois no PR.

### Tarefa B3: Reveal sem página em branco, FAQ e links

**Arquivos:**
- Modificar: `src/app/layout.tsx` (script inline), `src/app/globals.css`, `src/components/ui/Reveal.tsx`, `src/components/ui/FaqAccordion.tsx`, `src/components/ui/Button.tsx`, `src/app/contato/page.tsx`, `src/components/layout/WhatsAppFloat.tsx`, e as páginas que envolvem o H1 com `Reveal`

- [ ] **Script inline e CSS:**
  - Script inline no `<head>`: `document.documentElement.classList.add('js')`.
  - CSS: `.js [data-reveal]:not([data-revealed]) { opacity:0; transform:translateY(20px) }`.
  - O `Reveal` só marca `data-revealed` via IntersectionObserver; a classe Tailwind `opacity-0` sai do markup.
  - Reduced motion: sem estado escondido.
- [ ] **Remover `Reveal`** do H1/hero de `/sobre`, `/campanhas`, `/contato`, `/faq` e `/servicos/[categoria]` (esta última tem imagem `priority`).
- [ ] **Teste** (`src/app/no-js.test.ts`): roda depois do `next build` e lê `.next/server/app/*.html`. O elemento `<h1` de cada página não tem ancestral com `opacity-0` nem `data-reveal`. Chamado como `npm run test:build` no CI, depois do build.
- [ ] **FAQ:** `id` em cada painel, `aria-controls` no botão, `role="region"` com `aria-labelledby`, e `inert` no painel fechado.
- [ ] **Links:** o `Button` não aplica `target="_blank"` quando `href` começa com `tel:`. O pulso do WhatsApp vira `animation-iteration-count: 3`.
- [ ] Commit: `fix(a11y): conteúdo visível sem JS, FAQ acessível e links tel`.

### Tarefa B4: Menu mobile

**Arquivos:**
- Criar: `src/components/layout/MobileMenu.tsx`, `src/lib/use-focus-trap.ts`
- Modificar: `src/components/layout/Header.tsx` (passa a renderizar `<MobileMenu />`)

**Interfaces (produz):** `MobileMenu({ items: typeof mainNav })` controla o próprio estado. `useFocusTrap(ref: RefObject<HTMLElement>, active: boolean): void`.

- [ ] **Comportamento:**
  - Painel sempre montado, com `inert` e `aria-hidden` quando fechado.
  - Transição CSS (`opacity` + `translateY(-8px)`, 300 ms, `cubic-bezier(.22,1,.36,1)`).
  - Esc fecha e devolve o foco ao botão.
  - Tab circula dentro do painel.
  - `document.documentElement.style.overflow = "hidden"` enquanto aberto, restaurado no cleanup.
  - Fecha ao trocar de rota.
- [ ] **Verificar no preview mobile (375×812)**, via script no navegador:
  - Abrir → `getComputedStyle(html).overflow === "hidden"`.
  - Esc → menu fechado e `document.activeElement` é o botão.
  - 10 Tabs não saem do painel.
- [ ] Commit: `fix(header): menu mobile com Esc, foco preso, scroll travado e transição`.

### Tarefa B5: Vídeos (parte de acessibilidade)

**Arquivos:**
- Modificar: `src/components/ui/VideoPlayer.tsx`, `src/components/home/ExperienceSection.tsx`

**Interfaces:** `VideoPlayer` ganha a prop `playWhenVisible?: boolean`.

- [ ] **Vídeo:**
  - `preload="metadata"`, sem `controls`.
  - Botão próprio, no canto inferior direito, 44×44 px: `aria-label` "Pausar vídeo" / "Reproduzir vídeo" e `aria-pressed`.
  - Com `prefers-reduced-motion`, não há autoplay; começa pausado e mostra o botão "Reproduzir".
  - `playWhenVisible`: IntersectionObserver com threshold 0,25; toca ao entrar na viewport e pausa ao sair. Usado na seção Ambiente.
- [ ] **Verificar no preview:**
  - Os dois `<video>` têm `preload="metadata"` e `controls=false`.
  - Rolando até o Ambiente o vídeo dá play; voltando ao topo, `paused === true`.
- [ ] Commit: `fix(video): pausa acessível, preload leve e reduced motion`.

**Abrir o PR B.** Antes do PR rodar `requesting-code-review`, e `security-review` (JSON-LD e headers). **Parar para aprovação do merge.**

### Tarefa B6: Issues da cliente (junto com o PR B)

- [ ] Criar a label `aguardando-cliente` com `gh label create`.
- [ ] Abrir uma issue para cada item da seção 6 do spec com `gh issue create`, apontando o arquivo em `src/data` onde o dado entra.

---

## Bloco C — PR "P1 · mídia, OG e marca" (branch `feat/p1-midia`)

### Tarefa C1: OG, favicon e logo

**Arquivos:**
- Criar: `src/app/opengraph-image.tsx`, `src/app/servicos/[categoria]/opengraph-image.tsx`, `src/app/icon.png`, `src/app/apple-icon.png`, `public/images/logo/logo-espaco-neia.png`, `scripts/logo.mjs`
- Modificar: `Header.tsx`, `Footer.tsx`

- [ ] **OG (1200×630, `next/og`):**
  - Fundo marfim com manchas aqua e rosé.
  - Título em Cormorant Garamond, carregada do `node_modules`/`next/font` (sem fetch externo).
  - Por categoria: `cat.name` + `cat.eyebrow`.
- [ ] **Logo:** `scripts/logo.mjs` (sharp) converte branco quase puro (≥ 245) em alfa, recorta e exporta PNG de 640 px, além de `icon.png` (círculo, 512) e `apple-icon.png` (180, fundo marfim).
  - **Conferência visual obrigatória.** Se a borda ficar serrilhada, mantenho o JPG e a issue do vetor original vira bloqueante para esse item.
  - Tirar o `mix-blend-multiply`.
- [ ] Verificar no preview: `/opengraph-image` responde 200 em PNG; `<link rel="icon">` presente.
- [ ] Commit: `feat(seo): OG por categoria, favicon e logo transparente`.

### Tarefa C2: Vídeos otimizados

- [ ] `scripts/media.mjs` com `ffmpeg-static`:
  - Poster com o frame de 1 s em `public/videos/*.jpg` (AVIF/WebP via `next/image` não se aplica a poster; JPG com qualidade 80).
  - WebM VP9 (CRF 34) e MP4 H.264 (CRF 26, `-movflags +faststart`).
  - Meta: −30% de peso sem perda visível; comparar os frames lado a lado no PR.
- [ ] Em `media.ts`: `sources: [{src, type}]` e `poster`. O `VideoPlayer` passa a renderizar `<source>`.
- [ ] Commit: `perf(video): poster, WebM e bitrate reduzido`.

### Tarefa C3 (gated): Remover duplicatas de mídia

- [ ] `git rm -r src/imagem src/video` (~6,8 MB, sem nenhum import). **Só executar depois de confirmação explícita no chat.**

### Tarefa C4 (gated): Renomes da Fase 1

- [ ] **Antes de executar, pedir confirmação e apresentar o checklist.**
- [ ] `gh repo rename espaco-neia` e `git remote set-url origin https://github.com/devig0rzin/espaco-neia.git`.
- [ ] `gh repo edit --description "Site institucional do Espaço Néia — clínica de estética em Cotia/SP" --homepage <url de produção> --add-topic nextjs,typescript,tailwindcss,gsap,landing-page,seo`.
- [ ] **Passos manuais seus na Vercel** (o MCP dá 403 nesse escopo):
  - renomear o projeto para `espaconeia`;
  - em Domains, adicionar `espaconeia.vercel.app` (ou `espaco-neia.vercel.app`);
  - conferir se a integração Git acompanhou o rename.
- [ ] Depois: conferir que `getSiteUrl()` no preview reflete o novo domínio. Não há mudança de código, graças à D2.

**Abrir o PR C** e parar para aprovação.

---

## Bloco D — PR "P1 · animações de scroll" (branch `feat/p1-motion`)

Skills a carregar só neste bloco: `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `animate`; `gsap-performance` e `review-animations` antes do PR.

### Tarefa D1: Infraestrutura de movimento

**Arquivos:**
- Criar: `src/lib/motion.ts`, `src/lib/motion.test.ts`, `src/components/motion/MotionProvider.tsx` (Lenis + ticker do GSAP + refresh), `src/components/motion/RevealGroup.tsx`, `src/components/motion/SplitHeading.tsx`
- Modificar: `layout.tsx`. O `Reveal.tsx` vira wrapper de `RevealGroup`.

**Interfaces (produz):**
```ts
export const ease = { out: "power3.out", expo: "expo.out" } as const;
export const dur = { enter: 1, interact: 0.3, reduced: 0.2 } as const;
export const dist = { sm: 16, md: 24, lg: 40 } as const;
export const stagger = 0.08;
export const parallaxMax = 0.1;
export const mq = { desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)", mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" } as const;
```

- [ ] **Teste:** os valores respeitam o spec (`dur.enter` entre 0,8 e 1,2; `dist.lg ≤ 40`; `stagger` entre 0,06 e 0,1; `parallaxMax ≤ 0,1`).
- [ ] **MotionProvider:**
  - Lenis só com `mq` sem reduced motion e com `!matchMedia("(pointer: coarse)").matches`.
  - `gsap.ticker.add(t => lenis.raf(t*1000))` e `gsap.ticker.lagSmoothing(0)`.
  - `ScrollTrigger.refresh()` em `window.load` e no `loadeddata` dos vídeos.
- [ ] **Verificar:** navegar entre 5 rotas e checar que `ScrollTrigger.getAll().length` volta ao valor base (sem vazamento). Com reduced motion emulado, `lenis` não é instanciado.

### Tarefa D2: Efeitos por seção

Cada item é uma ilha client em `src/components/motion/` e fica num commit próprio. Tudo usa `gsap.matchMedia(mq)`.

| Seção | Componente | Desktop | Mobile |
|---|---|---|---|
| Header | `HeaderScroll` | Esconde ao descer e volta ao subir; blur depois do hero; barra de progresso rosé (`scaleX`) | Igual, sem a barra |
| Hero | `HeroMotion` | `SplitText` por linha com máscara; stagger nos selos e CTAs; vídeo com `clip-path: inset()` abrindo; parallax ±8% no vídeo e −8% no selo; manchas com drift de 20 s em yoyo | Fade-rise |
| Soluções | `StepsLine` | Números em stagger; linha SVG com `scaleX` em scrub | Fade-rise |
| Categorias | `StackedCards` | Sticky; o card anterior vai para `scale .95` e `filter: brightness(.96)` | Grid com fade-rise |
| Diferenciais | `DrawIcons` | Ícones SVG com stroke-dashoffset e stagger | Igual, sem scrub |
| Passo a passo | `PinnedTimeline` | Pin com linha vertical em scrub; etapa "acende" (opacidade .4 → 1) | Lista com fade |
| Protocolos | `MaskReveal` | Clip-path abrindo e imagem `scale 1.08 → 1` | Fade |
| Ambiente | `ExpandingVideo` | `scale .86 → 1` e radius `24 → 8px` em scrub | Fade |
| Campanhas | `PriceStrike` | Risco `scaleX` no preço "de", depois o preço "por" sobe | Igual (sem scrub) |
| FAQ | (CSS existente) | — | — |
| CTA final | `DriftGradient` | Gradiente com `backgroundPosition` via scrub | Estático |
| Internas | `PageHero` | `SplitHeading` + reveals contidos | Fade |

- [ ] Cada componente aceita só `children` e props de dado. Não toca em Server Components além de envolver.
- [ ] **Verificar por seção:** print ou vídeo curto de antes e depois no PR; CLS < 0,1 medido no Lighthouse; reduced motion sem movimento.

**Abrir o PR D** depois de `gsap-performance`, `review-animations` e `requesting-code-review`. Parar para aprovação.

---

## Bloco E — PR "P2 · conversão e medição" (branch `feat/p2-conversao`)

- [ ] **E1. Mensagens contextuais:** `whatsappMessages` em `src/data/site.ts`, com textos por página, categoria e campanha (ex.: `"Olá! Vim pela página de ${cat.name} e gostaria de agendar uma avaliação."`). Teste: cada categoria gera uma URL com o próprio nome.
- [ ] **E2. Medição:**
  - `@vercel/analytics` + `@vercel/speed-insights` no layout.
  - `track("cta_whatsapp", { origem })` e `track("cta_telefone", { origem })` num `TrackedLink` client.
  - Sem cookies, então não precisa de banner (LGPD).
- [ ] **E3. Contato:** mapa com `loading="lazy"` (já está) e link "Como chegar" para `https://www.google.com/maps/dir/?api=1&destination=<endereço codificado>`.
- [ ] **E4. 404:** `not-found.tsx` com a cara da marca: H1 "Página não encontrada", links para Início, Tratamentos e WhatsApp.
- [ ] **E5. Home mais curta:**
  - Fundir "Bem-vinda" com o Hero (o manifesto aparece uma vez só).
  - Fundir "Protocolos exclusivos" com "Passo a passo".
  - Reduzir as repetições de "avaliação".
  - O outline de antes e depois vai na descrição do PR; executar **só depois do seu ok** no próprio PR.
- [ ] **E6. Slider antes/depois** (`BeforeAfter`, com `<input type="range">`, teclado e touch):
  - `scripts/split-gallery.mjs` (sharp) recorta as montagens e mostra o ponto de corte para conferência visual.
  - Renderiza só com `showDrafts()`, porque a galeria continua draft (pendência regulatória).
- [ ] **E7. BreadcrumbList** em JSON-LD nas internas. Validar no Rich Results Test pela URL do preview.

---

## Bloco F — PR "P2 · performance e portfólio" (branch `chore/p2-portfolio`)

- [ ] **F1. Imagens:**
  - Originais em `public/images/ilustrativas/*.png` (~1,8 MB cada) → WebP com qualidade 90, via `scripts/images.mjs`.
  - Revisar `sizes`: `/sobre` hoje usa `25vw` no mobile, quando deveria ser `50vw`.
  - A remoção dos PNGs originais é gated.
- [ ] **F2. Lighthouse mobile** (`npx lighthouse` no `next start` local e no preview): atingir as metas da seção 5 do spec. Prints no PR.
- [ ] **F3. Repositório:**
  - `README` estilo case study: GIF das animações, link, badges, decisões técnicas, Lighthouse, a tabela "onde editar" (mantida) e "Todos os direitos reservados".
  - `PROMPTS-IMAGENS-IA.md` vai para `docs/`.
  - `.env.example` com `NEXT_PUBLIC_SITE_URL=`.
- [ ] **F4. Verificação final:** `verification-before-completion`, com saída do build e dos testes, link do preview, Lighthouse e prints de desktop e mobile. **Promover para produção só com sua autorização.**

---

## Ordem, dependências e esforço

| Ordem | Bloco | Depende de | Esforço | Entregável |
|---|---|---|---|---|
| 1 | A — base, segurança, rascunho, campanhas, formulário | — | M | PR A + CI verde |
| 2 | B — SEO, contraste, no-JS, FAQ, menu, vídeo a11y, issues | A | M | PR B + issues `aguardando-cliente` |
| 3 | C — OG, favicon, logo, vídeos, (gated) limpeza e renomes | B | M | PR C + checklist manual da Vercel |
| 4 | D — animações GSAP + Lenis | B (tokens e Reveal), C (posters) | G | PR D + vídeo antes/depois |
| 5 | E — conversão, medição, 404, Home curta, slider (draft) | D | M | PR E |
| 6 | F — imagens, Lighthouse, README | E | P | PR F + relatório final |

**Paradas obrigatórias para aprovação:** merge de cada PR, C3 (apagar mídia), C4 (renomes), a reestruturação da Home em E5, a remoção dos PNGs em F1 e a promoção para produção.
