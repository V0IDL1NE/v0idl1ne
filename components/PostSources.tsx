import { sourcesForPost } from "@/lib/sources";

const s = {
  wrap: { marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(136,0,255,0.15)" },
  label: { fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#440088", letterSpacing: "0.25em", marginBottom: "0.8rem" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: { fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "0.35rem" },
  link: { color: "#8a7aa8", textDecoration: "underline", textUnderlineOffset: "2px" },
  reviewed: { fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#4a4060", letterSpacing: "0.12em", marginTop: "1rem" },
};

export function reviewedLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function PostSources({ slug }: { slug: string }) {
  const { reviewed, sources, corrections } = sourcesForPost(slug);
  return (
    <div style={s.wrap}>
      {corrections.length > 0 && (
        <div className="callout" style={{ marginTop: 0 }}>
          <strong>CORRECTION</strong>
          {corrections.map(c => <div key={c}>{c}</div>)}
        </div>
      )}
      {sources.length > 0 && (
        <>
          <div style={s.label}>{"// SOURCES"}</div>
          <ul style={s.list}>
            {sources.map(src => (
              <li key={src.url} style={s.item}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" style={s.link}>{src.label}</a>
              </li>
            ))}
          </ul>
        </>
      )}
      <div style={s.reviewed}>
        LAST REVIEWED {reviewedLabel(reviewed).toUpperCase()} — SPOT AN ERROR? USE REPORT INACCURACY BELOW.
      </div>
    </div>
  );
}
