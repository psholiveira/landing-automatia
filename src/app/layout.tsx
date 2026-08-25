import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
  title: "AutomatIA — Software que trabalha enquanto você dorme",
  description:
    "Aplicações escaláveis, sistemas sob medida e automações com inteligência artificial que assumem o trabalho repetitivo da sua operação.",
  openGraph: {
    title: "AutomatIA",
    description: "Aplicações escaláveis, automações com IA e sistemas sob medida.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable + " " + mono.variable}>
      <body>{children}</body>
    </html>
  );
}
