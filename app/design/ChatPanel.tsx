"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPanel({
  password,
  onDesignChanged,
}: {
  password: string;
  onDesignChanged: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    setCurrentTool(null);

    try {
      const res = await fetch("/api/design-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, password }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let changed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "text") {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + data.text,
                };
                return updated;
              });
            } else if (data.type === "tool") {
              setCurrentTool(data.name);
              changed = true;
            } else if (data.type === "done") {
              setCurrentTool(null);
            }
          } catch {}
        }
      }

      if (changed) onDesignChanged();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        style={{
          padding: "0.8rem 1rem",
          borderBottom: "1px solid #1a1a1a",
          color: "#8800ff",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>AI ASSISTANT</span>
        {currentTool && <span style={{ color: "#ff0088" }}>{`> ${currentTool.replace(/_/g, " ")}`}</span>}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "grid", gap: "0.8rem", alignContent: "start" }}>
        {messages.length === 0 && (
          <div style={{ color: "#555", fontSize: "0.75rem", lineHeight: 1.6 }}>
            Tell it what to add or change — "add a big purple heading that says Welcome" or "move that image to the
            center". Changes show up on the canvas as soon as they're made.
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              color: m.role === "user" ? "#c0c0c0" : "#e0d8f0",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            <span style={{ color: m.role === "user" ? "#666" : "#8800ff", fontSize: "0.65rem" }}>
              {m.role === "user" ? "YOU // " : "CLAUDE // "}
            </span>
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "0.8rem", borderTop: "1px solid #1a1a1a", display: "flex", gap: "0.5rem" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Describe a change…"
          rows={2}
          style={{
            flex: 1,
            resize: "none",
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            color: "#c0c0c0",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            padding: "0.5rem 0.7rem",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: "linear-gradient(45deg, #8800ff, #ff0088)",
            border: "none",
            color: "#000",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            padding: "0 1rem",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
