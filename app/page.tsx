"use client";

import { useState } from "react";

const lessons = [
  { icon: "✣", title: "Konsep Usaha dalam Fisika", description: "Kenali hubungan gaya dan perpindahan melalui contoh yang dekat dengan keseharian.", level: "Dasar" },
  { icon: "ϟ", title: "Energi Kinetik", description: "Pahami kaitan gerak dan massa dengan energi suatu benda.", level: "Dasar" },
  { icon: "△", title: "Energi Potensial", description: "Jelajahi energi tersimpan karena posisi dan ketinggian.", level: "Menengah" },
  { icon: "◉", title: "Hukum Kekekalan Energi Mekanik", description: "Ikuti perubahan energi saat benda bergerak.", level: "Menengah" },
];
const answers = [
  "Usaha selalu besar karena gaya yang diberikan besar.",
  "Usaha nol karena tidak ada perpindahan.",
  "Usaha bertambah jika dorongan semakin lama.",
  "Usaha sama dengan energi kinetik orang tersebut.",
];

function Brand() {
  return <a className="brand" href="#home" aria-label="FisikaQuest, beranda"><span className="brand-mark">⚛</span><span>Fisika<span className="brand-blue">Quest</span></span></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const nav = [["Home", "#home"], ["Materi", "#materi"], ["Tantangan", "#tantangan"], ["Tentang", "#tentang"]];

  return <main id="home" className="min-h-screen bg-white text-slate-800">
    <header className="site-header"><div className="nav-wrap"><Brand />
      <button className="menu-toggle" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Navigasi utama">
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-button" href="/auth" onClick={() => setMenuOpen(false)}>Masuk / Daftar <span aria-hidden="true">↗</span></a>
      </nav></div></header>

    <section className="hero wrap">
      <div className="hero-copy"><span className="eyebrow"><i /> BELAJAR FISIKA JADI LEBIH SERU</span>
        <h1>Taklukkan<br /><em>Usaha dan Energi!</em></h1>
        <p>Pahami konsep fisika melalui visualisasi, tantangan interaktif, dan permainan yang membuatmu belajar sambil bereksplorasi.</p>
        <div className="hero-actions"><a className="button primary" href="/belajar">Mulai Petualangan <span>↗</span></a><a className="button secondary" href="#materi"><span className="play">▶</span> Jelajahi Materi</a></div>
        <div className="hero-note"><span className="avatar-dots"><i>F</i><i>Q</i><i>+</i></span>Materi interaktif dan kuis dari gurumu</div>
      </div>
      <div className="hero-art bg-blue-50/60" role="img" aria-label="Bola meluncur di lintasan menggambarkan perubahan energi"><div className="art-glow" /><div className="orbit orbit-a" /><div className="orbit orbit-b" />
        <svg className="track" viewBox="0 0 560 390" fill="none" aria-hidden="true"><path d="M46 113C136 113 126 297 248 297C370 297 341 163 464 163C500 163 520 185 534 205" stroke="#d6e5ff" strokeWidth="34" strokeLinecap="round" /><path d="M46 113C136 113 126 297 248 297C370 297 341 163 464 163C500 163 520 185 534 205" stroke="white" strokeWidth="3" strokeDasharray="4 12" strokeLinecap="round" /></svg>
        <div className="ball" /><span className="art-tag tag-up">🟡 Energi potensial</span><span className="art-tag tag-down">🔵 Energi gerak</span><div className="spring" aria-hidden="true">〰</div><div className="energy-chip"><b>ϟ</b><span><strong>Energi</strong><small>Terus berubah!</small></span></div><span className="art-spark">✳</span>
      </div><div className="hero-caption"><b>01 / 04</b><i /> Petualangan dimulai dari rasa ingin tahu</div>
    </section>

    <section className="stats wrap" aria-label="Ringkasan pembelajaran">
      <article><span className="stat-icon icon-blue">▤</span><span><b>04</b><small>Materi konsep</small></span><label>TOPIK</label></article>
      <article><span className="stat-icon icon-yellow">◎</span><span><b>10</b><small>Tantangan</small></span><label>SOAL</label></article>
      <article><span className="stat-icon icon-mint">⌁</span><span><b>0<span className="percent">%</span></b><small>Progres belajar</small></span><div className="progress-mini" /></article>
      <p>Angka demonstrasi untuk memulai petualangan belajarmu.</p>
    </section>

    <section className="lessons" id="materi"><div className="wrap"><div className="section-heading"><div><small>PETA PETUALANGAN</small><h2>Mulai dari <em>konsepnya.</em></h2></div><p>Bangun pemahaman dari ide dasarnya. Rumus akan terasa lebih masuk akal setelah kamu tahu ceritanya.</p></div>
      <div className="lesson-grid">{lessons.map((lesson, index) => <article className="lesson-card bg-white transition-all duration-200" key={lesson.title}><div className="lesson-top"><span className={`lesson-icon tone-${index}`}>{lesson.icon}</span><small>0{index + 1}</small></div><h3>{lesson.title}</h3><p>{lesson.description}</p><div className="lesson-bottom"><span><i />{lesson.level}</span><a href="/belajar#materi-siswa">Pelajari <span aria-hidden="true">↗</span></a></div></article>)}</div>
    </div></section>

    <section className="challenge wrap" id="tantangan"><div className="challenge-card"><div className="challenge-copy"><small>✦ &nbsp; MISI PERTAMA</small><h2>Uji<br />Pemahamanmu.</h2><p>Bisakah kamu membedakan usaha dalam kehidupan sehari-hari dengan usaha dalam konsep fisika?</p><button className="button button-yellow" onClick={() => { setSelected(null); setQuizOpen(true); }}>Mulai Tantangan <span>↗</span></button><div className="challenge-meta">◎ &nbsp; 1 pertanyaan &nbsp; · &nbsp; Konsep dasar</div></div>
        <div className="challenge-art" aria-hidden="true"><div className="challenge-orb"><span>🧍</span><b>▥</b></div><div className="push-lines">› ›</div><div className="answer-tag"><b>F = ?</b><small>Saat tak ada perpindahan</small></div><span className="challenge-star">✦</span></div>
      </div></section>

    <section className="steps" id="tentang"><div className="wrap"><div className="steps-heading"><small>BELAJAR DENGAN CARA BARU</small><h2>Petualanganmu, <em>tiga langkah.</em></h2></div><div className="steps-grid">
      <article><span>♧</span><small>LANGKAH 01</small><h3>Pahami konsep</h3><p>Lihat bagaimana ide fisika bekerja lewat visualisasi yang mudah dibayangkan.</p></article>
      <article><span>⌖</span><small>LANGKAH 02</small><h3>Coba tantangan</h3><p>Gunakan pemahamanmu untuk menjawab pertanyaan dan soal konseptual.</p></article>
      <article><span>♜</span><small>LANGKAH 03</small><h3>Tumbuh dari umpan balik</h3><p>Pahami alasan di balik setiap jawaban, lalu lanjutkan dengan percaya diri.</p></article>
    </div></div></section>

    <footer><div className="wrap footer-inner"><div><Brand /><p>Belajar fisika dengan rasa ingin tahu.<br />Satu konsep, satu petualangan.</p></div><span>Media Pembelajaran Fisika SMA <i>✳</i> Usaha &amp; Energi</span><a className="teacher-entry" href="/guru">Area guru ↗</a></div></footer>

    {quizOpen && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setQuizOpen(false); }}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" aria-label="Tutup tantangan" onClick={() => setQuizOpen(false)}>×</button><div className="quiz-kicker">◎ &nbsp; MISI PERTAMA · USAHA</div><div className="quiz-progress" /><small className="question-count">PERTANYAAN 1 DARI 1</small><h2 id="quiz-title">Seseorang mendorong tembok dengan kuat, tetapi tembok tidak berpindah. Menurut konsep usaha dalam fisika, berapakah usaha yang dilakukan pada tembok?</h2>
      <div className="answer-list">{answers.map((answer, index) => <button key={answer} className={`answer-option${selected === index ? index === 1 ? " answer-correct" : " answer-wrong" : ""}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><b>{String.fromCharCode(65 + index)}</b><span>{answer}</span>{selected === index && <strong>{index === 1 ? "✓" : "×"}</strong>}</button>)}</div>
      {selected !== null && <div className={`feedback ${selected === 1 ? "feedback-good" : "feedback-try"}`} role="status"><strong>{selected === 1 ? "Tepat! Usaha pada tembok bernilai nol." : "Belum tepat. Coba pikirkan perpindahannya."}</strong><p>Dalam fisika, usaha terjadi ketika gaya menyebabkan perpindahan. Tembok tetap diam, jadi perpindahannya nol dan usaha pada tembok juga nol.</p></div>}
      <div className="quiz-footer"><span>✦ Belajar itu proses.</span><button onClick={() => setQuizOpen(false)}>{selected === null ? "Nanti dulu" : "Selesai"} ↗</button></div>
    </section></div>}
  </main>;
}
