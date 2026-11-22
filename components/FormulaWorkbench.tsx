"use client";

import { useEffect, useRef, useState } from "react";

type Mathfield = HTMLElement & {
  value: string;
  insert: (latex: string) => void;
};

type KatexApi = {
  render: (latex: string, element: HTMLElement, options: { displayMode: boolean; throwOnError: boolean }) => void;
};

declare global {
  interface Window {
    katex?: KatexApi;
    mathVirtualKeyboard?: {
      container: HTMLElement;
      visible: boolean;
      show: () => void;
      hide: () => void;
    };
  }
}

const shortcuts = [
  ["Δ", String.raw`\Delta`], ["θ", String.raw`\theta`], ["ω", String.raw`\omega`],
  ["λ", String.raw`\lambda`], ["μ", String.raw`\mu`], ["π", String.raw`\pi`],
  ["Ω", String.raw`\Omega`], ["ħ", String.raw`\hbar`],
  ["Vektor", String.raw`\vec{}`], ["Integral", String.raw`\int_{ }^{ }`],
  ["∮", String.raw`\oint`], ["∂/∂x", String.raw`\frac{\partial}{\partial x}`],
  ["Σ", String.raw`\sum_{ }^{ }`], ["a/b", String.raw`\frac{}{}`],
  ["√", String.raw`\sqrt{}`], ["xⁿ", String.raw`^{}`], ["xₙ", String.raw`_{}`],
] as const;

const templates = [
  ["", "Pilih template rumus"],
  [String.raw`F=G\frac{m_1m_2}{r^2}`, "Hukum Gravitasi Newton"],
  [String.raw`i\hbar\frac{\partial}{\partial t}\Psi=\hat{H}\Psi`, "Persamaan Schrödinger"],
  [String.raw`\nabla\cdot\vec{E}=\frac{\rho}{\varepsilon_0},\quad\nabla\times\vec{B}=\mu_0\vec{J}+\mu_0\varepsilon_0\frac{\partial\vec{E}}{\partial t}`, "Persamaan Maxwell"],
  [String.raw`s=v_0t+\frac{1}{2}at^2`, "Kinematika GLBB"],
  [String.raw`\Delta U=Q-W`, "Hukum Termodinamika I"],
] as const;

type FormulaWorkbenchProps = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
};

export function FormulaWorkbench({ value, onChange, onClose }: FormulaWorkbenchProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<Mathfield | null>(null);
  const changeRef = useRef(onChange);
  const previewRef = useRef<HTMLDivElement>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [latex, setLatex] = useState(value);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => { changeRef.current = onChange; }, [onChange]);

  // Create the MathLive custom element after the CDN script registers it.
  useEffect(() => {
    let cancelled = false;
    const mountField = async () => {
      await customElements.whenDefined("math-field");
      if (cancelled || !hostRef.current) return;
      const field = document.createElement("math-field") as Mathfield;
      field.className = "formula-mathfield";
      field.setAttribute("math-virtual-keyboard-policy", "manual");
      field.setAttribute("smart-mode", "on");
      field.value = value;
      field.addEventListener("input", () => {
        setLatex(field.value);
        changeRef.current(field.value);
      });
      hostRef.current.replaceChildren(field);
      fieldRef.current = field;
    };
    void mountField();
    return () => { cancelled = true; if (window.mathVirtualKeyboard?.container === dockRef.current) window.mathVirtualKeyboard.hide(); fieldRef.current = null; };
    // The field is created once; value changes are synced by the next effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLatex(value);
    if (fieldRef.current && fieldRef.current.value !== value) fieldRef.current.value = value;
  }, [value]);

  // KaTeX paints the current LaTeX in the preview as the user types.
  useEffect(() => {
    if (!previewRef.current) return;
    if (!latex.trim()) {
      previewRef.current.textContent = "Pratinjau rumus akan tampil di sini.";
      return;
    }
    if (!window.katex) {
      previewRef.current.textContent = "Memuat pratinjau rumus…";
      return;
    }
    window.katex.render(latex, previewRef.current, { displayMode: true, throwOnError: false });
  }, [latex]);

  function insert(latexFragment: string) {
    const field = fieldRef.current;
    if (!field) return;
    field.focus();
    field.insert(latexFragment);
    setLatex(field.value);
    changeRef.current(field.value);
  }

  function applyTemplate(next: string) {
    if (!next || !fieldRef.current) return;
    fieldRef.current.value = next;
    fieldRef.current.focus();
    setLatex(next);
    changeRef.current(next);
  }

  async function copyLatex() {
    try {
      await navigator.clipboard.writeText(latex);
      setCopyStatus("LaTeX disalin.");
    } catch {
      setCopyStatus("Gagal menyalin LaTeX.");
    }
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  function toggleKeyboard() {
    const keyboard = window.mathVirtualKeyboard;
    if (!keyboard || !dockRef.current) return;
    keyboard.container = dockRef.current;
    if (keyboardOpen) keyboard.hide();
    else {
      fieldRef.current?.focus();
      keyboard.show();
    }
    setKeyboardOpen(!keyboardOpen);
  }

  return <section className="formula-workbench" aria-label="Editor rumus fisika">
    <div className="formula-workbench-heading"><strong>Editor rumus visual</strong><button type="button" onClick={onClose}>Tutup editor</button></div>
    <div className="formula-field-host" ref={hostRef} />
    <div className="formula-toolbar" aria-label="Pintasan rumus fisika">
      {shortcuts.map(([label, fragment]) => <button type="button" key={label} onMouseDown={(event) => event.preventDefault()} onClick={() => insert(fragment)} title={`Sisipkan ${label}`}>{label}</button>)}
      <button type="button" className="formula-keyboard-toggle" onClick={toggleKeyboard}>{keyboardOpen ? "Tutup keyboard" : "Keyboard"}</button>
    </div>
    <label className="formula-template-label">Template rumus
      <select defaultValue="" onChange={(event) => applyTemplate(event.target.value)}>
        {templates.map(([latexTemplate, title]) => <option value={latexTemplate} key={title}>{title}</option>)}
      </select>
    </label>
    <div className="formula-preview-block"><span>Pratinjau</span><div className="formula-preview" ref={previewRef} aria-live="polite" /></div>
    <div className="formula-raw-heading"><span>Raw LaTeX String</span><button type="button" onClick={copyLatex}>Copy LaTeX</button></div>
    <textarea className="formula-raw" readOnly value={latex} aria-label="Raw LaTeX String" />
    <span className="formula-copy-status" role="status">{copyStatus}</span>
    <div className={`formula-keyboard-dock${keyboardOpen ? " is-open" : ""}`} ref={dockRef} aria-hidden={!keyboardOpen} />
  </section>;
}
