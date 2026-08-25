import { marqueeText } from "@/content/site";

export default function Marquee() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-b-2 border-ink bg-brand py-5 text-white">
      <div className="inline-flex animate-marquee will-change-transform">
        <span className="font-mono text-[15px] tracking-[0.18em]">{marqueeText}</span>
        <span className="font-mono text-[15px] tracking-[0.18em]">{marqueeText}</span>
      </div>
    </div>
  );
}
