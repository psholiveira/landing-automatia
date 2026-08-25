# AutomatIA — landing page (Next.js)

Next.js 14 (App Router) + TypeScript + Tailwind CSS + GSAP.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build && npm start` para produção. Deploy na Vercel: importe o repositório, sem configuração extra.

## Estrutura

```
src/
  app/
    layout.tsx        fontes (Archivo + IBM Plex Mono), metadata/SEO
    page.tsx          composição das seções, nesta ordem
    globals.css       reset, .kicker e .shell
  content/
    site.ts           TODO O CONTEÚDO EM TEXTO — comece aqui
  components/
    Navbar.tsx        barra fixa + botão do menu
    MenuOverlay.tsx   menu cinético em tela cheia
    Hero.tsx          hero + barra de números
    Marquee.tsx       faixa azul rolando
    Servicos.tsx      grade de 9 serviços
    AntesDepois.tsx   comparativo em duas colunas
    Agentes.tsx       seção azul + simulação de chat
    Metodo.tsx        as 4 etapas
    Case.tsx          depoimento (placeholder)
    CTA.tsx           bloco de contato
    Footer.tsx
    Reveal.tsx        wrapper de animação de entrada
    Counter.tsx       número que conta ao aparecer
  hooks/
    useReveal.ts      hook de reveal com ScrollTrigger
  lib/
    gsap.ts           registro do plugin + helpers
```

## Trocar textos

Tudo em `src/content/site.ts`. Nenhum componente tem copy embutida.

## Animações

O padrão é `<Reveal>`:

```tsx
<Reveal className="flex flex-col gap-5">conteúdo</Reveal>
<Reveal y={60} delay={0.16}>entra mais tarde</Reveal>
<Reveal x={-60} y={0}>entra pela esquerda</Reveal>
```

Para animar um elemento já existente, use o hook direto:

```tsx
const ref = useReveal<HTMLDivElement>({ y: 80, duration: 1 });
return <div ref={ref}>…</div>;
```

Detalhe importante em `lib/gsap.ts`: elementos já visíveis no carregamento animam
na hora e só o que está abaixo da dobra recebe gatilho de scroll. Sem isso o
ScrollTrigger dispara tudo de uma vez antes do layout assentar e a página aparece
sem animação. `prefers-reduced-motion` desliga todo o movimento.

## Cores (tailwind.config.ts)

`navy #0b2a5b` · `brand #1a73c8` · `sky #6fabe8` · `ground #f3f2f2` ·
`surface #eae9e9` · `ink #201e1d`. Sem raio de borda em nenhum lugar, réguas de 2px.

## Pendências antes de publicar

- `caseCliente` em `site.ts`: citação, autor e imagem são placeholders. Coloque a
  imagem em `public/` e aponte `imagem: "/case-01.jpg"`.
- Revisar as promessas "2 semanas até o 1º entregável" e "carrega em menos de 1s".
- Trocar `contato.instagram` pelo perfil real.
