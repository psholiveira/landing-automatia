import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "services");
mkdirSync(OUT_DIR, { recursive: true });

const NAVY = "#0b2a5b";
const BRAND = "#1a73c8";
const SKY = "#6fabe8";
/**
 * O componente CircularGallery renderiza cada item num plano 3D com proporção
 * FIXA de 700:900 (constantes hardcoded no vendor, independente do tamanho de
 * tela — ver Media.onResize em circular-gallery-2.tsx). O shader faz um crop
 * "cover" pra encaixar a imagem nesse plano, então uma imagem paisagem (como
 * o 800x600 anterior) tem as laterais cortadas. Gerando o card já nessa
 * proporção retrato, nada é cortado.
 */
const W = 700;
const H = 900;
const STROKE = 8;
/** Raster de saída em múltiplo do viewBox lógico — os planos da galeria 3D
 * renderizam bem maiores que 800x600 na tela, então sem isso o navegador
 * rasteriza o SVG offscreen no tamanho intrínseco e a textura sai borrada. */
const RASTER_SCALE = 3;

/** Ícones simples em traço, desenhados à mão num box ~240x240 centrado em (400,380). */
const icons = {
  layers: `
    <rect x="300" y="260" width="140" height="140" rx="16" fill="none" stroke="#ffffff" stroke-width="${STROKE}" opacity="0.45"/>
    <rect x="335" y="295" width="140" height="140" rx="16" fill="none" stroke="#ffffff" stroke-width="${STROKE}" opacity="0.7"/>
    <rect x="370" y="330" width="140" height="140" rx="16" fill="${NAVY}" stroke="#ffffff" stroke-width="${STROKE}"/>
  `,
  zap: `
    <path d="M424 250 L344 400 L394 400 L376 510 L476 370 L416 370 Z" fill="#ffffff"/>
  `,
  chat: `
    <rect x="290" y="270" width="220" height="150" rx="26" fill="none" stroke="#ffffff" stroke-width="${STROKE}"/>
    <path d="M330 420 L330 465 L378 420 Z" fill="#ffffff"/>
    <circle cx="355" cy="345" r="9" fill="#ffffff"/>
    <circle cx="400" cy="345" r="9" fill="#ffffff"/>
    <circle cx="445" cy="345" r="9" fill="#ffffff"/>
  `,
  browser: `
    <rect x="280" y="270" width="240" height="170" rx="14" fill="none" stroke="#ffffff" stroke-width="${STROKE}"/>
    <line x1="280" y1="312" x2="520" y2="312" stroke="#ffffff" stroke-width="${STROKE}"/>
    <circle cx="305" cy="291" r="6" fill="#ffffff"/>
    <circle cx="326" cy="291" r="6" fill="#ffffff"/>
    <circle cx="347" cy="291" r="6" fill="#ffffff"/>
    <path d="M420 350 L420 430 L442 411 L458 447 L475 439 L458 404 L488 398 Z" fill="#ffffff"/>
  `,
  gear: (() => {
    const cx = 400;
    const cy = 380;
    const rInner = 46;
    const rOuter = 70;
    const rTeeth = 90;
    let teeth = "";
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i;
      const tx = cx + Math.cos(angle) * rTeeth;
      const ty = cy + Math.sin(angle) * rTeeth;
      const deg = (angle * 180) / Math.PI;
      teeth += `<rect x="${tx - 12}" y="${ty - 12}" width="24" height="24" rx="4" fill="#ffffff" transform="rotate(${deg} ${tx} ${ty})"/>`;
    }
    return `
      <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="none" stroke="#ffffff" stroke-width="${STROKE}"/>
      ${teeth}
      <circle cx="${cx}" cy="${cy}" r="${rInner}" fill="${NAVY}" stroke="#ffffff" stroke-width="${STROKE}"/>
    `;
  })(),
  link: `
    <rect x="290" y="345" width="170" height="80" rx="40" fill="none" stroke="#ffffff" stroke-width="${STROKE}" transform="rotate(-28 375 385)"/>
    <rect x="340" y="345" width="170" height="80" rx="40" fill="none" stroke="#ffffff" stroke-width="${STROKE}" transform="rotate(-28 425 385)"/>
  `,
  bars: `
    <line x1="290" y1="460" x2="520" y2="460" stroke="#ffffff" stroke-width="6" opacity="0.6"/>
    <rect x="305" y="400" width="42" height="60" rx="6" fill="#ffffff" opacity="0.55"/>
    <rect x="360" y="360" width="42" height="100" rx="6" fill="#ffffff" opacity="0.7"/>
    <rect x="415" y="320" width="42" height="140" rx="6" fill="#ffffff" opacity="0.85"/>
    <rect x="470" y="280" width="42" height="180" rx="6" fill="#ffffff"/>
  `,
  bulb: `
    <circle cx="400" cy="345" r="70" fill="none" stroke="#ffffff" stroke-width="${STROKE}"/>
    <path d="M372 340 L392 360 L428 320" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
    <rect x="375" y="408" width="50" height="30" rx="8" fill="none" stroke="#ffffff" stroke-width="${STROKE}"/>
    <line x1="400" y1="248" x2="400" y2="222" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <line x1="452" y1="270" x2="472" y2="252" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <line x1="348" y1="270" x2="328" y2="252" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
  `,
  shield: `
    <path d="M400 250 L472 282 L472 366 C472 424 442 460 400 484 C358 460 328 424 328 366 L328 282 Z" fill="none" stroke="#ffffff" stroke-width="${STROKE}" stroke-linejoin="round"/>
    <path d="M366 372 L392 400 L440 340" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  `,
};

/**
 * Copy dos serviços, replicada de src/content/site.ts (servicos.itens).
 * Este script gera imagens estáticas — se a copy mudar lá, atualize aqui
 * também e rode `node scripts/gen-service-cards.mjs` de novo.
 */
const services = [
  { n: "01", icon: "layers", nome: "Aplicações escaláveis", desc: "Arquitetura que aguenta crescer: dez ou dez mil usuários, mesma resposta." },
  { n: "02", icon: "zap", nome: "Automações com IA", desc: "O trabalho repetitivo sai da mão do time e passa a rodar sozinho, com registro de tudo." },
  { n: "03", icon: "chat", nome: "Agentes de IA e chatbots", desc: "Atendimento e qualificação de lead 24/7, treinados no seu produto e no seu tom." },
  { n: "04", icon: "browser", nome: "Landing pages de alta conversão", desc: "Estrutura e copy desenhadas para vender, não para ganhar prêmio de design." },
  { n: "05", icon: "gear", nome: "Sistemas sob medida", desc: "Quando nenhum SaaS encaixa: o software se molda ao seu processo, não o contrário." },
  { n: "06", icon: "link", nome: "Integrações e APIs", desc: "ERP, CRM, WhatsApp, pagamentos e planilhas conversando sem ninguém no meio." },
  { n: "07", icon: "bars", nome: "Dashboards e BI", desc: "Um número por decisão, atualizado em tempo real — fim do relatório de sexta à noite." },
  { n: "08", icon: "bulb", nome: "Consultoria de IA", desc: "Onde a IA dá retorno no seu negócio e onde é só custo. Dizemos os dois." },
  { n: "09", icon: "shield", nome: "Manutenção e sustentação", desc: "Monitoramos, corrigimos e evoluímos o que está no ar. Sem abandono pós-entrega." },
];

const PAD = 56;

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Quebra de linha aproximada por contagem de caracteres (sem medição real de fonte). */
function wrapText(text, maxWidth, fontSize, weight = 400) {
  const avgCharWidth = fontSize * (weight >= 700 ? 0.58 : 0.52);
  const maxChars = Math.max(8, Math.floor(maxWidth / avgCharWidth));
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function textBlock({ x, y, lines, fontSize, lineHeight, weight, fill, opacity = 1, fontFamily }) {
  const tspans = lines
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
  return `<text x="${x}" y="${y}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${weight}" fill="${fill}" opacity="${opacity}">${tspans}</text>`;
}

function card({ n, icon, nome, desc }) {
  const sans = "system-ui, -apple-system, 'Segoe UI', sans-serif";
  const mono = "ui-monospace, 'IBM Plex Mono', monospace";

  const titleLines = wrapText(nome, W - PAD * 2, 46, 800);
  const titleStartY = 280;
  const titleLineHeight = 56;
  const titleBottom = titleStartY + (titleLines.length - 1) * titleLineHeight;

  const descLines = wrapText(desc, W - PAD * 2, 26, 500);
  const descStartY = titleBottom + 50;
  const descLineHeight = 38;

  // ícone original desenhado ~centrado em (400,375); reposiciona pra um selo no canto superior direito
  const iconGroup = `<g transform="translate(392,-7.5) scale(0.42)" opacity="0.92">${icons[icon]}</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W * RASTER_SCALE}" height="${H * RASTER_SCALE}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${BRAND}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  ${[1, 2, 3, 4, 5].map((i) => `<line x1="${(W / 6) * i}" y1="0" x2="${(W / 6) * i}" y2="${H}" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2"/>`).join("\n  ")}
  <text x="${PAD}" y="104" font-family="${mono}" font-size="64" font-weight="800" fill="${SKY}" opacity="0.95">${n}</text>
  ${iconGroup}
  ${textBlock({ x: PAD, y: titleStartY, lines: titleLines, fontSize: 46, lineHeight: titleLineHeight, weight: 800, fill: "#ffffff", fontFamily: sans })}
  ${textBlock({ x: PAD, y: descStartY, lines: descLines, fontSize: 26, lineHeight: descLineHeight, weight: 500, fill: "#ffffff", opacity: 0.82, fontFamily: sans })}
  <rect x="4" y="4" width="${W - 8}" height="${H - 8}" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
</svg>
`;
}

for (const s of services) {
  const svg = card(s);
  writeFileSync(join(OUT_DIR, `${s.n}.svg`), svg, "utf8");
}

console.log(`Gerados ${services.length} cards em ${OUT_DIR}`);
