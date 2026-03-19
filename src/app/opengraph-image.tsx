import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f8fbff 0%, #eef3ff 60%, #ffffff 100%)",
          padding: "64px",
          color: "#111111",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.2em",
            color: "#000075",
            fontWeight: 700,
          }}
        >
          ANUJA JAYASINGHE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            Software Engineer
          </div>
          <div style={{ fontSize: 34, color: "#3f3f46" }}>
            Portfolio, projects, skills, and certifications
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#000075", fontWeight: 600 }}>
          anujajay.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
