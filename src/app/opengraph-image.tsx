import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { hero, siteUrl } from "@/content/site";

export const alt = "AutomatIA — Software que trabalha enquanto você dorme";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lidos em tempo de build: a imagem é estática, então nada disso roda por request.
const [archivoExtraBold, archivoMedium, plexMono, logo] = await Promise.all([
  readFile(join(process.cwd(), "assets/Archivo-ExtraBold.ttf")),
  readFile(join(process.cwd(), "assets/Archivo-Medium.ttf")),
  readFile(join(process.cwd(), "assets/IBMPlexMono-Regular.ttf")),
  readFile(join(process.cwd(), "public/logo-white.png")),
]);

const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
const dominio = siteUrl.replace(/^https?:\/\//, "");

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#0b2a5b",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "Archivo",
        }}
      >
        {/* Mesmas colunas e o mesmo glow do herói da landing */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ flex: 1, borderRight: "1px solid rgba(255,255,255,0.10)" }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 760,
            height: 760,
            background:
              "radial-gradient(circle, rgba(26,115,200,0.55) 0%, rgba(11,42,91,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, backgroundColor: "#6fabe8" }} />
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 21,
              letterSpacing: "0.18em",
              color: "#7fb4ea",
            }}
          >
            {hero.kicker}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
          }}
        >
          {hero.linhas.map((linha) => (
            <div key={linha}>{linha}</div>
          ))}
          <div style={{ color: "#6fabe8" }}>{hero.linhaDestaque}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.35)",
            paddingTop: 28,
          }}
        >
          {/* 727x169 é o tamanho nativo do arquivo; mantido em escala para não distorcer */}
          <img src={logoSrc} width={224} height={52} alt="" />
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 22,
              letterSpacing: "0.06em",
              color: "#cfe3f7",
            }}
          >
            {dominio}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivoExtraBold, style: "normal", weight: 800 },
        { name: "Archivo", data: archivoMedium, style: "normal", weight: 500 },
        { name: "IBM Plex Mono", data: plexMono, style: "normal", weight: 400 },
      ],
    }
  );
}
