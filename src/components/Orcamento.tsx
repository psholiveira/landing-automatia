"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { origemDoOrcamento } from "@/lib/utils";
import { orcamento, segmentos, servicos, whatsappCom } from "@/content/site";
import BtnConteudo from "./BtnConteudo";
import OndaPontos from "./OndaPontos";

const campo =
  "w-full rounded-2xl border border-ink/[0.1] bg-white px-4 py-3.5 text-[16px] text-ink placeholder:text-smoke transition-[border-color,box-shadow] duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15";
const rotulo = "mb-2.5 block text-[15px] font-medium tracking-[-0.01em] text-navy";
// o rádio fica escondido dentro da pílula; o `relative` mantém o balão de "campo obrigatório" junto dela
const pilula =
  "relative cursor-pointer select-none rounded-full bg-white px-4 py-2.5 text-[14px] tracking-[-0.01em] text-ink ring-1 ring-ink/[0.08] transition-[background-color,color,box-shadow] duration-200 hover:ring-ink/25 has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:ring-navy has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand sm:text-[15px]";

function Pilulas({ nome, legenda, opcoes, obrigatorio }: { nome: string; legenda: string; opcoes: string[]; obrigatorio?: boolean }) {
  return (
    <fieldset>
      <legend className={rotulo}>
        {legenda}
        {!obrigatorio && <span className="font-normal text-smoke"> · {orcamento.campos.opcional}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <label key={o} className={pilula}>
            <input type="radio" name={nome} value={o} required={obrigatorio} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Mensagem do WhatsApp com as respostas; *negrito* é a marcação do próprio WhatsApp. */
function montarMensagem(d: FormData) {
  const v = (k: string) => String(d.get(k) ?? "").trim();
  return [
    orcamento.mensagemAbertura,
    "",
    `*Nome:* ${v("nome")}`,
    ...(v("empresa") ? [`*Empresa:* ${v("empresa")}`] : []),
    ...(v("segmento") ? [`*Segmento:* ${v("segmento")}`] : []),
    `*Serviço:* ${v("servico")}`,
    `*Prazo:* ${v("prazo")}`,
    "",
    "*O que quero resolver:*",
    v("descricao"),
  ].join("\n");
}

/** Mesmo mundo do herói e da 404: branco, título com destaque azul e a onda de pontos. */
export default function Orcamento() {
  const root = useRef<HTMLElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const tituloSucesso = useRef<HTMLHeadingElement>(null);
  const origem = useRef("direto");
  const [waUrl, setWaUrl] = useState<string | null>(null);

  useEffect(() => {
    // a página é estática: os parâmetros só existem no navegador
    const params = new URLSearchParams(window.location.search);
    origem.current = origemDoOrcamento(params);
    const segmento = params.get("segmento");
    const radios = form.current?.elements.namedItem("segmento");
    if (segmento && radios instanceof RadioNodeList) radios.value = segmento;
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const q = (s: string) => Array.from(el.querySelectorAll(s));

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.1 })
        .fromTo(q("[data-entra]"), { y: 24 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.09 }, 0)
        .fromTo(q("[data-onda]"), { y: 80 }, { y: 0, opacity: 1, duration: 2, ease: "power2.out" }, 0.2);
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (waUrl) tituloSucesso.current?.focus();
  }, [waUrl]);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const url = whatsappCom(montarMensagem(dados));
    // só existe depois do consentimento; sem ele, nada vai para o GA
    if ("dataLayer" in window) {
      sendGAEvent("event", "clique_whatsapp", {
        botao: origem.current,
        servico: String(dados.get("servico")),
        prazo: String(dados.get("prazo")),
      });
    }
    window.open(url, "_blank", "noopener,noreferrer");
    // se o navegador bloquear a aba nova, o painel de sucesso tem o link
    setWaUrl(url);
  }

  return (
    <main ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white">
      <div className="shell relative z-10 flex items-center justify-between gap-4 py-6 sm:py-8">
        <Link href="/" aria-label="AutomatIA — início" className="inline-block">
          <Image src="/logo.png" alt="AutomatIA" width={727} height={169} priority className="h-6 w-auto sm:h-7" />
        </Link>
        <Link href="/" className="btn btn-sm btn-contorno">
          <BtnConteudo>{orcamento.voltar}</BtnConteudo>
        </Link>
      </div>

      <div className="shell relative z-10 grid flex-1 grid-cols-1 gap-10 pb-16 pt-4 sm:gap-12 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20 lg:pt-14">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <span data-entra className="entra kicker block text-brand">
            {orcamento.kicker}
          </span>
          <h1 data-entra className="entra titulo-secao mt-4 sm:mt-5">
            {orcamento.titulo} <span className="text-brand">{orcamento.destaque}</span>
          </h1>
          <p data-entra className="entra intro-secao mt-5 max-w-[480px] sm:mt-6">
            {orcamento.texto}
          </p>
          <ol data-entra className="entra m-0 mt-10 hidden max-w-[440px] list-none flex-col p-0 lg:flex">
            {orcamento.passos.map((p) => (
              <li key={p.n} className="flex gap-5 border-t border-ink/[0.08] py-4 text-[16px] leading-[1.45] text-ink">
                <span className="font-mono text-[14px] leading-[1.6] text-brand">{p.n}</span>
                {p.texto}
              </li>
            ))}
          </ol>
        </div>

        <div data-entra className="entra rounded-[28px] bg-nevoa p-5 sm:p-8 lg:self-start lg:p-10">
          {waUrl && (
            <div role="status" className="flex flex-col items-start py-4 sm:py-8">
              <span className="kicker text-brand">{orcamento.sucessoKicker}</span>
              <h2
                ref={tituloSucesso}
                tabIndex={-1}
                className="m-0 mt-3 text-[clamp(28px,4.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-navy focus:outline-none"
              >
                {orcamento.sucessoTitulo}
              </h2>
              <p className="m-0 mt-4 max-w-[440px] text-[16px] leading-[1.55] text-ash">{orcamento.sucessoTexto}</p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-escuro">
                  <BtnConteudo seta="diagonal">{orcamento.sucessoCta}</BtnConteudo>
                </a>
                <button type="button" onClick={() => setWaUrl(null)} className="btn btn-contorno">
                  <BtnConteudo>{orcamento.corrigir}</BtnConteudo>
                </button>
              </div>
            </div>
          )}

          {/* escondido em vez de desmontado: "Corrigir respostas" volta com tudo preenchido */}
          <form ref={form} onSubmit={enviar} className={waUrl ? "hidden" : "flex flex-col gap-7"}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className={rotulo}>
                  {orcamento.campos.nome}
                </label>
                <input id="nome" name="nome" required maxLength={80} autoComplete="name" className={campo} />
              </div>
              <div>
                <label htmlFor="empresa" className={rotulo}>
                  {orcamento.campos.empresa}
                  <span className="font-normal text-smoke"> · {orcamento.campos.opcional}</span>
                </label>
                <input id="empresa" name="empresa" maxLength={80} autoComplete="organization" className={campo} />
              </div>
            </div>

            <Pilulas
              nome="segmento"
              legenda={orcamento.campos.segmento}
              opcoes={[...segmentos.itens.map((s) => s.nome), orcamento.outroSegmento]}
            />
            <Pilulas
              nome="servico"
              legenda={orcamento.campos.servico}
              opcoes={[...servicos.itens.map((s) => s.nome), orcamento.naoSei]}
              obrigatorio
            />
            <Pilulas nome="prazo" legenda={orcamento.campos.prazo} opcoes={orcamento.prazos} obrigatorio />

            <div>
              <label htmlFor="descricao" className={rotulo}>
                {orcamento.campos.descricao}
              </label>
              <textarea
                id="descricao"
                name="descricao"
                required
                rows={4}
                maxLength={1000}
                placeholder={orcamento.campos.descricaoExemplo}
                className={campo + " resize-y leading-[1.5]"}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button type="submit" className="btn btn-escuro w-full py-3.5 text-[16px]">
                <BtnConteudo seta="diagonal">{orcamento.enviar}</BtnConteudo>
              </button>
              <p className="m-0 text-center text-[13px] leading-[1.5] text-ash">{orcamento.privacidade}</p>
            </div>
          </form>
        </div>
      </div>

      <div data-onda aria-hidden className="entra pointer-events-none h-[140px] w-full sm:h-[200px]">
        <OndaPontos className="h-full w-full" />
      </div>
    </main>
  );
}
