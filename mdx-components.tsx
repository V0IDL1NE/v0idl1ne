import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-[#8800ff] mb-6 mt-8 tracking-tight [text-shadow:0_0_20px_rgba(136,0,255,0.4)] border-b border-[#1a1a1a] pb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[#c0c0c0] mb-4 mt-8 tracking-tight border-b border-[#1a1a1a] pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-[#c0c0c0] mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-[#a0a0a0] leading-7 mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-[#8800ff] hover:text-[#ff0088] underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-[#0a0a0a] border border-[#1a1a1a] text-[#00ffff] px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#0a0a0a] border border-[#1a1a1a] border-l-2 border-l-[#8800ff] p-4 overflow-x-auto mb-4 text-sm font-mono text-[#c0c0c0]">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#8800ff] pl-4 my-4 text-[#404040] italic">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-none mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-[#a0a0a0]">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-[#a0a0a0] before:content-['—'] before:text-[#8800ff] before:mr-2">
        {children}
      </li>
    ),
    hr: () => <hr className="border-[#1a1a1a] my-8" />,
    strong: ({ children }) => (
      <strong className="text-[#c0c0c0] font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-[#ff0088] not-italic">{children}</em>
    ),
  };
}
