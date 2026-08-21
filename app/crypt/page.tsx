import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "V0IDL1NE",
  robots: { index: false, follow: false },
};

export default function CryptPage() {
  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "var(--bg)",
        zIndex: 1000,
      }}
    >
      <iframe
        src="https://www.canva.com/design/DAHS9B3pkRw/8S6h-cyiPklFI7IYuztotg/view?embed"
        allow="fullscreen"
        allowFullScreen
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </main>
  );
}
