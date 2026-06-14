export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" width={36} height={36}>
        <line x1="20" y1="44" x2="0" y2="4" stroke="#8800ff" strokeWidth="1.5" />
        <line x1="20" y1="44" x2="40" y2="4" stroke="#8800ff" strokeWidth="1.5" />
        <line x1="0" y1="4" x2="40" y2="4" stroke="#8800ff" strokeWidth="1.5" />
        <line x1="20" y1="4" x2="20" y2="44" stroke="#6600cc" strokeWidth="1" />
        <line x1="5" y1="19" x2="35" y2="19" stroke="#6600cc" strokeWidth="1" />
      </svg>
      <div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "1.8rem",
          fontWeight: 900,
          letterSpacing: "0.15em",
          color: "#fff",
          textShadow: "0 0 30px #8800ff",
        }}>
          V<span style={{ color: "#aa44ff" }}>0</span>IDL<span style={{ color: "#aa44ff" }}>1</span>NE
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.6rem",
          color: "#6a5f80",
          letterSpacing: "0.2em",
          marginTop: "2px",
        }}>
          KNOWLEDGE THEY FORGOT TO GIVE YOU
        </div>
      </div>
    </div>
  );
}
