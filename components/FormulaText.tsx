"use client";

import { useEffect, useRef } from "react";

type KatexApi = {
  render: (latex: string, element: HTMLElement, options: { displayMode: boolean; throwOnError: boolean }) => void;
};

declare global {
  interface Window { katex?: KatexApi; }
}

type FormulaTextProps = { children: string; className?: string };
const latexCommand = /\\(?:frac|sqrt|cdot|times|theta|Delta|pi|omega|lambda|mu|sum|int|mathrm|text|left|right|begin|overline|vec)\b/;

function looksLikeFormula(value: string) {
  const text = value.trim();
  if (!text) return false;
  if (latexCommand.test(text)) return true;
  return /^[A-Za-z][A-Za-z0-9{}\\_^]*\s*=\s*[^?]+$/.test(text) && /[+*/^]|_[{A-Za-z0-9]/.test(text);
}

export function FormulaText({ children, className }: FormulaTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.replaceChildren();
    const katex = window.katex;
    if (!katex) {
      host.textContent = children;
      return;
    }

    const value = children.replace(/\\_/g, "_");
    const matches = [...value.matchAll(/\\\(([\s\S]+?)\\\)|\$([^$\n]+)\$/g)];
    if (matches.length === 0 && looksLikeFormula(value)) {
      katex.render(value, host, { displayMode: true, throwOnError: false });
      return;
    }
    if (matches.length === 0) {
      host.textContent = children;
      return;
    }

    let cursor = 0;
    for (const match of matches) {
      const start = match.index ?? 0;
      if (start > cursor) host.append(document.createTextNode(value.slice(cursor, start)));
      const formula = document.createElement("span");
      host.append(formula);
      katex.render(match[1] ?? match[2] ?? "", formula, { displayMode: false, throwOnError: false });
      cursor = start + match[0].length;
    }
    if (cursor < value.length) host.append(document.createTextNode(value.slice(cursor)));
  }, [children]);

  return <span ref={ref} className={className}>{children}</span>;
}
