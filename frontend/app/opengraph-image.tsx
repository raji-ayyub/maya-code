import { ImageResponse } from "next/og";
export const alt = "Maya's JavaScript Adventure game";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0A0A1E", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, color: "#fff" }}>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Maya's JavaScript Adventure</div>
        <div style={{ fontSize: 34, marginTop: 40, color: "#c5c7e8" }}>Learn to code, one level at a time.</div>
      </div>
    ),
    size,
  );
}
