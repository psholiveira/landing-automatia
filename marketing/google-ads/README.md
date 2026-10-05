# Campanha Google Ads — AutomatIA

Campanha de **Pesquisa** para gerar conversas no WhatsApp (o diagnóstico gratuito de 30 min).
Todo o texto está em [`campanha.mjs`](campanha.mjs); os CSVs em [`editor/`](editor/) saem dele:

```bash
node marketing/google-ads/campanha.mjs   # confere os limites do Google Ads e regenera os CSVs
```

## Estratégia

| Item | Escolha | Por quê |
| --- | --- | --- |
| Tipo | Pesquisa (só Rede de Pesquisa do Google) | Pega quem já está procurando a solução. Display, Parceiros de Pesquisa e Performance Max queimam verba pequena com tráfego frio. |
| Objetivo | Leads → clique no WhatsApp | É a única conversão do site. |
| Orçamento | **R$ 100/semana → R$ 14/dia** (~R$ 430/mês) | O Google só aceita orçamento diário. Em alguns dias ele gasta até o dobro, mas compensa nos outros: no mês, nunca passa de 30,4 × R$ 14. |
| Foco | **5 grupos ativos**, um por serviço | O orçamento é da campanha, não de cada grupo: o Google gasta onde aparecem buscas. Grupos separados servem para o anúncio repetir o que a pessoa buscou. O risco é um serviço de busca barata e volumosa (sites) engolir a verba — ver a rotina abaixo. |
| Lances | **Maximizar cliques** com CPC máx. de **R$ 3** | Acima disso, um clique come 1/5 do dia. Com esse volume é difícil chegar às ~15 conversões/mês que o "Maximizar conversões" precisa — só troque se chegar lá. |
| Local | **Paraíba e Pernambuco**, opção **"Presença"** (pessoas *no* local, não "interessadas") | Orçamento pequeno pede área pequena: CPC menor que em SP, e é onde estão os cases (João Pessoa e Recife) e o DDD 83. Expanda para o Nordeste quando sobrar verba. |
| Idioma | Português | |
| Horário | Seg–sex 8h–19h | Concentra a pouca verba no horário comercial, quando quem decide está procurando e alguém responde o WhatsApp na hora. |
| Correspondência | Frase + exata nas principais | Nada de correspondência ampla: com verba pequena, ela gasta tudo em buscas tortas. |

### Grupos de anúncios

| Grupo | Status | Exemplos de palavras-chave | Ticket / intenção |
| --- | --- | --- | --- |
| Chatbot WhatsApp e Agentes de IA | Ativo | chatbot para whatsapp, agente de ia para atendimento | Carro-chefe do site |
| Clínicas e Consultórios | Ativo | chatbot para clínica, agendamento automático whatsapp | Nicho com dor clara, intenção alta e menos concorrência |
| Sites e Landing Pages | Ativo | criação de sites para empresas, site para empresa, criação de landing page | Muito volume e muito curioso: o mais provável de engolir a verba |
| Automação para Empresas | Ativo | automação para empresas, automação de processos, empresa de automação | "Automação" sozinha também é elétrica/industrial — as negativas cuidam disso |
| Sistemas e Software Sob Medida | Ativo | desenvolvimento de sistemas, sistema para empresa, empresa de software | Alto ticket, CPC mais caro |

Cada grupo tem 1 anúncio responsivo com 15 títulos e 4 descrições. Três títulos são comuns a
todos: *Diagnóstico gratuito de 30 min*, *Preço e prazo fechados*, *Fale com quem constrói*.
São 64 negativas de campanha (grátis, curso, como fazer, vaga, chatgpt, wix…), todas em `campanha.mjs`.
As palavras gerais trazem armadilhas próprias, também negativadas: *automação residencial/industrial/comercial*
(CLP, portão, caixa de loja) e, em sites, quem quer *hospedagem*, *domínio*, *Google Sites* ou o mais *barato*.

## Passo a passo

### 1. Conversão (faça ANTES de ligar a campanha)

O site já manda o evento `clique_whatsapp` para o GA4 (`G-ZK74CTXMD0`) em todo botão de WhatsApp.

1. **GA4 → Administrador → Eventos**: marque `clique_whatsapp` como **evento principal** (key event).
   O evento só aparece na lista depois de ter acontecido pelo menos uma vez — clique num botão do site (aceitando os cookies) e espere algumas horas.
2. **GA4 → Administrador → Vinculações de produtos → Google Ads**: vincule a conta.
3. **Google Ads → Metas → Conversões → Nova ação → Importar → Google Analytics 4**: importe `clique_whatsapp`.
   - Nome: `Lead - WhatsApp` · Categoria: Contato · Contagem: **Uma** · Meta principal.
4. **Google Ads → Configurações da conta**: deixe a **codificação automática** (auto-tagging) ligada.

> **Atenção:** o GA4 só carrega depois que a pessoa aceita o banner de cookies (LGPD). Quem recusa
> ou ignora o banner **não vira conversão** no Google Ads. Espere ver menos conversões do que
> conversas reais no WhatsApp — por isso o controle manual do item 5 abaixo é importante.

### 2. Importar no Google Ads Editor

1. Instale o [Google Ads Editor](https://ads.google.com/intl/pt-BR_br/home/tools/ads-editor/) e baixe a conta.
2. **Conta → Importar → De arquivo**, nesta ordem: `1-campanha.csv`, `2-grupos.csv`,
   `3-palavras-chave.csv`, `4-anuncios.csv`. Revise cada importação antes de aceitar.
3. Na campanha, ajuste o que o CSV não cobre: **local** (Paraíba e Pernambuco, "Presença"), **programação de horário** (seg–sex 8h–19h)
   e desmarque **Parceiros de Pesquisa** e **Rede de Display** se aparecerem marcados.
4. Publique. A campanha entra **pausada** de propósito — ative só depois de conferir tudo.

Sem o Editor, dá para criar tudo pela interface web copiando os textos de `campanha.mjs`.

### 3. Recursos (extensões)

Crie no nível da campanha (os textos já estão validados em `campanha.mjs`):

- **Sitelinks**: Agentes de IA, Projetos no ar, Como trabalhamos, Para quem é, Perguntas frequentes —
  cada um aponta para a âncora da seção (`https://www.automatia.company/#agentes` etc.).
  Como o site é de uma página só, o Google pode reprovar sitelinks por "mesmo destino"; se acontecer, fique com os aprovados.
- **Frases de destaque**: Diagnóstico gratuito · Preço e prazo fechados · Entregas semanais ·
  Suporte pós-entrega · Atendimento 24/7 · Sem cobrança por hora · Sem intermediários.
- **Snippet estruturado** (cabeçalho *Serviços*): Agentes de IA, Automações com IA, Sistemas sob medida,
  Landing pages, Integrações e APIs, Dashboards e BI, Consultoria de IA.
- **Mensagem/WhatsApp**: se a conta oferecer o recurso de mensagem com WhatsApp, use o número (83) 92003-6170.
- **Logotipo e nome da empresa**: `public/logo.png` e "AutomatIA" (exige verificação do anunciante).

### 4. Antes de ativar — checklist

- [ ] Conversão `Lead - WhatsApp` importada e marcada como principal
- [ ] Faturamento configurado e verificação do anunciante iniciada
- [ ] Orçamento R$ 14/dia, CPC máx. R$ 3, os 5 grupos ativos
- [ ] Local Paraíba + Pernambuco ("Presença"), só Rede de Pesquisa, idioma português
- [ ] Revisar as promessas usadas nos anúncios: "1ª entrega em até 2 semanas", "Resposta em 30 segundos", "Orçamento em 2 minutos" (o README do site já pede essa revisão)
- [ ] Alguém pronto para responder o WhatsApp rápido nos horários da campanha

### 5. Rotina de otimização

| Quando | O quê |
| --- | --- |
| Dias 1–14, a cada 2–3 dias | **Termos de pesquisa**: negativar tudo que não é cliente (estudante, DIY, ferramenta grátis). Com R$ 14/dia, cada clique errado pesa — é o que mais economiza verba. |
| Semanal | Anotar numa planilha as conversas do WhatsApp que vieram do Google (pergunte "como nos achou?"), quantas viraram reunião e quantas fecharam. Comparar com os R$ 100 da semana. |
| Toda semana | Em **Grupos de anúncios**, veja a coluna Custo. Se um grupo levar mais da metade da verba sem trazer conversa (o suspeito é "Sites e Landing Pages"), pause as palavras mais genéricas dele ou o grupo inteiro. |
| Semana 4–6 | Palavra-chave com 30+ cliques e nenhuma conversa: pausar. Grupo sem nenhuma conversa: pausar e deixar a verba para os que trazem. |
| Se a verba não gastar | Se a campanha gastar bem menos que R$ 14/dia (pouca busca em PB/PE), expanda o local para o Nordeste antes de mexer no CPC. |
| Orçamento crescer | Separar o grupo que mais converte numa campanha própria, com orçamento só dele. |
| Mensal | Ver os recursos com desempenho "Baixo" nos anúncios e trocar esses títulos. |

**Expectativa honesta:** com ~R$ 430/mês e CPC de R$ 2 a R$ 3 (confira no Planejador de
Palavras-chave antes de ativar), são algo como 140–215 cliques e, se a página converter 3–8%,
de 4 a 17 conversas por mês. É pouco dado para conclusões rápidas: dê 6 semanas antes de
julgar, e avalie pelo custo por *reunião*, não por clique. Com tão pouco tráfego, cada visita
conta — por isso o botão de WhatsApp no topo do site (abaixo) pesa ainda mais.

## O que melhorar no site para a campanha render

1. **Botão de WhatsApp na primeira dobra.** Hoje o herói não tem botão; o primeiro WhatsApp
   aparece só na seção "Para quem é", depois de serviços e integrações. Quem chega de anúncio
   decide nos primeiros segundos — esse é o ajuste com mais impacto.
2. **Páginas por tema** (`/chatbot-whatsapp`, `/clinicas`, `/landing-page`…). Com o anúncio caindo
   numa página que repete a busca, o Índice de Qualidade sobe e o CPC cai. Também resolve o
   problema dos sitelinks de uma página só.
3. **Saber quais conversas vieram do anúncio**: quando a URL tem `gclid`, a mensagem pronta do
   WhatsApp pode ganhar um marcador discreto (ex.: "Vim pelo Google"). Funciona mesmo para quem
   recusa os cookies.
4. **Consent Mode v2 (avançado)**: manda sinais sem cookies para o Google modelar as conversões
   de quem recusou o banner. É uma decisão de privacidade/LGPD — avalie antes de ligar.
