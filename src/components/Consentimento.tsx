"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import BtnConteudo from "./BtnConteudo";

const CHAVE = "consentimento-analytics";

type Escolha = "aceito" | "recusado" | null;

/**
 * LGPD: o Google Analytics só carrega depois que a pessoa aceita. A escolha
 * fica no localStorage; sem ela (ou com o storage bloqueado) o banner aparece.
 */
export default function Consentimento({ gaId }: { gaId: string }) {
  // undefined = ainda não leu o storage (SSR e primeiro render), evita piscar o banner
  const [escolha, setEscolha] = useState<Escolha | undefined>(undefined);

  useEffect(() => {
    let salvo: string | null = null;
    try {
      salvo = localStorage.getItem(CHAVE);
    } catch {}
    setEscolha(salvo === "aceito" || salvo === "recusado" ? salvo : null);
  }, []);

  function escolher(valor: "aceito" | "recusado") {
    try {
      localStorage.setItem(CHAVE, valor);
    } catch {}
    setEscolha(valor);
  }

  if (escolha === "aceito") return <GoogleAnalytics gaId={gaId} />;
  if (escolha !== null) return null;

  return (
    <div
      role="region"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 motion-safe:animate-[consentimento_600ms_cubic-bezier(0.16,1,0.3,1)_both] sm:bottom-5 sm:px-4"
    >
      <div className="flex w-full max-w-[640px] flex-col gap-4 rounded-[22px] border border-ink/[0.08] bg-white/90 p-5 shadow-[0_14px_36px_-16px_rgba(11,42,91,0.45)] backdrop-blur-xl backdrop-saturate-150 sm:flex-row sm:items-center sm:gap-6 sm:p-4 sm:pl-6">
        <p className="m-0 text-[14px] leading-[1.5] text-ash sm:text-[15px]">
          Usamos cookies do Google Analytics para entender como o site é usado. Nada é coletado sem a sua permissão.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => escolher("recusado")} className="btn btn-sm btn-contorno flex-1 sm:flex-none">
            <BtnConteudo>Recusar</BtnConteudo>
          </button>
          <button type="button" onClick={() => escolher("aceito")} className="btn btn-sm btn-escuro flex-1 sm:flex-none">
            <BtnConteudo>Aceitar</BtnConteudo>
          </button>
        </div>
      </div>
    </div>
  );
}
