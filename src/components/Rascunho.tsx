/**
 * Seções com `rascunho: true` em site.ts existem só em desenvolvimento:
 * em produção somem, para nenhum texto de exemplo ir ao ar.
 */
export const visivel = (rascunho: boolean) => !rascunho || process.env.NODE_ENV !== "production";

export function AvisoRascunho({ rascunho }: { rascunho: boolean }) {
  if (!rascunho) return null;
  return (
    <div className="mb-8 border-2 border-dashed border-brand bg-skyPale/40 px-4 py-3 font-mono text-[11px] leading-[1.5] tracking-[0.06em] text-navy sm:text-xs">
      RASCUNHO · SÓ APARECE EM DESENVOLVIMENTO. TROQUE OS TEXTOS EM src/content/site.ts E MUDE rascunho PARA false.
    </div>
  );
}
