IMAGENS DO SITE — Espaço Néia
=================================

Coloque aqui as fotos reais quando disponíveis. Sugestões de arquivos:

- og.jpg .......... 1200x630px — imagem de compartilhamento (WhatsApp, redes, Google).
- hero.jpg ........ foto do ambiente/atendimento para o topo da Home.
- ambiente-1.jpg .. fotos do espaço para a página Sobre.
- ambiente-2.jpg
- categoria-*.jpg . fotos para cada categoria de tratamento.

Como usar uma foto real no lugar de um placeholder:
1. Salve a imagem nesta pasta (public/images/).
2. No componente desejado, troque <ImagePlaceholder ... /> por:
   import Image from "next/image";
   <Image src="/images/hero.jpg" alt="Descrição" width={800} height={1000} className="rounded-3xl" />

Dica: use fotos horizontais para og.jpg e verticais (4/5) para os blocos de ambiente.
