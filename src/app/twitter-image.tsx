import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffffff",
          color: "#111111",
          border: "14px solid #000075",
        }}
      >
        <div style={{ fontSize: 30, color: "#000075", letterSpacing: "0.2em", fontWeight: 700 }}>
          ANUJA JAYASINGHE
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 20 }}>PORTFOLIO</div>
        <div style={{ fontSize: 32, color: "#3f3f46", marginTop: 20 }}>
          Software Engineer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
