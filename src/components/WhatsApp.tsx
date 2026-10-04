import { contato, ctaCurto } from "@/content/site";

/** Logo do WhatsApp — o lucide não traz ícones de marca. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.46 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.7-1.5a11.33 11.33 0 0 0 5.74 1.47h.01c6.26 0 11.35-5.1 11.35-11.36 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}

/** Atalho fixo para o WhatsApp — o canal que mais converte em tráfego pago. */
export default function WhatsAppFlutuante() {
  return (
    <a
      href={contato.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${ctaCurto} pelo WhatsApp`}
      className="group fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2.5 rounded-full border-2 border-ink bg-[#25D366] p-3.5 text-ink shadow-[0_4px_0_0_rgba(32,30,29,0.35)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6 sm:px-5 sm:py-3.5"
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 [animation-iteration-count:4] motion-reduce:hidden" />
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden text-[15px] font-extrabold tracking-[-0.01em] sm:inline">{ctaCurto}</span>
    </a>
  );
}
