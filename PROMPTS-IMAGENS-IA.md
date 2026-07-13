# Prompts para geração de imagens — Espaço Néia

As 4 imagens ilustrativas já usadas no site (`public/images/ilustrativas/`) foram geradas com um
estilo consistente: ambiente clean em tons turquesa/água-marinha + rosé + branco, luz suave e natural,
profissional de jaleco branco, modelo feminina adulta, still fotográfico realista (não ilustração/desenho).

Use os prompts abaixo (em qualquer gerador de imagem por IA — Midjourney, DALL·E, Stable Diffusion,
ChatGPT/Sora Images etc.) para criar novas imagens **na mesma linha visual**, mantendo consistência com
o que já está no site. Depois de gerar, salve em `public/images/ilustrativas/` com um nome descritivo
em kebab-case (ex.: `sala-espera.png`) e referencie no componente desejado.

---

## Estilo base (cole isso no início de qualquer prompt novo)

```
Realistic professional photography, high-end beauty clinic interior in soft turquoise/aqua and
blush pink tones, white marble and rose-gold details, soft natural diffused lighting, shallow
depth of field, clean and minimal composition, premium spa aesthetic, warm and welcoming mood,
no visible logos or text, high resolution, editorial photography style --ar 4:5
```

---

## Prompts sugeridos (imagens que ainda faltam no site)

### 1. Recepção / sala de espera
```
[estilo base] + Elegant beauty clinic reception area, small velvet blush sofa, fresh pink flowers
in a vase, soft round mirror, warm ambient lighting, nobody in frame, inviting and calm atmosphere
```
Uso sugerido: Página Sobre, seção "Ambiente"; página Contato.

### 2. Sala de procedimento corporal (tecnologia/aparelho estético)
```
[estilo base] + Modern aesthetic body contouring device in a clean treatment room, turquoise
accent wall, professional equipment on a white cart, no people, tidy and high-tech but warm
```
Uso sugerido: página `/servicos/emagrecimento-e-modelagem-corporal` (heroImage).

### 3. Detalhe de mãos aplicando sérum/produto (cosmético)
```
[estilo base] + Close-up of a beauty professional's hands applying a cosmetic serum dropper onto
a glass tray, soft pink and turquoise product bottles blurred in background, delicate and precise
```
Uso sugerido: Home, seções de tecnologia/personalização (alternativa).

### 4. Corredor / fachada interna do espaço
```
[estilo base] + Interior hallway of a boutique beauty clinic, arched doorway, soft LED accent
lighting, turquoise and blush color palette, plants and fresh flowers, elegant and inviting
```
Uso sugerido: Home, hero alternativo; Sobre, "ambiente e estrutura".

### 5. Cliente sorrindo após atendimento (retrato)
```
[estilo base] + Portrait of a confident adult woman smiling gently, natural makeup, soft studio
lighting, blush pink background, looking slightly off-camera, warm and genuine expression
```
Uso sugerido: depoimentos (com modelo — nunca usar como se fosse cliente real sem identificar).

### 6. Equipe / profissional em jaleco (retrato para "Sobre")
```
[estilo base] + Portrait of a friendly aesthetics professional in a white uniform with pink trim,
arms crossed, warm smile, blush pink studio background, confident and approachable
```
⚠️ Use apenas como placeholder estético até haver fotos reais da equipe — nunca publique como se
fosse um profissional real e específico sem autorização e verificação de identidade/registro.

---

## Boas práticas

- Gere sempre em proporção **retrato (4:5)** para blocos de hero/categoria, ou **paisagem (16:9)**
  para banners largos.
- Evite imagens com texto, marcas d'água ou logotipos de terceiros.
- Mantenha o mesmo tom de pele, iluminação e paleta de cores entre as imagens para consistência.
- Depois de gerar, você pode pedir para o Claude Code integrar a nova imagem em qualquer seção —
  basta indicar o arquivo e onde deseja usá-la.
