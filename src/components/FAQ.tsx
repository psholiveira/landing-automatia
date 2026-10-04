import Reveal from "./Reveal";
import { faq } from "@/content/site";
import Titulo from "./Titulo";

export default function FAQ() {
  return (
    <section id="faq" className="border-b-2 border-ink bg-surface">
      <div className="shell section-y grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal className="flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-28 lg:self-start">
          <div className="kicker text-brand">{faq.kicker}</div>
          <Titulo className="m-0 text-[clamp(30px,8vw,52px)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[72px] lg:leading-[0.9] lg:tracking-[-0.038em]">
            {faq.titulo}
          </Titulo>
        </Reveal>

        <div className="flex flex-col border-b-2 border-ink">
          {faq.itens.map((item) => (
            <Reveal key={item.p}>
              <details className="group border-t-2 border-ink">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[18px] font-bold leading-[1.25] tracking-[-0.015em] transition-colors hover:text-brand sm:py-6 sm:text-[22px] lg:text-2xl [&::-webkit-details-marker]:hidden">
                  {item.p}
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink font-mono text-lg font-normal transition-colors group-open:bg-ink group-open:text-white"
                  >
                    <span className="transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="m-0 max-w-[640px] pb-6 text-[16px] font-medium leading-[1.5] text-ink/75 sm:pb-7 sm:text-lg">{item.r}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
