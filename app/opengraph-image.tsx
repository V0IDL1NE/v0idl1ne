import { ImageResponse } from "next/og";

export const alt = "V0IDL1NE — Knowledge they forgot to give you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#000000",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            display: "flex",
            background: "linear-gradient(90deg, #8800ff, #ff0088)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          V<span style={{ color: "#aa44ff" }}>0</span>IDL<span style={{ color: "#aa44ff" }}>1</span>NE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            letterSpacing: 8,
            color: "#6a5f80",
          }}
        >
          KNOWLEDGE THEY FORGOT TO GIVE YOU
        </div>
      </div>
    ),
    { ...size }
  );
}
