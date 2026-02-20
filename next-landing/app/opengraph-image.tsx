import { ImageResponse } from "next/og";

export const alt = "AI Solutions | Practical AI for Real Business Work";
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
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            AI Solutions
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            Practical AI for Real Business Work
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.65)",
              textAlign: "center",
            }}
          >
            Voice AI · Knowledge Bases · Prompt Engineering · AI MVPs
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
