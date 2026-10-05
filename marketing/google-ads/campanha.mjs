/**
 * Campanha de Pesquisa do Google Ads da AutomatIA.
 *
 * Todo o texto da campanha vive aqui. Rode `node marketing/google-ads/campanha.mjs`
 * para conferir os limites de caracteres do Google Ads e gerar os CSVs
 * de importação do Google Ads Editor em marketing/google-ads/editor/.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://www.automatia.company/";

export const campanha = {
  nome: "Pesquisa | AutomatIA | Leads WhatsApp",
  orcamentoSemanal: 100, // R$
  // O Google trabalha com orçamento diário: 100 / 7 ≈ 14. Em dias bons ele pode gastar até 2x,
  // mas no mês o total não passa de 30,4 x o diário (~R$ 430).
  orcamentoDiario: 14, // R$
  cpcMaximo: 3, // R$ — teto do "Maximizar cliques"; acima disso um clique come 1/5 do dia
};

/** Valem para todos os grupos. */
const comuns = {
  titulos: ["Diagnóstico gratuito de 30 min", "Preço e prazo fechados", "Fale com quem constrói"],
};

/**
 * O orçamento é da campanha, não de cada grupo: o Google gasta onde aparecem buscas.
 * `ativo: false` entra pausado — use para desligar um serviço que só queima verba.
 */
export const grupos = [
  {
    nome: "Chatbot WhatsApp e Agentes de IA",
    ativo: true,
    caminho: ["chatbot", "whatsapp"],
    palavras: [
      "chatbot para whatsapp",
      "chatbot whatsapp para empresa",
      "agente de ia para atendimento",
      "agente de ia whatsapp",
      "atendimento automatizado whatsapp",
      "automatizar atendimento whatsapp",
      "atendente virtual whatsapp",
    ],
    exatas: ["chatbot para whatsapp", "agente de ia para atendimento"],
    titulos: [
      "Chatbot para WhatsApp com IA",
      "Agente de IA no seu WhatsApp",
      "Atendimento 24/7, sem escala",
      "Resposta em 30 segundos",
      "Nenhum lead esquecido",
      "Agenda reuniões sozinho",
      "Treinado no seu negócio",
      "Qualifica leads no WhatsApp",
      "WhatsApp, site e Instagram",
      "Integra com CRM e agenda",
      "Seu comercial dorme. Ele não",
      "AutomatIA | Agentes de IA",
    ],
    descricoes: [
      "Um agente treinado no seu negócio responde, qualifica e marca a reunião. 24h por dia.",
      "Diagnóstico gratuito de 30 min: dizemos o que automatizar primeiro. Chame no WhatsApp.",
      "Funciona no WhatsApp, no site e no Instagram, integrado ao seu CRM e à sua agenda.",
      "Preço e prazo fechados antes de começar. Você fala direto com quem constrói o projeto.",
    ],
  },
  {
    nome: "Automação para Empresas",
    ativo: true,
    caminho: ["automacao", "empresas"],
    palavras: [
      "automação para empresas",
      "automação empresarial",
      "automação de processos",
      "empresa de automação",
      "automatizar tarefas repetitivas",
      "automação de processos com ia",
      "automação com inteligência artificial",
      "empresa de automação de processos",
      "automatizar processos da empresa",
      "automação de processos empresariais",
      "consultoria em inteligência artificial",
      "implementar ia na empresa",
      "integração whatsapp com crm",
      "integração de sistemas erp",
    ],
    exatas: ["automação de processos com ia"],
    titulos: [
      "Automação de processos com IA",
      "Automatize o trabalho manual",
      "Chega de planilha à mão",
      "Orçamento em 2 minutos",
      "Integre ERP, CRM e WhatsApp",
      "Relatórios prontos sozinhos",
      "Consultoria de IA prática",
      "IA onde dá retorno de verdade",
      "Entregas semanais funcionando",
      "Sem abandono pós-entrega",
      "Automação para seu negócio",
      "AutomatIA | Automação com IA",
    ],
    descricoes: [
      "Mapeamos o processo e apontamos onde tempo e dinheiro vazam. Diagnóstico sem custo.",
      "Integramos ERP, CRM, WhatsApp, pagamentos e planilhas. Aproveite o que você já usa.",
      "Escopo, preço e prazo no papel antes da primeira linha de código. Zero surpresa.",
      "Se alguém repete a mesma tarefa duas vezes, uma IA já deveria fazer. Fale com a gente.",
    ],
  },
  {
    nome: "Sistemas e Software Sob Medida",
    ativo: true,
    caminho: ["sistemas", "sob-medida"],
    palavras: [
      "desenvolvimento de sistemas",
      "sistema para empresa",
      "sistema web para empresa",
      "empresa de software",
      "fábrica de software",
      "sistema sob medida",
      "software sob medida",
      "desenvolvimento de software sob medida",
      "desenvolvimento de sistema web",
      "empresa de desenvolvimento de software",
      "sistema personalizado para empresa",
      "criar sistema para empresa",
    ],
    exatas: ["sistema sob medida", "software sob medida"],
    titulos: [
      "Sistema sob medida",
      "Software sob medida",
      "Desenvolvimento de sistemas",
      "O sistema se molda a você",
      "Quando nenhum SaaS encaixa",
      "Aguenta 10 ou 10 mil usuários",
      "Dashboards em tempo real",
      "Integrado ao seu ERP e CRM",
      "Entregas semanais funcionando",
      "Manutenção depois da entrega",
      "1ª entrega em até 2 semanas",
      "AutomatIA | Software",
    ],
    descricoes: [
      "Sistemas web sob medida para o seu processo, não o contrário. Escopo fechado no papel.",
      "Você explica como funciona hoje; arquitetura e tecnologia são problema nosso.",
      "Entregas semanais em ambiente real e suporte depois do lançamento. Sem sumir.",
      "Diagnóstico gratuito de 30 min com quem vai construir. Chame a gente no WhatsApp.",
    ],
  },
  {
    nome: "Sites e Landing Pages",
    ativo: true,
    caminho: ["sites", "landing-page"],
    palavras: [
      "criação de sites para empresas",
      "criação de site profissional",
      "site para empresa",
      "desenvolvimento de sites",
      "site institucional",
      "criação de landing page",
      "landing page profissional",
      "landing page para empresa",
      "empresa de landing page",
      "fazer landing page",
      "landing page de alta conversão",
    ],
    exatas: ["criação de landing page"],
    titulos: [
      "Landing page que converte",
      "Criação de landing page",
      "Landing page profissional",
      "Copy e design para vender",
      "Carrega rápido no celular",
      "Lead direto no seu WhatsApp",
      "Criação de sites profissionais",
      "Sites e landing pages",
      "Veja projetos no ar",
      "Sem template genérico",
      "Atualize sem programador",
      "AutomatIA | Sites",
    ],
    descricoes: [
      "Estrutura e copy desenhadas para vender, não para ganhar prêmio de design.",
      "Página rápida, pensada para o celular, com o lead chegando direto no seu WhatsApp.",
      "Veja nossos cases no ar antes de decidir. Preço e prazo fechados antes de começar.",
      "Conte o que você vende e a gente diz como a página deve ser. Conversa gratuita.",
    ],
  },
  {
    nome: "Clínicas e Consultórios",
    ativo: true,
    caminho: ["clinicas", "agendamento"],
    palavras: [
      "chatbot para clínica",
      "automação para clínicas",
      "agendamento automático whatsapp",
      "secretária virtual para clínica",
      "confirmação de consulta whatsapp",
      "atendimento automático para consultório",
    ],
    exatas: ["chatbot para clínica"],
    titulos: [
      "Chatbot para clínicas",
      "Agendamento pelo WhatsApp",
      "Agenda, confirma e remarca",
      "Menos faltas de pacientes",
      "Recepção menos sobrecarregada",
      "Atendimento 24/7 da clínica",
      "Direto na agenda da clínica",
      "Secretária virtual com IA",
      "Resposta em 30 segundos",
      "Treinado no tom da clínica",
      "Integra com Google Agenda",
      "AutomatIA | Clínicas",
    ],
    descricoes: [
      "Agente de IA que agenda, confirma e remarca consultas no WhatsApp, direto na sua agenda.",
      "Paciente atendido em segundos, a qualquer hora. A recepção cuida de quem está na clínica.",
      "Conversa gratuita de 30 min: mapeamos seu atendimento e mostramos o que automatizar.",
      "Preço e prazo fechados antes de começar. Fale direto com quem constrói o agente.",
    ],
  },
];

/** Negativas de campanha (correspondência de frase): quem quer aprender, fazer sozinho ou um emprego. */
export const negativas = [
  // grátis / faça você mesmo
  "grátis", "gratis", "gratuito", "free", "como fazer", "como criar", "passo a passo",
  "tutorial", "curso", "cursos", "aula", "aprender", "apostila", "pdf", "livro",
  "modelo", "modelos", "template", "templates", "exemplo", "exemplos", "o que é", "significado",
  // emprego / estudo
  "vaga", "vagas", "emprego", "estágio", "salário", "trabalhar com", "faculdade", "tcc",
  // ferramentas prontas (quem procura o nome quer a ferramenta, não um projeto)
  "chatgpt", "manychat", "botconversa", "blip", "zenvia", "wix", "wordpress", "elementor", "canva",
  // irrelevantes
  "download", "baixar", "apk", "login", "github", "open source", "whatsapp web", "gb whatsapp",
  "clonar", "espionar", "hackear",
  // armadilhas das palavras gerais: "automação" também é elétrica/industrial/caixa de loja,
  // e "site" atrai quem quer hospedagem, plataforma pronta ou o mais barato possível
  "residencial", "industrial", "clp", "automação comercial", "portão", "iluminação",
  "hospedagem", "domínio", "google sites", "barato", "barata", "99freelas", "workana",
];

export const sitelinks = [
  { texto: "Agentes de IA", linha1: "Atendimento 24/7 no WhatsApp", linha2: "Responde, qualifica e agenda", ancora: "#agentes" },
  { texto: "Projetos no ar", linha1: "Abra e confira os cases", linha2: "Varejo e representação", ancora: "#cases" },
  { texto: "Como trabalhamos", linha1: "4 etapas, escopo fechado", linha2: "Entregas semanais", ancora: "#metodo" },
  { texto: "Para quem é", linha1: "Clínicas, varejo e serviços", linha2: "Indústria e distribuição", ancora: "#para-quem" },
  { texto: "Perguntas frequentes", linha1: "Preço, prazo e suporte", linha2: "Tudo antes de você perguntar", ancora: "#faq" },
];

export const frasesDeDestaque = [
  "Diagnóstico gratuito",
  "Preço e prazo fechados",
  "Entregas semanais",
  "Suporte pós-entrega",
  "Atendimento 24/7",
  "Sem cobrança por hora",
  "Sem intermediários",
];

export const snippetServicos = [
  "Agentes de IA",
  "Automações com IA",
  "Sistemas sob medida",
  "Landing pages",
  "Integrações e APIs",
  "Dashboards e BI",
  "Consultoria de IA",
];

// ---------------------------------------------------------------------------
// Conferência dos limites do Google Ads

const erros = [];
function limite(onde, texto, max) {
  if ([...texto].length > max) erros.push(`${onde}: "${texto}" tem ${[...texto].length} caracteres (máx. ${max})`);
}

for (const g of grupos) {
  const titulos = [...g.titulos, ...comuns.titulos];
  if (titulos.length !== 15) erros.push(`${g.nome}: ${titulos.length} títulos (precisa de 15)`);
  if (new Set(titulos).size !== titulos.length) erros.push(`${g.nome}: título repetido`);
  if (g.descricoes.length !== 4) erros.push(`${g.nome}: ${g.descricoes.length} descrições (precisa de 4)`);
  titulos.forEach((t) => {
    limite(`${g.nome} / título`, t, 30);
    if (t.includes("!")) erros.push(`${g.nome}: título com "!" é reprovado: "${t}"`);
  });
  g.descricoes.forEach((d) => limite(`${g.nome} / descrição`, d, 90));
  g.caminho.forEach((c) => limite(`${g.nome} / caminho`, c, 15));
  g.exatas.forEach((e) => {
    if (!g.palavras.includes(e)) erros.push(`${g.nome}: exata "${e}" não está na lista de palavras`);
  });
}
for (const s of sitelinks) {
  limite("sitelink", s.texto, 25);
  limite("sitelink / linha 1", s.linha1, 35);
  limite("sitelink / linha 2", s.linha2, 35);
}
frasesDeDestaque.forEach((f) => limite("frase de destaque", f, 25));
snippetServicos.forEach((s) => limite("snippet", s, 25));

if (erros.length) {
  console.error(erros.join("\n"));
  process.exit(1);
}

// ---------------------------------------------------------------------------
// CSVs para o Google Ads Editor (Conta > Importar > De arquivo)

const csv = (linhas) =>
  linhas.map((l) => l.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")).join("\n") + "\n";

const pasta = join(dirname(fileURLToPath(import.meta.url)), "editor");
mkdirSync(pasta, { recursive: true });

writeFileSync(
  join(pasta, "1-campanha.csv"),
  csv([
    ["Campaign", "Campaign Type", "Networks", "Budget", "Budget type", "Bid Strategy Type", "Languages", "Campaign Status"],
    [campanha.nome, "Search", "Google search", campanha.orcamentoDiario, "Daily", "Maximize clicks", "pt", "Paused"],
  ]),
);

writeFileSync(
  join(pasta, "2-grupos.csv"),
  csv([
    ["Campaign", "Ad Group", "Max CPC", "Ad Group Status"],
    ...grupos.map((g) => [campanha.nome, g.nome, campanha.cpcMaximo, g.ativo ? "Enabled" : "Paused"]),
  ]),
);

writeFileSync(
  join(pasta, "3-palavras-chave.csv"),
  csv([
    ["Campaign", "Ad Group", "Keyword", "Criterion Type", "Final URL"],
    ...grupos.flatMap((g) => [
      ...g.palavras.map((p) => [campanha.nome, g.nome, p, "Phrase", SITE]),
      ...g.exatas.map((p) => [campanha.nome, g.nome, p, "Exact", SITE]),
    ]),
    ...negativas.map((n) => [campanha.nome, "", n, "Negative Phrase", ""]),
  ]),
);

const cabecalhoAnuncio = [
  "Campaign", "Ad Group", "Ad type",
  ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`),
  "Path 1", "Path 2", "Final URL", "Status",
];
writeFileSync(
  join(pasta, "4-anuncios.csv"),
  csv([
    cabecalhoAnuncio,
    ...grupos.map((g) => [
      campanha.nome, g.nome, "Responsive search ad",
      ...g.titulos, ...comuns.titulos,
      ...g.descricoes,
      ...g.caminho, SITE, "Enabled",
    ]),
  ]),
);

const ativos = grupos.filter((g) => g.ativo);
const total = ativos.reduce((n, g) => n + g.palavras.length + g.exatas.length, 0);
console.log(
  `OK: ${ativos.length} grupos ativos (${grupos.length - ativos.length} pausados), ${total} palavras-chave ativas, ` +
    `${negativas.length} negativas, R$ ${campanha.orcamentoDiario}/dia. CSVs em ${pasta}`,
);
