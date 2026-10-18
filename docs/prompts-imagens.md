# Prompts de imagens: Espaço Néia

Use no ChatGPT (geração de imagem). Gere **uma imagem por vez**, colando primeiro o **estilo base** e depois o prompt da imagem. Salve cada arquivo com o nome indicado e mande para o Claude colocar no site (pasta `public/images/site/`).

## Estilo base (cole antes de cada prompt)

> Fotografia realista, estilo editorial de clínica de estética brasileira premium. Luz natural suave e difusa, tons quentes. Paleta: branco, rosé claro, nude e toques sutis de verde-água. Ambiente clean, moderno e acolhedor. Pele com textura natural, sem retoque exagerado. Pessoas adultas brasileiras, com diversidade de tons de pele e idades (25 a 55 anos), expressões tranquilas e felizes. Profissionais com jaleco branco e luvas quando houver procedimento. Sem texto, sem letras, sem logotipos, sem marcas d'água. Alta resolução.

## 1. Banner principal (3 imagens, formato paisagem 4:3)

**hero-1.jpg**
> Mulher sorrindo, de olhos fechados, recebendo tratamento facial numa maca com toalha branca; esteticista de luvas aplica sérum com conta-gotas. Enquadramento médio, fundo de clínica clara e desfocada. Formato 4:3 horizontal.

**hero-2.jpg**
> Sessão de massagem modeladora nas costas e cintura de uma mulher deitada de bruços, mãos da terapeuta em movimento suave, óleo leve na pele, toalhas brancas e plantas ao fundo. Formato 4:3 horizontal.

**hero-3.jpg**
> Momento de autocuidado: mulher sentada em poltrona confortável com os pés numa bacia de spa com pétalas, enquanto faz as unhas das mãos; ambiente iluminado e aconchegante em tons rosé. Formato 4:3 horizontal.

## 2. Cards "Tratamentos mais procurados" (formato retrato 4:5)

Salve em `servicos/` com o nome indicado.

| Arquivo | Prompt |
|---|---|
| `limpeza-de-pele.jpg` | Close de rosto de mulher numa maca, esteticista de luvas fazendo limpeza de pele com algodão e vapor ao lado. Formato 4:5 vertical. |
| `micropigmentacao.jpg` | Close de sobrancelha sendo desenhada com régua e lápis de mapeamento antes da micropigmentação, profissional de luvas. Formato 4:5 vertical. |
| `botox.jpg` | Profissional de saúde de luvas marcando pontos com lápis branco na testa de uma paciente sorridente, em avaliação. Sem agulha aparente. Formato 4:5 vertical. |
| `preenchimento.jpg` | Close elegante de lábios naturais e hidratados de uma mulher, profissional de luvas analisando o contorno. Sem agulha aparente. Formato 4:5 vertical. |
| `criolipolise.jpg` | Equipamento estético moderno de criolipólise ao lado de uma maca branca em sala de clínica clara, sem pessoas. Formato 4:5 vertical. |
| `lipocavitacao.jpg` | Esteticista aplicando aparelho de ultrassom estético no abdômen de uma mulher deitada, com gel. Formato 4:5 vertical. |
| `drenagem-linfatica.jpg` | Mãos de terapeuta fazendo drenagem linfática nas pernas de uma mulher deitada, movimentos suaves, toalha branca. Formato 4:5 vertical. |
| `massagem-relaxante.jpg` | Mulher relaxada de bruços recebendo massagem nos ombros, pedras quentes ao lado, luz quente de fim de tarde. Formato 4:5 vertical. |
| `manicure.jpg` | Close de mãos femininas com unhas recém-feitas em tom nude rosado, sobre toalha branca, alicate e esmaltes desfocados. Formato 4:5 vertical. |
| `pedicure.jpg` | Close de pés numa bacia de spa com pétalas de rosa, profissional de luvas cuidando das unhas. Formato 4:5 vertical. |
| `alongamento-cilios.jpg` | Close de olho fechado com cílios alongados naturais, pinças da profissional aplicando fio a fio. Formato 4:5 vertical. |
| `corte.jpg` | Cabeleireira finalizando corte em cabelo ondulado, cliente sorrindo diante do espelho, salão claro. Formato 4:5 vertical. |

## 3. Depoimentos (quadrado 1:1)

**depoimentos.jpg**
> Retrato de mulher brasileira de cerca de 40 anos, sorriso espontâneo, pele radiante, roupa clara, fundo de clínica clara desfocada. Formato 1:1 quadrado.

## 4. Faixa "Agende agora" (paisagem 16:9)

**banner-agende.jpg**
> Recepção de clínica de estética moderna e acolhedora: balcão claro, poltronas rosé, plantas, flores frescas e luz natural. Sem pessoas. Formato 16:9 horizontal.

## 5. "Sobre nós": 3 cards com palavra por cima (retrato 3:4)

Deixe a parte de baixo da imagem mais limpa, porque o site escreve uma palavra por cima.

**sobre-beleza.jpg**
> Mulher sorrindo segurando um buquê de flores do campo, luz natural, tons quentes. Formato 3:4 vertical.

**sobre-autoestima.jpg**
> Mulher se olhando no espelho com confiança e um sorriso leve, ambiente claro. Formato 3:4 vertical.

**sobre-bem-estar.jpg**
> Mulher de roupão branco, olhos fechados e expressão serena, segurando uma xícara de chá numa sala de relaxamento. Formato 3:4 vertical.

## 6. Avaliação gratuita (paisagem 4:3)

**avaliacao.jpg**
> Esteticista conversando com uma cliente sentada, as duas sorrindo, prancheta na mão, numa sala de avaliação clara. Formato 4:3 horizontal.

## 7. Vídeo da seção "Sua jornada" (Flow): animação quadro a quadro

Gere um vídeo de 6 a 8 segundos, plano contínuo e câmera lenta, sem cortes:

> Câmera em movimento lento e contínuo (dolly) atravessando uma clínica de estética clara e acolhedora: começa na recepção com flores, passa por uma sala de avaliação com duas poltronas e termina numa sala de tratamento com maca branca e luz suave. Paleta branco, rosé e nude, luz natural, estilo cinematográfico realista. Sem pessoas, sem texto. 16:9, 1080p.

Depois de pronto, mande o vídeo: o Claude converte em quadros e liga a animação no scroll.

## Cuidados

- Não use fotos de antes e depois nem promessas de resultado.
- Em botox e preenchimento, evite agulhas em destaque.
- Revise mãos, dedos e olhos antes de aprovar a imagem: são onde a IA mais erra.
