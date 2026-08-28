/**
 * Todo o conteúdo em texto da landing page.
 * Para trocar copy, mexa SÓ neste arquivo.
 */

export const contato = {
  email: "automatiabr@gmail.com",
  emailHref: "mailto:automatiabr@gmail.com",
  instagram: "https://www.instagram.com/_automatia/",
  handle: "@_automatia",
};

export const navLinks = [
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Método", href: "#metodo" },
  { rotulo: "Agentes de IA", href: "#agentes" },
];

/** Menu cinético em tela cheia */
export const menuLinks = [
  { n: "01", rotulo: "Serviços", href: "#servicos" },
  { n: "02", rotulo: "Automações com IA", href: "#agentes" },
  { n: "03", rotulo: "Método", href: "#metodo" },
  { n: "04", rotulo: "Falar com a gente", href: "#contato" },
];

export const hero = {
  kicker: "TECNOLOGIA · IA APLICADA · SOFTWARE SOB MEDIDA",
  linhas: ["Software que", "trabalha enquanto"],
  linhaDestaque: "você dorme.",
  subtitulo:
    "Construímos aplicações escaláveis, sistemas sob medida e automações com inteligência artificial que assumem o trabalho repetitivo da sua operação — e continuam rodando depois que a gente sai da sala.",
  ctaPrimario: "Quero um diagnóstico gratuito",
  ctaSecundario: "Ver o que fazemos",
};

export const stats = [
  { valor: 9, sufixo: "", rotulo: "FRENTES DE ATUAÇÃO" },
  { valor: 24, sufixo: "/7", rotulo: "OPERAÇÃO DOS AGENTES" },
  { valor: 30, sufixo: "s", rotulo: "RESPOSTA AO LEAD" },
  { valor: 2, sufixo: " sem", rotulo: "ATÉ O 1º ENTREGÁVEL" },
];

export const servicos = {
  kicker: "01 — O QUE FAZEMOS",
  titulo: ["Nove frentes.", "Um objetivo: escala."],
  intro:
    "Da landing page que converte ao sistema que sustenta a operação inteira. Você contrata o resultado, não a tecnologia — a escolha da stack é problema nosso.",
  itens: [
    { n: "01", nome: "Aplicações escaláveis", desc: "Arquitetura que aguenta crescer: dez ou dez mil usuários, mesma resposta.", imagem: "/services/01.svg" },
    { n: "02", nome: "Automações com IA", desc: "O trabalho repetitivo sai da mão do time e passa a rodar sozinho, com registro de tudo.", imagem: "/services/02.svg" },
    { n: "03", nome: "Agentes de IA e chatbots", desc: "Atendimento e qualificação de lead 24/7, treinados no seu produto e no seu tom.", imagem: "/services/03.svg" },
    { n: "04", nome: "Landing pages de alta conversão", desc: "Estrutura e copy desenhadas para vender, não para ganhar prêmio de design.", imagem: "/services/04.svg" },
    { n: "05", nome: "Sistemas sob medida", desc: "Quando nenhum SaaS encaixa: o software se molda ao seu processo, não o contrário.", imagem: "/services/05.svg" },
    { n: "06", nome: "Integrações e APIs", desc: "ERP, CRM, WhatsApp, pagamentos e planilhas conversando sem ninguém no meio.", imagem: "/services/06.svg" },
    { n: "07", nome: "Dashboards e BI", desc: "Um número por decisão, atualizado em tempo real — fim do relatório de sexta à noite.", imagem: "/services/07.svg" },
    { n: "08", nome: "Consultoria de IA", desc: "Onde a IA dá retorno no seu negócio e onde é só custo. Dizemos os dois.", imagem: "/services/08.svg" },
    { n: "09", nome: "Manutenção e sustentação", desc: "Monitoramos, corrigimos e evoluímos o que está no ar. Sem abandono pós-entrega.", imagem: "/services/09.svg" },
  ],
};

export const antesDepois = {
  kicker: "02 — AUTOMAÇÕES COM IA",
  titulo: "Se um humano repete a mesma tarefa duas vezes, uma IA já deveria estar fazendo.",
  antes: [
    "Planilha atualizada à mão",
    "Orçamento sai em 2 dias",
    "Lead esfria no WhatsApp",
    "Relatório na sexta à noite",
    "Erro humano que volta sempre",
  ],
  depois: [
    "Dados sincronizados em tempo real",
    "Orçamento sai em 2 minutos",
    "Resposta em 30 segundos, 24/7",
    "Relatório pronto todo dia 1º",
    "Regra escrita uma vez, cumprida sempre",
  ],
};

export const agentes = {
  kicker: "03 — AGENTES DE IA",
  titulo: "Seu comercial dorme. Nosso agente não.",
  texto:
    "Um agente treinado no seu negócio atende no WhatsApp, no site e no Instagram: responde, qualifica, cobra o retorno e joga a reunião direto na agenda do time.",
  numeros: [
    { valor: "30s", rotulo: "TEMPO DE RESPOSTA" },
    { valor: "24/7", rotulo: "SEM ESCALA, SEM FÉRIAS" },
    { valor: "0", rotulo: "LEAD ESQUECIDO" },
  ],
  chat: [
    { texto: "Oi! Vi que vocês fazem automação. Consigo tirar orçamento hoje?", de: "cliente" as const },
    { texto: "Consegue. Me diz duas coisas: qual processo trava mais hoje e quantas pessoas mexem nele?", de: "agente" as const },
    { texto: "Orçamento. Três pessoas, tudo em planilha.", de: "cliente" as const },
    { texto: "Dá para automatizar. Reservei quinta às 15h com um especialista — confirma?", de: "agente" as const },
    { texto: "Confirmo!", de: "cliente" as const },
  ],
};

export const metodo = {
  kicker: "04 — COMO TRABALHAMOS",
  titulo: "Quatro etapas. Zero surpresa na fatura.",
  etapas: [
    { n: "ETAPA 01", titulo: "DIAGNÓSTICO", texto: "Mapeamos o processo com quem executa e apontamos onde o tempo e o dinheiro estão vazando." },
    { n: "ETAPA 02", titulo: "ESCOPO FECHADO", texto: "Preço, prazo e entregas no papel antes da primeira linha de código. O que mudar depois, você aprova antes." },
    { n: "ETAPA 03", titulo: "CONSTRUÇÃO", texto: "Entregas semanais funcionando de verdade, em ambiente real — não slides de status." },
    { n: "ETAPA 04", titulo: "OPERAÇÃO", texto: "Monitoramos, ajustamos e escalamos junto com a sua demanda. O sistema continua vivo." },
  ],
};

export const cta = {
  kicker: "VAGAS DE PROJETO ABERTAS",
  titulo: "Traga o processo que mais te trava.",
  texto:
    "Uma conversa de 30 minutos, sem custo: mapeamos onde o tempo está vazando e dizemos o que dá para automatizar primeiro — mesmo que não seja com a gente.",
};
