/**
 * Todo o conteúdo em texto da landing page.
 * Para trocar copy, mexa SÓ neste arquivo.
 */

/** URL canônica do site em produção (sem barra no final). */
export const siteUrl = "https://www.automatia.company";

/** ID de métricas do Google Analytics 4 (público: aparece no HTML de qualquer forma). */
export const gaId = "G-ZK74CTXMD0";

/** O wa.me exige o número em E.164, sem "+" nem pontuação. */
const whatsappNumero = "5583920036170";
/** Mensagem que já chega digitada na conversa — o mesmo pedido do CTA principal. */
const whatsappTexto = "Olá! Vim pelo site e quero um diagnóstico gratuito.";

/** Link do WhatsApp com uma mensagem própria já digitada. */
export const whatsappCom = (texto: string) =>
  `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(texto)}`;

/** Página de orçamento; `origem` diz qual botão trouxe a pessoa (vai para o GA). */
export const orcamentoHref = (origem: string, segmento?: string) =>
  `/orcamento?${new URLSearchParams(segmento ? { origem, segmento } : { origem })}`;

export const contato = {
  email: "automatiabr@gmail.com",
  emailHref: "mailto:automatiabr@gmail.com",
  telefone: "(83) 92003-6170",
  whatsapp: whatsappCom(whatsappTexto),
  instagram: "https://www.instagram.com/_automatia/",
  handle: "@_automatia",
};

export const navLinks = [
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Cases", href: "#cases" },
  { rotulo: "Método", href: "#metodo" },
  { rotulo: "Agentes de IA", href: "#agentes" },
];

/** Menu cinético em tela cheia */
export const menuLinks = [
  { n: "01", rotulo: "Serviços", href: "#servicos" },
  { n: "02", rotulo: "Cases", href: "#cases" },
  { n: "03", rotulo: "Automações com IA", href: "#agentes" },
  { n: "04", rotulo: "Método", href: "#metodo" },
  { n: "05", rotulo: "Falar com a gente", href: "#contato" },
];

export const hero = {
  kicker: "TECNOLOGIA · IA APLICADA · SOFTWARE SOB MEDIDA",
  linhas: ["Software que", "trabalha enquanto"],
  linhaDestaque: "você dorme.",
};


export const servicos = {
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

/** Faixa logo abaixo do herói. Mantenha só ferramentas com que vocês já trabalharam de verdade. */
export const integracoes = {
  rotulo: "Integramos com o que você já usa",
  // proporcao = largura / altura do desenho (os SVGs em public/logos já estão recortados sem margem)
  itens: [
    { nome: "WhatsApp Business", logo: "/logos/whatsapp.svg", proporcao: 4.04 },
    { nome: "OpenAI", logo: "/logos/openai.svg", proporcao: 3.52 },
    { nome: "Google Sheets", logo: "/logos/google-sheets.svg", proporcao: 0.73 },
    { nome: "Instagram", logo: "/logos/instagram.svg", proporcao: 3.36 },
    { nome: "Mercado Pago", logo: "/logos/mercado-pago.svg", proporcao: 3.63 },
    { nome: "Stripe", logo: "/logos/stripe.svg", proporcao: 2.34 },
    { nome: "HubSpot", logo: "/logos/hubspot.svg", proporcao: 3.36 },
    { nome: "RD Station", logo: "/logos/rd-station.svg", proporcao: 4.18 },
    { nome: "Bling", logo: "/logos/bling.svg", proporcao: 2.02 },
    { nome: "Omie", logo: "/logos/omie.webp", proporcao: 2.91 },
    { nome: "Google Agenda", logo: "/logos/google-agenda.svg", proporcao: 1 },
    { nome: "Notion", logo: "/logos/notion.svg", proporcao: 0.96 },
  ],
};

export const segmentos = {
  titulo: "Feito para operações que já cansaram do improviso.",
  intro: "Se o seu negócio se parece com algum destes, a gente já sabe por onde começar.",
  dorRotulo: "Hoje",
  entregaRotulo: "Com a AutomatIA",
  cta: "Falar sobre o meu caso",
  itens: [
    {
      nome: "Clínicas e consultórios",
      dor: "Agenda pelo WhatsApp, paciente que falta e recepção sobrecarregada.",
      entrega: "Agente que agenda, confirma e remarca sozinho, direto na sua agenda.",
    },
    {
      nome: "E-commerce e varejo",
      dor: "Atendimento repetitivo, pedido digitado à mão e estoque desencontrado.",
      entrega: "Atendimento 24/7 e pedidos sincronizados entre loja, ERP e marketplace.",
    },
    {
      nome: "Prestadores de serviço",
      dor: "Orçamento demora dias e o lead esfria antes de ver a proposta.",
      entrega: "Qualificação automática e orçamento em minutos, registrado no CRM.",
    },
    {
      nome: "Indústria e distribuição",
      dor: "Planilhas paralelas, relatório manual e número em que ninguém confia.",
      entrega: "Sistema sob medida e dashboards em tempo real ligados ao ERP.",
    },
  ],
};

/**
 * Cases reais, com link para o projeto no ar.
 * Prints em /public/cases/ (desktop 1440x900 e celular 390x844).
 * `depoimento` é opcional: deixe `texto` vazio e o bloco some.
 * Com `rascunho: true` a seção só aparece em desenvolvimento.
 */
export const cases = {
  rascunho: false,
  titulo: "Projetos no ar. Abra e confira.",
  intro: "Nada de mockup: os dois estão funcionando agora, com cliente de verdade usando.",
  problemaRotulo: "O desafio",
  solucaoRotulo: "O que construímos",
  linkRotulo: "Ver o site no ar",
  itens: [
    {
      cliente: "Roots Tabacaria",
      segmento: "Varejo",
      local: "Recife · PE",
      problema:
        "A lista de produtos era mandada à mão pelo WhatsApp, cliente por cliente — sempre desatualizada e trabalhosa de manter.",
      solucao:
        "Vitrine mobile-first sempre atualizada: o cliente monta o carrinho e o pedido chega pronto no WhatsApp. A loja troca produtos e preços sozinha, por um painel próprio.",
      entregas: ["Catálogo mobile-first", "Pedido direto no WhatsApp", "Monte seu kit", "Painel administrativo"],
      destaque: { valor: "0", rotulo: "cadastros para fazer um pedido" },
      url: "https://tabacaria-roots.vercel.app",
      dominio: "tabacaria-roots.vercel.app",
      imagem: { desktop: "/cases/roots-desktop.jpg", mobile: "/cases/roots-mobile.jpg" },
      depoimento: { texto: "", autor: "", cargo: "", foto: "" },
    },
    {
      cliente: "Rogério Dias · Grupo PBMED",
      segmento: "Representação comercial",
      local: "João Pessoa · PB",
      problema:
        "Um representante com 15 laboratórios precisava de um único link para apresentar portfólio, trajetória e catálogos a farmácias, clínicas e hospitais.",
      solucao:
        "Site de uma página com os laboratórios em painéis, catálogos em PDF que abrem direto do Google Drive e contato pelo WhatsApp. Catálogo novo entra sem mexer em código.",
      entregas: ["Site one-page", "Catálogos em PDF", "Contato via WhatsApp", "Atualização sem programador"],
      destaque: { valor: "15", rotulo: "laboratórios em um só link" },
      url: "https://www.rogerioferreiradias.com",
      dominio: "rogerioferreiradias.com",
      imagem: { desktop: "/cases/rogerio-desktop.jpg", mobile: "/cases/rogerio-mobile.jpg" },
      depoimento: { texto: "", autor: "", cargo: "", foto: "" },
    },
  ],
};

/**
 * Equipe. Mesma regra dos cases: com `rascunho: true` só aparece em desenvolvimento.
 * Fotos em /public/equipe/ (proporção 3:4, como sai do celular); sem foto, mostra as iniciais.
 */
export const equipe = {
  rascunho: false,
  titulo: "Gente de verdade do outro lado da tela.",
  texto: "Você fala direto com quem desenha e constrói o seu projeto — sem repasse, sem intermediário.",
  pessoas: [
    {
      nome: "Pedro Santos",
      cargo: "Engenheiro de Software · Web Designer",
      bio: "Desenha e constrói os sites, sistemas e automações — do primeiro rascunho ao que fica no ar.",
      foto: "/equipe/pedro.jpg",
    },
    {
      nome: "Maria Luiza",
      cargo: "Internacionalista · Administradora",
      bio: "Especialista em MEX e administradora: cuida do diagnóstico, do escopo e de quem está do outro lado.",
      foto: "/equipe/maria-luiza.jpg",
    },
  ],
};

export const antesDepois = {
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
  titulo: "Seu comercial dorme. Nosso agente não.",
  texto:
    "Um agente treinado no seu negócio atende no WhatsApp, no site e no Instagram: responde, qualifica, cobra o retorno e joga a reunião direto na agenda do time.",
  numeros: [
    { valor: "30s", rotulo: "tempo de resposta" },
    { valor: "24/7", rotulo: "sem escala, sem férias" },
    { valor: "0", rotulo: "lead esquecido" },
  ],
  cta: "Quero um agente assim",
  chat: [
    { texto: "Oi! Vi que vocês fazem automação. Consigo tirar orçamento hoje?", de: "cliente" as const },
    { texto: "Consegue. Me diz duas coisas: qual processo trava mais hoje e quantas pessoas mexem nele?", de: "agente" as const },
    { texto: "Orçamento. Três pessoas, tudo em planilha.", de: "cliente" as const },
    { texto: "Dá para automatizar. Reservei quinta às 15h com um especialista — confirma?", de: "agente" as const },
    { texto: "Confirmo!", de: "cliente" as const },
  ],
};

export const metodo = {
  titulo: "Quatro etapas. Zero surpresa na fatura.",
  etapas: [
    { n: "01", titulo: "Diagnóstico", texto: "Mapeamos o processo com quem executa e apontamos onde o tempo e o dinheiro estão vazando." },
    { n: "02", titulo: "Escopo fechado", texto: "Preço, prazo e entregas no papel antes da primeira linha de código. O que mudar depois, você aprova antes." },
    { n: "03", titulo: "Construção", texto: "Entregas semanais funcionando de verdade, em ambiente real — não slides de status." },
    { n: "04", titulo: "Operação", texto: "Monitoramos, ajustamos e escalamos junto com a sua demanda. O sistema continua vivo." },
  ],
  cta: "Começar pela etapa 01 — é gratuita",
};

export const faq = {
  titulo: "Antes de você perguntar.",
  itens: [
    {
      p: "Quanto custa um projeto?",
      r: "Depende do tamanho do processo, por isso o diagnóstico vem primeiro e é gratuito. Você sai dele com preço e prazo fechados no papel — sem cobrança por hora e sem surpresa na fatura.",
    },
    {
      p: "Em quanto tempo vejo resultado?",
      r: "O primeiro entregável funcionando chega em até 2 semanas. Depois disso, entregas semanais em ambiente real, para você acompanhar o avanço usando, não lendo relatório.",
    },
    {
      p: "Preciso entender de tecnologia?",
      r: "Não. Você explica como o processo funciona hoje; a escolha de ferramentas, arquitetura e integrações é responsabilidade nossa.",
    },
    {
      p: "Funciona com os sistemas que já uso?",
      r: "Na maioria dos casos, sim. Integramos ERP, CRM, WhatsApp, meios de pagamento e planilhas — a ideia é aproveitar o que já roda, não trocar tudo.",
    },
    {
      p: "E depois que o projeto termina?",
      r: "Seguimos monitorando, corrigindo e evoluindo o que está no ar. Nada de entregar e sumir.",
    },
  ],
};

export const cta = {
  titulo: "Traga o processo que mais te trava.",
  texto:
    "Uma conversa de 30 minutos, sem custo: mapeamos onde o tempo está vazando e dizemos o que dá para automatizar primeiro — mesmo que não seja com a gente.",
};

export const rodape = {
  frase: "Software que trabalha enquanto você dorme.",
  status: "Vagas de projeto abertas",
  navegueRotulo: "Navegue",
  links: [
    { rotulo: "Serviços", href: "#servicos" },
    { rotulo: "Para quem é", href: "#para-quem" },
    { rotulo: "Cases", href: "#cases" },
    { rotulo: "Método", href: "#metodo" },
    { rotulo: "Equipe", href: "#equipe" },
    { rotulo: "Perguntas frequentes", href: "#faq" },
  ],
  contatoRotulo: "Contato",
  comeceRotulo: "Comece agora",
  comeceTexto: "Diagnóstico gratuito de 30 minutos, sem compromisso.",
  comeceCta: "Pedir orçamento",
  topo: "Voltar ao topo",
  direitos: "Todos os direitos reservados",
};

/** Página /orcamento: o formulário que monta a mensagem e abre o WhatsApp */
export const orcamento = {
  kicker: "Orçamento · diagnóstico gratuito",
  titulo: "Conte o que você precisa.",
  destaque: "A conversa começa no WhatsApp.",
  texto:
    "Leva menos de um minuto. Suas respostas já chegam escritas na mensagem, então ninguém precisa te perguntar tudo de novo.",
  passos: [
    { n: "01", texto: "Você preenche o essencial aqui." },
    { n: "02", texto: "O WhatsApp abre com a mensagem pronta — é só enviar." },
    { n: "03", texto: "Respondemos com os próximos passos e marcamos o diagnóstico." },
  ],
  campos: {
    nome: "Seu nome",
    empresa: "Empresa",
    opcional: "opcional",
    segmento: "Seu negócio é",
    servico: "O que você precisa?",
    prazo: "Para quando?",
    descricao: "O que você quer resolver?",
    descricaoExemplo: "Ex.: hoje os orçamentos saem de uma planilha e levam 2 dias para chegar ao cliente.",
  },
  outroSegmento: "Outro",
  naoSei: "Ainda não sei",
  prazos: ["O quanto antes", "Em até 1 mês", "Em 1 a 3 meses", "Só pesquisando"],
  enviar: "Enviar pelo WhatsApp",
  privacidade: "Nada fica salvo neste site: suas respostas vão só na mensagem do WhatsApp.",
  mensagemAbertura: "Olá! Vim pelo site e quero um orçamento.",
  sucessoKicker: "Mensagem pronta",
  sucessoTitulo: "Agora é só enviar no WhatsApp.",
  sucessoTexto: "Abrimos a conversa com as suas respostas já escritas. Se ela não abriu, use o botão abaixo.",
  sucessoCta: "Abrir o WhatsApp",
  corrigir: "Corrigir respostas",
  voltar: "Voltar ao site",
};

/** Página 404 — rotas que não existem */
export const naoEncontrada = {
  codigo: "404",
  linhas: ["Essa página"],
  linhaDestaque: "não existe.",
  texto:
    "O endereço pode ter mudado de lugar ou nunca ter existido. O resto do site continua rodando normalmente — os agentes inclusive.",
  ctaPrimario: "Voltar para o início",
  ctaSecundario: "Falar com a gente",
  atalhos: "Ou vá direto para",
};
