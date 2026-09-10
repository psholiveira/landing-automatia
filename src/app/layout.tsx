import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import { siteUrl } from "@/content/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "AutomatIA — Software que trabalha enquanto você dorme",
  description:
    "Aplicações escaláveis, sistemas sob medida e automações com inteligência artificial que assumem o trabalho repetitivo da sua operação.",
  openGraph: {
    title: "AutomatIA",
    description: "Aplicações escaláveis, automações com IA e sistemas sob medida.",
    url: "/",
    siteName: "AutomatIA",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b2a5b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable + " " + mono.variable}>
      <body>{children}</body>
    </html>
  );
}
