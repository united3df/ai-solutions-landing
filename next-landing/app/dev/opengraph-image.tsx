import { ImageResponse } from "next/og";

export const alt = "MVPs. AI. Built Fast & Right. | AI4B2B Dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            AI4B2B Dev
          </div>
          <div
            style={{
              fontSize: 36,
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            MVPs. AI. Built Fast & Right.
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.65)",
              textAlign: "center",
            }}
          >
            Full-Stack & AI · Y Combinator · Techstars · $2M+ ARR
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
