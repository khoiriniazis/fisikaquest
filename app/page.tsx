"use client";

import { useState } from "react";
import { materials } from "@/lib/materials";
import { materialQuizzes } from "@/lib/materialQuizzes";
import { FormulaText } from "@/components/FormulaText";
import { BrandLogo } from "@/components/BrandLogo";

const lessons = [
  { icon: "✣", title: "Konsep Usaha dalam Fisika", description: "Kenali hubungan gaya dan perpindahan melalui contoh yang dekat dengan keseharian.", level: "Dasar" },
  { icon: "ϟ", title: "Energi Kinetik", description: "Pahami kaitan gerak dan massa dengan energi suatu benda.", level: "Dasar" },
  { icon: "△", title: "Energi Potensial", description: "Jelajahi energi tersimpan karena posisi dan ketinggian.", level: "Menengah" },
  { icon: "◉", title: "Hukum Kekekalan Energi Mekanik", description: "Ikuti perubahan energi saat benda bergerak.", level: "Menengah" },
];
function Brand() {
  return <BrandLogo href="#home" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedMaterialSlug, setSelectedMaterialSlug] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
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
      <article><span className="stat-icon icon-blue">▤</span><span><b>06</b><small>Materi konsep</small></span><label>TOPIK</label></article>
      <article><span className="stat-icon icon-yellow">◎</span><span><b>30</b><small>Soal latihan</small></span><label>SOAL</label></article>
      <article><span className="stat-icon icon-mint">⌁</span><span><b>0<span className="percent">%</span></b><small>Progres belajar</small></span><div className="progress-mini" /></article>
      <p>Angka demonstrasi untuk memulai petualangan belajarmu.</p>
    </section>

    <section className="lessons" id="materi"><div className="wrap"><div className="section-heading"><div><small>PETA PETUALANGAN</small><h2>Mulai dari <em>konsepnya.</em></h2></div><p>Bangun pemahaman dari ide dasarnya. Rumus akan terasa lebih masuk akal setelah kamu tahu ceritanya.</p></div>
      <div className="lesson-grid">{lessons.map((lesson, index) => <article className="lesson-card bg-white transition-all duration-200" key={lesson.title}><div className="lesson-top"><span className={`lesson-icon tone-${index}`}>{lesson.icon}</span><small>0{index + 1}</small></div><h3>{lesson.title}</h3><p>{lesson.description}</p><div className="lesson-bottom"><span><i />{lesson.level}</span><a href="/belajar#materi-siswa">Pelajari <span aria-hidden="true">↗</span></a></div></article>)}</div>
    </div></section>

    <section className="challenge wrap" id="tantangan"><div className="challenge-card"><div className="challenge-copy"><small>✦ &nbsp; MISI PERTAMA</small><h2>Uji<br />Pemahamanmu.</h2><p>Pilih satu dari enam materi, lalu kerjakan lima soal pilihan ganda untuk menguji pemahamanmu.</p><button className="button button-yellow" onClick={() => { setSelectedMaterialSlug(null); setQuestionIndex(0); setAnswers([]); setSubmitted(false); }}>Mulai Tantangan <span>↗</span></button><div className="challenge-meta">◎ &nbsp; 5 soal &nbsp; · &nbsp; Pilih materi</div></div>
        <div className="challenge-art" aria-hidden="true"><div className="challenge-orb"><span>🧍</span><b>▥</b></div><div className="push-lines">› ›</div><div className="answer-tag"><b>F = ?</b><small>Saat tak ada perpindahan</small></div><span className="challenge-star">✦</span></div>
      </div></section>

    <section className="steps" id="tentang"><div className="wrap"><div className="steps-heading"><small>BELAJAR DENGAN CARA BARU</small><h2>Petualanganmu, <em>tiga langkah.</em></h2></div><div className="steps-grid">
      <article><span>♧</span><small>LANGKAH 01</small><h3>Pahami konsep</h3><p>Lihat bagaimana ide fisika bekerja lewat visualisasi yang mudah dibayangkan.</p></article>
      <article><span>⌖</span><small>LANGKAH 02</small><h3>Coba tantangan</h3><p>Gunakan pemahamanmu untuk menjawab pertanyaan dan soal konseptual.</p></article>
      <article><span>♜</span><small>LANGKAH 03</small><h3>Tumbuh dari umpan balik</h3><p>Pahami alasan di balik setiap jawaban, lalu lanjutkan dengan percaya diri.</p></article>
    </div></div></section>

    <footer><div className="wrap footer-inner"><div><Brand /><p>Belajar fisika dengan rasa ingin tahu.<br />Satu konsep, satu petualangan.</p></div><span>Media Pembelajaran Fisika SMA <i>✳</i> Usaha &amp; Energi</span><a className="teacher-entry" href="/guru">Area guru ↗</a></div></footer>

    {quizOpen && (() => {
      const material = materials.find((item) => item.slug === selectedMaterialSlug);
      const questions = material ? materialQuizzes[material.slug] ?? [] : [];
      const currentQuestion = questions[questionIndex];
      const correctCount = questions.reduce((total, question, index) => total + (answers[index] === question.correctIndex ? 1 : 0), 0);
      return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && (!material || submitted)) setQuizOpen(false); }}>
        <section className="quiz-modal home-challenge-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
          {(!material || submitted) && <button className="modal-close" aria-label="Tutup tantangan" onClick={() => setQuizOpen(false)}>×</button>}
          <div className="quiz-kicker">◉ &nbsp; MISI PERTAMA · {material ? material.shortTitle.toUpperCase() : "PILIH MATERI"}</div>
          {!material ? <>
            <h2 id="quiz-title">Pilih materi untuk tantanganmu.</h2>
            <p className="home-material-prompt">Setiap tantangan berisi 5 soal pilihan ganda.</p>
            <div className="home-material-picker">{materials.map((item) => <button type="button" key={item.slug} onClick={() => { setSelectedMaterialSlug(item.slug); setQuestionIndex(0); setAnswers(Array((materialQuizzes[item.slug] ?? []).length).fill(-1)); setSubmitted(false); }}><span><b>{item.number}</b><strong>{item.shortTitle}</strong><small>{item.summary}</small></span><em>5 soal →</em></button>)}</div>
          </> : submitted ? <>
            <h2 id="quiz-title">Hasil tantangan: {material.shortTitle}</h2>
            <div className="home-challenge-score"><strong>{correctCount} / {questions.length} benar</strong><span>Skor {Math.round(correctCount / questions.length * 100)} / 100</span></div>
            <div className="home-challenge-review">{questions.map((question, index) => { const correct = answers[index] === question.correctIndex; return <article key={question.question}><div><b>Soal {index + 1}</b><strong className={correct ? "home-answer-correct" : "home-answer-wrong"}>{correct ? "Benar" : "Belum tepat"}</strong></div><p><FormulaText>{question.question}</FormulaText></p><small>Jawabanmu: <FormulaText>{question.options[answers[index]]}</FormulaText></small><small>Jawaban benar: <FormulaText>{question.options[question.correctIndex]}</FormulaText></small><p className="home-answer-explanation"><FormulaText>{question.explanation}</FormulaText></p></article>; })}</div>
            <div className="quiz-footer"><button onClick={() => { setSelectedMaterialSlug(null); setSubmitted(false); }}>Pilih materi lain</button><button onClick={() => setQuizOpen(false)}>Selesai</button></div>
          </> : <>
            <div className="quiz-progress" style={{ background: `linear-gradient(90deg,#83adea ${((questionIndex + 1) / questions.length) * 100}%,#e9eef5 0)` }} />
            <small className="question-count">SOAL {questionIndex + 1} DARI {questions.length}</small>
            <h2 id="quiz-title">{currentQuestion && <FormulaText>{currentQuestion.question}</FormulaText>}</h2>
            <div className="answer-list">{currentQuestion?.options.map((option, optionIndex) => <button key={option} className={`answer-option${answers[questionIndex] === optionIndex ? " answer-selected" : ""}`} aria-pressed={answers[questionIndex] === optionIndex} onClick={() => setAnswers((current) => current.map((answer, index) => index === questionIndex ? optionIndex : answer))}><b>{String.fromCharCode(65 + optionIndex)}</b><span><FormulaText>{option}</FormulaText></span>{answers[questionIndex] === optionIndex && <strong>✓</strong>}</button>)}</div>
            <div className="quiz-footer"><span>{answers.filter((answer) => answer >= 0).length}/{questions.length} terjawab</span>{questionIndex > 0 && <button onClick={() => setQuestionIndex((value) => value - 1)}>Sebelumnya</button>}{questionIndex < questions.length - 1 ? <button disabled={answers[questionIndex] < 0} onClick={() => setQuestionIndex((value) => value + 1)}>Berikutnya →</button> : <button disabled={answers.some((answer) => answer < 0)} onClick={() => setSubmitted(true)}>Lihat hasil →</button>}</div>
          </>}
        </section>
      </div>;
    })()}
  </main>;
}
