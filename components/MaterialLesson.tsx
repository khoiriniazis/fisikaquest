"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Material, materials } from "@/lib/materials";
import { supabase } from "@/lib/supabase";
import { MaterialIllustration } from "@/components/MaterialIllustration";
import { MaterialQuiz } from "@/components/MaterialQuiz";
import { materialQuizzes } from "@/lib/materialQuizzes";

type MaterialLessonProps = { material: Material };

export function MaterialLesson({ material }: MaterialLessonProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkSession() {
      if (!supabase) { router.replace("/auth"); return; }
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !session?.user) { router.replace("/auth"); return; }
      setReady(true);
    }
    void checkSession();
    return () => { active = false; };
  }, [router]);

  if (!ready) return null;
  const currentIndex = materials.findIndex((item) => item.slug === material.slug);
  const previous = materials[currentIndex - 1];
  const next = materials[currentIndex + 1];

  return <main className="material-page">
    <header className="classroom-header material-header">
      <BrandLogo href="/" className="classroom-brand" />
      <nav><Link href="/belajar">Ruang belajar</Link><Link href="/belajar#kuis-siswa">Kuis dari guru</Link><Link href="/profil">Profil</Link></nav>
    </header>
    <article className="material-lesson">
      <Link className="material-back-link" href="/belajar#materi-siswa">← Semua materi</Link>
      <div className="material-lesson-hero">
        <div className="material-lesson-copy">
          <span className="classroom-kicker">MATERI {material.number} · USAHA DAN ENERGI</span>
          <h1>{material.title}</h1>
          <p>{material.intro}</p>
          <div className="material-formula"><span>RUMUS UTAMA</span><strong>{material.formula}</strong></div>
        </div>
        <MaterialIllustration slug={material.slug} title={material.title} />
      </div>

      <section className="material-content-grid">
        <div className="material-main-content">
          {material.sections.map((section) => <section className="material-section" key={section.heading}>
            <span className="classroom-kicker">{material.number} / KONSEP</span>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>)}

          <section className="material-example">
            <span className="classroom-kicker">CONTOH TERBIMBING</span>
            <h2>Coba hitung bersama</h2>
            <p>{material.example.prompt}</p>
            <button type="button" className="material-solution-toggle" aria-expanded={showSolution} onClick={() => setShowSolution((value) => !value)}>
              {showSolution ? "Sembunyikan penyelesaian" : "Tampilkan langkah penyelesaian"}
            </button>
            {showSolution && <ol className="material-solution-steps">{material.example.steps.map((step) => <li key={step}>{step}</li>)}<li className="material-answer">{material.example.result}</li></ol>}
          </section>

          <section className="material-section material-application-section">
            <span className="classroom-kicker">FISIKA DI SEKITAR KITA</span>
            <h2>Contoh penerapan</h2>
            <ul>{material.applications.map((application) => <li key={application}>{application}</li>)}</ul>
          </section>
        </div>

        <aside className="material-sidebar">
          <section className="material-variable-card">
            <span className="classroom-kicker">PANDUAN SIMBOL</span>
            <h2>Arti setiap besaran</h2>
            <dl>{material.variables.map((item) => <div key={item.symbol}><dt>{item.symbol}</dt><dd><strong>{item.meaning}</strong><span>{item.unit}</span></dd></div>)}</dl>
          </section>
          <section className="material-mistake-card"><span>PERLU DIINGAT</span><p>{material.commonMistake}</p></section>
          <section className="material-takeaway"><span>INTI MATERI</span><p>{material.takeaway}</p></section>
        </aside>
      </section>

      <nav className="material-pagination" aria-label="Navigasi materi">
        {previous ? <Link href={`/belajar/materi/${previous.slug}`}><small>Materi sebelumnya</small><strong>← {previous.shortTitle}</strong></Link> : <span />}
        {next ? <Link href={`/belajar/materi/${next.slug}`}><small>Materi berikutnya</small><strong>{next.shortTitle} →</strong></Link> : <a href="#latihan-materi"><small>Materi selesai</small><strong>Kerjakan latihan →</strong></a>}
      </nav>
      <MaterialQuiz title={material.shortTitle} questions={materialQuizzes[material.slug] ?? []} />
    </article>
    <footer className="classroom-footer"><span>FisikaQuest <i>·</i> Belajar dengan rasa ingin tahu.</span><Link href="/belajar">Kembali ke ruang belajar</Link></footer>
  </main>;
}
