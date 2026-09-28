"use client";

import { useState, useSyncExternalStore } from "react";

const SITE_URL = "https://v0idl1ne.com";
const noopSubscribe = () => () => {};

/* "Copy this tip" card + share buttons. `path` is site-relative, e.g. /blog/slug. */
export default function ShareBar({ title, tip, path, label = "// SEND THIS TO SOMEONE WHO NEEDS IT" }: {
  title: string;
  tip: string;
  path: string;
  label?: string;
}) {
  const [copied, setCopied] = useState<"tip" | "link" | null>(null);
  const url = `${SITE_URL}${path}`;
  const enc = encodeURIComponent;

  async function copy(text: string, which: "tip" | "link") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API blocked (old browser / insecure context) — fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, text: tip, url });
    } catch {
      // user cancelled — nothing to do
    }
  }

  // false on the server, real value on the client — without a hydration mismatch.
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );

  const links = [
    { label: "TEXT", href: `sms:?&body=${enc(`${tip} ${url}`)}` },
    { label: "X", href: `https://x.com/intent/post?text=${enc(tip)}&url=${enc(url)}` },
    { label: "REDDIT", href: `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}` },
    { label: "FACEBOOK", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "EMAIL", href: `mailto:?subject=${enc(title)}&body=${enc(`${tip}\n\n${url}`)}` },
  ];

  return (
    <div className="tip-card no-print">
      <div className="tip-card-label">{label}</div>
      <div className="tip-card-text">&ldquo;{tip}&rdquo;</div>
      <div className="share-bar">
        <button type="button" className="tool-btn" onClick={() => copy(`${tip}\n\n${url}`, "tip")}>
          {copied === "tip" ? "COPIED ✓" : "COPY THIS TIP"}
        </button>
        <button type="button" className="tool-btn" onClick={() => copy(url, "link")}>
          {copied === "link" ? "COPIED ✓" : "COPY LINK"}
        </button>
        {canNativeShare && (
          <button type="button" className="tool-btn" onClick={nativeShare}>SHARE…</button>
        )}
        {links.map(l => (
          <a key={l.label} className="tool-btn small" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
        ))}
      </div>
    </div>
  );
}
