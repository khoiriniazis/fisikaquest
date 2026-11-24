"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { supabase } from "@/lib/supabase";
import { saveUserDisplayName } from "@/lib/userNames";

type UserRole = "student" | "teacher";

export default function ProfilePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      if (!supabase) { router.replace("/auth"); return; }
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;
      if (sessionError || !session?.user) { router.replace("/auth"); return; }
      const userEmail = session.user.email ?? "";
      const generatedName = userEmail.split("@")[0] || "Pengguna";
      setEmail(userEmail);
      const { data, error } = await supabase.from("profiles").select("display_name, role").eq("id", session.user.id).maybeSingle();
      if (!active) return;
      if (error) {
        setMessage("Profil belum dapat dimuat. Pastikan migrasi profil terbaru sudah diterapkan di Supabase.");
      } else {
        const savedName = data?.display_name?.trim();
        const initialName = savedName || generatedName;
        setDisplayName(initialName);
        saveUserDisplayName(userEmail, initialName);
        if (!savedName) {
          const { error: updateError } = await supabase.from("profiles").update({ display_name: initialName }).eq("id", session.user.id);
          if (updateError && active) setMessage("Nama otomatis belum tersimpan. Coba simpan nama profil ini.");
        }
        if (data?.role === "teacher") setRole("teacher");
      }
      setReady(true);
    }
    void loadProfile();
    return () => { active = false; };
  }, [router]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/auth"); return; }
    const name = displayName.trim();
    if (!name) { setMessage("Nama tidak boleh kosong."); return; }
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("profiles").update({ display_name: name }).eq("id", user.id);
    setSaving(false);
    if (error) setMessage("Nama belum berhasil disimpan. Silakan coba lagi.");
    else { setDisplayName(name); saveUserDisplayName(email, name); setMessage("Nama profil berhasil diperbarui."); }
  }

  if (!ready) return null;
  const homeHref = role === "teacher" ? "/guru" : "/belajar";

  return <main className="profile-page">
    <header className="classroom-header"><BrandLogo href="/" className="classroom-brand" /><nav><Link href={homeHref}>Kembali ke {role === "teacher" ? "area guru" : "ruang belajar"}</Link></nav></header>
    <section className="profile-card">
      <span className="classroom-kicker">AKUN FISIKAQUEST</span>
      <h1>Profil <em>pengguna.</em></h1>
      <p className="profile-intro">Atur nama yang akan digunakan di ruang belajar.</p>
      <form onSubmit={saveProfile}>
        <label htmlFor="profile-name">Nama tampilan</label>
        <input id="profile-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={60} required />
        <label htmlFor="profile-email">Email</label>
        <input id="profile-email" value={email} readOnly />
        <label htmlFor="profile-role">Jenis akun</label>
        <input id="profile-role" value={role === "teacher" ? "Guru" : "Siswa"} readOnly />
        {message && <p className="profile-message" role="status">{message}</p>}
        <button className="profile-save" type="submit" disabled={saving}>{saving ? "Menyimpan…" : "Simpan perubahan"}</button>
      </form>
    </section>
  </main>;
}
