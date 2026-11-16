"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    const normalizedEmail = email.trim().toLowerCase();
    try {
      const response = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: mode, email: normalizedEmail, password, role }) });
      const result = await response.json() as { email?: string; role?: "student" | "teacher"; error?: string };
      if (!response.ok || !result.email || !result.role) { setMessage(result.error ?? "Terjadi kendala. Silakan coba lagi."); return; }
      localStorage.setItem("fisikaquest-session", result.email);
      localStorage.setItem("fisikaquest-current-user", result.email);
      setSuccess(true);
      window.location.href = result.role === "teacher" ? "/guru" : "/belajar";
    } catch { setMessage("Tidak dapat terhubung ke server. Silakan coba lagi."); }
  }

  return (
    <main className="auth-page">
      <Link className="auth-brand" href="/" aria-label="FisikaQuest beranda"><span className="auth-brand-mark">FQ</span><span>Fisika<span>Quest</span></span></Link>
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-art" aria-hidden="true"><span className="auth-art-kicker">FISIKA BISA JADI SERU</span><span className="auth-orbit auth-orbit-one" /><span className="auth-orbit auth-orbit-two" /><span className="auth-atom">F=ma</span><span className="auth-formula auth-formula-work"><b>W = F x s</b><small>Usaha</small></span><span className="auth-formula auth-formula-energy"><b>Ek = 1/2 mv^2</b><small>Energi kinetik</small></span><span className="auth-art-label">USAHA | ENERGI | PETUALANGAN</span></div>
        <div className="auth-content">
          <span className="auth-eyebrow"><i /> RUANG BELAJAR FISIKAMU</span>
          <h1 id="auth-title">{mode === "login" ? <>Lanjutkan<br /><em>petualanganmu.</em></> : <>Mulai<br /><em>petualanganmu.</em></>}</h1>
          <p className="auth-intro">{mode === "login" ? "Masuk untuk kembali menjelajahi dunia usaha dan energi." : "Buat akun dan mulai memahami fisika dengan cara yang lebih seru."}</p>

          <div className="auth-tabs" role="tablist" aria-label="Jenis akun">
            <button type="button" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "auth-tab active" : "auth-tab"} onClick={() => { setMode("login"); setMessage(""); }}>Masuk</button>
            <button type="button" role="tab" aria-selected={mode === "signup"} className={mode === "signup" ? "auth-tab active" : "auth-tab"} onClick={() => { setMode("signup"); setMessage(""); }}>Daftar</button>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="email" placeholder="nama@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            {mode === "signup" && <div className="auth-role-picker"><span>Daftar sebagai</span><div><button type="button" className={role === "student" ? "selected" : ""} onClick={() => setRole("student")}>Siswa</button><button type="button" className={role === "teacher" ? "selected" : ""} onClick={() => setRole("teacher")}>Guru</button></div></div>}
            <div className="auth-password-label"><label htmlFor="password">Kata sandi</label>{mode === "signup" && <span>Min. 8 karakter</span>}</div>
            <input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="Masukkan kata sandi" value={password} onChange={(event) => setPassword(event.target.value)} minLength={mode === "signup" ? 8 : undefined} required />
            {message && <p className={success ? "auth-message auth-message-success" : "auth-message"} role="status">{message}</p>}
            <button className="auth-submit" type="submit">{mode === "login" ? "Masuk ke akun" : "Buat akun gratis"}<span aria-hidden="true">?</span></button>
          </form>
          <p className="auth-switch">{mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"} <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>{mode === "login" ? "Daftar sekarang" : "Masuk"}</button></p>
          <div className="auth-footnote"><span>?</span> Belajar dimulai dari rasa ingin tahu.</div>
        </div>
      </section>
      <Link className="auth-home" href="/">? Kembali ke beranda</Link>
    </main>
  );
}
