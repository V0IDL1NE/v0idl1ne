export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "#faf7ef",
        border: "1.5px solid #2a2a2a",
        borderRadius: "4px 14px 14px 4px",
        boxShadow: "4px 6px 18px rgba(0,0,0,0.35)",
        padding: "2.2rem 2.4rem 2.4rem 2.8rem",
        minHeight: "340px",
        overflow: "hidden",
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "18px",
          background: "linear-gradient(to right, rgba(0,0,0,0.28), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "36px",
          height: "36px",
          background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.12) 50%)",
          pointerEvents: "none",
        }}
      />

      <h2
        style={{
          fontFamily: "var(--font-condensed, sans-serif)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: "1.7rem",
          color: "#111",
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          color: "#999",
          marginBottom: "1.8rem",
        }}
      >
        <span style={{ width: "32px", height: "1px", background: "#bbb" }} />
        <span style={{ fontSize: "0.75rem" }}>❦</span>
        <span style={{ flex: 1, height: "1px", background: "#bbb" }} />
      </div>

      {children}
    </div>
  );
}
