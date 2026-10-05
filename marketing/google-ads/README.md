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
| Orçamento | R$ 50/dia (~R$ 1.500/mês) | Suficiente para 5 grupos aprenderem em 30 dias. Abaixo de R$ 30/dia, corte para 2–3 grupos. |
| Lances | **Maximizar cliques** com CPC máx. de R$ 6 nas 3–4 primeiras semanas → **Maximizar conversões** quando passar de ~15 conversões em 30 dias | Sem histórico de conversão, o lance automático por conversão fica às cegas. |
| Local | Brasil, opção **"Presença"** (pessoas *no* local, não "interessadas") | O serviço é remoto. Se o CPC vier alto, restrinja ao Nordeste (onde estão os cases) e expanda depois. |
| Idioma | Português | |
| Horário | Seg–sex 8h–20h, sáb 8h–13h | Concentra a verba quando alguém responde o WhatsApp rápido. Se o agente de IA atende 24/7, libere todos os horários. |
| Correspondência | Frase + exata nas principais | Ampla só depois de ter conversões e lances inteligentes. |

### Grupos de anúncios

| Grupo | Exemplos de palavras-chave | Ticket / intenção |
| --- | --- | --- |
| Chatbot WhatsApp e Agentes de IA | chatbot para whatsapp, agente de ia para atendimento | Principal: é o carro-chefe do site |
| Automação de Processos com IA | automação de processos com ia, integração whatsapp com crm | Alto ticket, volume menor |
| Sistemas e Software Sob Medida | sistema sob medida, empresa de desenvolvimento de software | Alto ticket, CPC mais caro |
| Landing Pages | criação de landing page, landing page profissional | Ticket menor, venda mais fácil — porta de entrada |
| Clínicas e Consultórios | chatbot para clínica, agendamento automático whatsapp | Nicho com dor clara e intenção alta |

Cada grupo tem 1 anúncio responsivo com 15 títulos e 4 descrições. Três títulos são comuns a
todos: *Diagnóstico gratuito de 30 min*, *Preço e prazo fechados*, *Fale com quem constrói*.
São 51 negativas de campanha (grátis, curso, como fazer, vaga, chatgpt, wix…), todas em `campanha.mjs`.

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
3. Na campanha, ajuste o que o CSV não cobre: **local** (Brasil, "Presença"), **programação de horário**
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
- [ ] Local "Presença", só Rede de Pesquisa, idioma português
- [ ] Revisar as promessas usadas nos anúncios: "1ª entrega em até 2 semanas", "Resposta em 30 segundos", "Orçamento em 2 minutos" (o README do site já pede essa revisão)
- [ ] Alguém pronto para responder o WhatsApp rápido nos horários da campanha

### 5. Rotina de otimização

| Quando | O quê |
| --- | --- |
| Dias 1–14, a cada 2–3 dias | **Termos de pesquisa**: negativar tudo que não é cliente (estudante, DIY, ferramenta grátis). É o que mais economiza verba. |
| Semanal | Anotar numa planilha as conversas do WhatsApp que vieram do Google (pergunte "como nos achou?"), quantas viraram reunião e quantas fecharam. Comparar com o custo da semana. |
| Semana 3–4 | Pausar palavras-chave com 100+ cliques e nenhuma conversa. Mover verba para os grupos que trazem conversa. |
| ~15 conversões em 30 dias | Trocar para **Maximizar conversões**. Com 30+, testar CPA desejado. |
| Mensal | Ver os recursos com desempenho "Baixo" nos anúncios e trocar esses títulos. |

**Expectativa honesta:** com R$ 1.500/mês e CPC na faixa de alguns reais (confira no Planejador
de Palavras-chave antes de ativar — "software sob medida" tende a ser bem mais caro que
"chatbot para clínica"), algo como 200–500 cliques e, se a página converter 3–8%, de 6 a 40 conversas por mês.
O primeiro mês é de aprendizado; avalie pelo custo por *reunião*, não por clique.

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
