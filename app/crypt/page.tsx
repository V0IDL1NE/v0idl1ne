import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function CryptPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          aspectRatio: "16 / 9",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 0 24px rgba(136, 0, 255, 0.2)",
          background: "#000",
        }}
      >
        <iframe
          src="https://www.canva.com/design/DAHS9B3pkRw/8S6h-cyiPklFI7IYuztotg/view?embed"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </main>
  );
}
