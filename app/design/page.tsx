"use client";

import { useEffect, useRef, useState } from "react";
import ChatPanel from "./ChatPanel";

type ElementType = "text" | "image" | "rect" | "circle";

type Element = {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  src?: string;
  fill?: string;
};

const CANVAS_W = 1200;
const CANVAS_H = 800;
const GRID = 20;
const SNAP_THRESHOLD = 8;
const DESIGN_KEY = "crypt-design";

function snapPos(x: number, y: number, w: number, h: number) {
  let sx = Math.round(x / GRID) * GRID;
  let sy = Math.round(y / GRID) * GRID;
  const centerX = CANVAS_W / 2;
  const centerY = CANVAS_H / 2;
  let guideX = false;
  let guideY = false;

  if (Math.abs(sx + w / 2 - centerX) < SNAP_THRESHOLD) {
    sx = centerX - w / 2;
    guideX = true;
  }
  if (Math.abs(sy + h / 2 - centerY) < SNAP_THRESHOLD) {
    sy = centerY - h / 2;
    guideY = true;
  }

  return { x: Math.max(0, sx), y: Math.max(0, sy), guideX, guideY };
}

export default function DesignPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const savedPassword = useRef("");

  const [elements, setElements] = useState<Element[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [guide, setGuide] = useState({ x: false, y: false });
  const elementsRef = useRef<Element[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importPath, setImportPath] = useState("/crypt");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (elements) elementsRef.current = elements;
  }, [elements]);

  async function loadElements() {
    const res = await fetch(`/api/crypt-data?key=${DESIGN_KEY}`);
    const data = await res.json();
    setElements(data.value ?? []);
  }

  async function importPage(path: string) {
    if (!path.startsWith("/")) path = "/" + path;
    setImporting(true);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "-99999px";
    iframe.style.top = "0";
    iframe.style.width = `${CANVAS_W}px`;
    iframe.style.height = `${CANVAS_H}px`;
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    try {
      await new Promise<void>((resolve, reject) => {
        iframe.onload = () => resolve();
        iframe.onerror = () => reject(new Error("Failed to load page"));
        iframe.src = path;
      });

      // give client-rendered content a moment to hydrate/settle
      await new Promise((r) => setTimeout(r, 700));

      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      if (!doc || !win) throw new Error("Could not access page content");

      const imported: Element[] = [];
      const nodes = Array.from(doc.body.querySelectorAll<HTMLElement>("*"));

      const ownText = (el: HTMLElement) =>
        Array.from(el.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent || "")
          .join(" ")
          .trim();

      for (const el of nodes) {
        if (el.tagName === "SCRIPT" || el.tagName === "STYLE" || el.tagName === "LINK") continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 4 || rect.height < 4) continue;
        const style = win.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) continue;

        if (el.tagName === "IMG") {
          const src = (el as HTMLImageElement).src;
          if (!src) continue;
          imported.push({
            id: crypto.randomUUID(),
            type: "image",
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            src,
          });
          continue;
        }

        const text = ownText(el);
        if (!text) continue;
        imported.push({
          id: crypto.randomUUID(),
          type: "text",
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          text,
          fontSize: parseFloat(style.fontSize) || 16,
          color: style.color || "#111111",
          fontWeight: Number(style.fontWeight) || 400,
        });
      }

      if (imported.length === 0) {
        alert("Couldn't find any content to import from that page.");
      } else {
        const next = [...elementsRef.current, ...imported.slice(0, 80)];
        setElements(next);
        saveElements(next);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Import failed");
    } finally {
      document.body.removeChild(iframe);
      setImporting(false);
    }
  }

  useEffect(() => {
    if (authed) loadElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  function saveElements(next: Element[]) {
    fetch("/api/crypt-data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: DESIGN_KEY, value: next }),
    }).catch(() => {});
  }

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    savedPassword.current = password;
    setAuthed(true);
    setAuthError(false);
  }

  function addElement(partial: Partial<Element> & { type: ElementType }) {
    const el: Element = {
      id: crypto.randomUUID(),
      x: 100,
      y: 100,
      width: 160,
      height: 100,
      ...partial,
    };
    const next = [...elementsRef.current, el];
    setElements(next);
    setSelectedId(el.id);
    saveElements(next);
  }

  function updateSelected(patch: Partial<Element>, persist = true) {
    if (!selectedId) return;
    const next = elementsRef.current.map((e) => (e.id === selectedId ? { ...e, ...patch } : e));
    setElements(next);
    if (persist) saveElements(next);
  }

  function deleteSelected() {
    if (!selectedId) return;
    const next = elementsRef.current.filter((e) => e.id !== selectedId);
    setElements(next);
    setSelectedId(null);
    saveElements(next);
  }

  function bringToFront() {
    if (!selectedId) return;
    const el = elementsRef.current.find((e) => e.id === selectedId);
    if (!el) return;
    const next = [...elementsRef.current.filter((e) => e.id !== selectedId), el];
    setElements(next);
    saveElements(next);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addElement({ type: "image", width: 240, height: 180, src: reader.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function startDrag(e: React.PointerEvent, el: Element) {
    e.stopPropagation();
    setSelectedId(el.id);
    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startElX = el.x;
    const startElY = el.y;

    function onMove(ev: PointerEvent) {
      const rawX = startElX + (ev.clientX - startPointerX);
      const rawY = startElY + (ev.clientY - startPointerY);
      const snapped = snapPos(rawX, rawY, el.width, el.height);
      setGuide({ x: snapped.guideX, y: snapped.guideY });
      const next = elementsRef.current.map((it) =>
        it.id === el.id ? { ...it, x: snapped.x, y: snapped.y } : it
      );
      setElements(next);
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setGuide({ x: false, y: false });
      saveElements(elementsRef.current);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function startResize(e: React.PointerEvent, el: Element) {
    e.stopPropagation();
    setSelectedId(el.id);
    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startW = el.width;
    const startH = el.height;

    function onMove(ev: PointerEvent) {
      const w = Math.max(20, Math.round((startW + (ev.clientX - startPointerX)) / GRID) * GRID);
      const h = Math.max(20, Math.round((startH + (ev.clientY - startPointerY)) / GRID) * GRID);
      const next = elementsRef.current.map((it) => (it.id === el.id ? { ...it, width: w, height: h } : it));
      setElements(next);
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      saveElements(elementsRef.current);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
          <div style={{ color: "#8800ff", fontSize: "11px", letterSpacing: "0.2em" }}>V0IDL1NE // DESIGN</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoFocus
            style={{
              background: "#0a0a0a",
              border: `1px solid ${authError ? "#ff0088" : "#1a1a1a"}`,
              color: "#c0c0c0",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "14px",
              padding: "12px 16px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          {authError && <div style={{ color: "#ff0088", fontSize: "11px", letterSpacing: "0.1em" }}>DENIED</div>}
          <button
            type="submit"
            style={{
              background: "linear-gradient(45deg, #8800ff, #ff0088)",
              border: "none",
              color: "#000",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "0.2em",
              padding: "12px",
              cursor: "pointer",
            }}
          >
            ENTER
          </button>
        </form>
      </div>
    );
  }

  const selected = elements?.find((e) => e.id === selectedId) ?? null;
  const contentBottom = elements?.length ? Math.max(...elements.map((e) => e.y + e.height)) : 0;
  const canvasHeight = Math.max(CANVAS_H, contentBottom + 40);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#050505", fontFamily: "'Share Tech Mono', monospace" }}>
      {/* Toolbar */}
      <div style={{ width: "220px", flexShrink: 0, borderRight: "1px solid #1a1a1a", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto" }}>
        <div style={{ color: "#8800ff", fontSize: "0.65rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>IMPORT PAGE</div>
        <input
          value={importPath}
          onChange={(e) => setImportPath(e.target.value)}
          placeholder="/crypt"
          style={inputStyle}
        />
        <ToolButton
          label={importing ? "Importing…" : "Import"}
          onClick={() => !importing && importPage(importPath)}
        />
        <div style={{ color: "#555", fontSize: "0.6rem", lineHeight: 1.5, marginBottom: "0.5rem" }}>
          Loads that page and drops its visible text/images onto the canvas as editable elements. Layout/styling
          won't be perfect — it's a starting point, not a live copy.
        </div>

        <div style={{ color: "#8800ff", fontSize: "0.65rem", letterSpacing: "0.15em", margin: "0.5rem 0" }}>ADD</div>

        <ToolButton
          label="+ Text"
          onClick={() =>
            addElement({ type: "text", width: 220, height: 50, text: "New text", fontSize: 24, color: "#111111", fontWeight: 600 })
          }
        />
        <ToolButton label="+ Image" onClick={() => fileInputRef.current?.click()} />
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        <ToolButton label="+ Rectangle" onClick={() => addElement({ type: "rect", width: 160, height: 100, fill: "#8800ff" })} />
        <ToolButton label="+ Circle" onClick={() => addElement({ type: "circle", width: 120, height: 120, fill: "#ff0088" })} />

        {selected && (
          <>
            <div style={{ color: "#8800ff", fontSize: "0.65rem", letterSpacing: "0.15em", margin: "1rem 0 0.5rem" }}>SELECTED</div>

            {selected.type === "text" && (
              <>
                <textarea
                  value={selected.text ?? ""}
                  onChange={(e) => updateSelected({ text: e.target.value }, false)}
                  onBlur={() => saveElements(elementsRef.current)}
                  rows={2}
                  style={inputStyle}
                />
                <label style={labelStyle}>
                  Size
                  <input
                    type="number"
                    value={selected.fontSize ?? 24}
                    onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })}
                    style={inputStyle}
                  />
                </label>
                <label style={labelStyle}>
                  Color
                  <input
                    type="color"
                    value={selected.color ?? "#111111"}
                    onChange={(e) => updateSelected({ color: e.target.value })}
                    style={{ ...inputStyle, padding: "2px", height: "32px" }}
                  />
                </label>
              </>
            )}

            {(selected.type === "rect" || selected.type === "circle") && (
              <label style={labelStyle}>
                Fill
                <input
                  type="color"
                  value={selected.fill ?? "#8800ff"}
                  onChange={(e) => updateSelected({ fill: e.target.value })}
                  style={{ ...inputStyle, padding: "2px", height: "32px" }}
                />
              </label>
            )}

            <ToolButton label="Bring to Front" onClick={bringToFront} />
            <ToolButton label="Delete" onClick={deleteSelected} danger />
          </>
        )}
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, overflow: "auto", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div
          onPointerDown={() => setSelectedId(null)}
          style={{
            position: "relative",
            width: CANVAS_W,
            height: canvasHeight,
            flexShrink: 0,
            background: "#ffffff",
            backgroundImage:
              "linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)",
            backgroundSize: `${GRID}px ${GRID}px`,
            border: "1px solid #333",
            boxShadow: "0 0 40px rgba(136,0,255,0.15)",
          }}
        >
          {guide.x && <div style={{ position: "absolute", left: CANVAS_W / 2, top: 0, bottom: 0, width: "1px", background: "#8800ff" }} />}
          {guide.y && <div style={{ position: "absolute", top: CANVAS_H / 2, left: 0, right: 0, height: "1px", background: "#8800ff" }} />}

          {elements?.map((el) => (
            <div
              key={el.id}
              onPointerDown={(e) => startDrag(e, el)}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                outline: selectedId === el.id ? "2px dashed #8800ff" : "none",
                outlineOffset: "2px",
                cursor: "grab",
              }}
            >
              {el.type === "text" && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: el.fontSize ?? 24,
                    color: el.color ?? "#111",
                    fontWeight: el.fontWeight ?? 400,
                    fontFamily: "Barlow, sans-serif",
                    overflow: "hidden",
                    userSelect: "none",
                  }}
                >
                  {el.text}
                </div>
              )}
              {el.type === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={el.src} alt="" draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none" }} />
              )}
              {el.type === "rect" && <div style={{ width: "100%", height: "100%", background: el.fill ?? "#8800ff" }} />}
              {el.type === "circle" && <div style={{ width: "100%", height: "100%", background: el.fill ?? "#ff0088", borderRadius: "50%" }} />}

              {selectedId === el.id && (
                <div
                  onPointerDown={(e) => startResize(e, el)}
                  style={{
                    position: "absolute",
                    right: "-6px",
                    bottom: "-6px",
                    width: "12px",
                    height: "12px",
                    background: "#8800ff",
                    border: "1px solid #fff",
                    cursor: "nwse-resize",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat sidebar */}
      <div style={{ width: "320px", flexShrink: 0, borderLeft: "1px solid #1a1a1a" }}>
        <ChatPanel password={savedPassword.current} onDesignChanged={loadElements} />
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0a0a0a",
  border: "1px solid #1a1a1a",
  color: "#c0c0c0",
  fontFamily: "'Share Tech Mono', monospace",
  fontSize: "0.8rem",
  padding: "0.4rem 0.5rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
  fontSize: "0.65rem",
  color: "#888",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

function ToolButton({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: danger ? "rgba(255,0,136,0.1)" : "#0a0a0a",
        border: `1px solid ${danger ? "#ff0088" : "#1a1a1a"}`,
        color: danger ? "#ff0088" : "#c0c0c0",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.75rem",
        padding: "0.5rem 0.7rem",
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
