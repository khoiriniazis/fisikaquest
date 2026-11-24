"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ClassroomQuiz, loadQuizzes } from "../../lib/classroom";
import { supabase } from "@/lib/supabase";
import { materials } from "@/lib/materials";
import { FormulaText } from "@/components/FormulaText";
import { saveUserDisplayName } from "@/lib/userNames";

type Attempt = { score: number; answers: number[]; completedAt: number };
type Attempts = Record<string, Attempt>;

const getTimestamp = () => Date.now();

export default function StudentPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [quizzes, setQuizzes] = useState<ClassroomQuiz[]>([]);
  const [attempts, setAttempts] = useState<Attempts>({});
  const [active, setActive] = useState<ClassroomQuiz | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const submitQuizRef = useRef<(force?: boolean) => void>(() => {});

  useEffect(() => {
    let active = true;
    async function restoreSession() {
      if (!supabase) { router.replace("/auth"); return; }
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !session?.user) { router.replace("/auth"); return; }
      const user = session.user.email ?? session.user.id;
      setEmail(user);
      setDisplayName(user.split("@")[0] || "Siswa");
      const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", session.user.id).maybeSingle();
      const name = profile?.display_name?.trim() || user.split("@")[0] || "Siswa";
      if (active) { setDisplayName(name); saveUserDisplayName(user, name); }
      setQuizzes(loadQuizzes().filter((quiz) => Boolean(quiz.createdBy) && (!quiz.expiresAt || quiz.expiresAt > Date.now())));
      try { setAttempts(JSON.parse(localStorage.getItem(`fisikaquest-attempts-${user}`) || "{}")); }
      catch { setAttempts({}); }
      setAuthReady(true);
    }
    void restoreSession();
    return () => { active = false; };
  }, [router]);

  async function logout() {
    await supabase?.auth.signOut();
    router.replace("/");
  }


  function openQuiz(quiz: ClassroomQuiz) {
    if (quiz.expiresAt && quiz.expiresAt <= getTimestamp()) {
      setQuizzes((current) => current.filter((item) => item.id !== quiz.id));
      return;
    }
    const savedAttempt = attempts[quiz.id];
    const previous = savedAttempt?.answers.length === quiz.questions.length ? savedAttempt : undefined;
    setActive(quiz);
    setQuestionIndex(0);
    setAnswers(previous?.answers ?? Array(quiz.questions.length).fill(-1));
    setSubmitted(Boolean(previous));
    setScore(previous?.score ?? 0);
    setTimeLeft((quiz.durationMinutes ?? 15) * 60);
    setAutoSubmitted(false);
  }

  function submitQuiz(force = false) {
    if (!active || (!force && answers.some((answer) => answer < 0))) return;
    const correct = active.questions.reduce((total, question, index) => total + (answers[index] === question.correctIndex ? 1 : 0), 0);
    const finalScore = Math.round((correct / active.questions.length) * 1000) / 10;
    const nextAttempts = { ...attempts, [active.id]: { score: finalScore, answers, completedAt: getTimestamp() } };
    localStorage.setItem(`fisikaquest-attempts-${email}`, JSON.stringify(nextAttempts));
    setAttempts(nextAttempts);
    setScore(finalScore);
    setAutoSubmitted(force);
    setSubmitted(true);
  }

  useEffect(() => { submitQuizRef.current = submitQuiz; });

  useEffect(() => {
    if (!active || submitted) return;
    if (timeLeft <= 0) { submitQuizRef.current(true); return; }
    const timer = window.setTimeout(() => setTimeLeft((remaining) => remaining - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [active, submitted, timeLeft]);


  if (!authReady) return null;

  const currentQuestion = active?.questions[questionIndex];

  return <main className="classroom-page">
    <header className="classroom-header"><BrandLogo href="/" className="classroom-brand" /><nav><a href="#materi-siswa">Materi</a><a href="#kuis-siswa">Kuis</a><Link href="/profil" className="student-email">{displayName}</Link><button onClick={logout}>Keluar</button></nav></header>
    <section className="classroom-section quiz-section" id="kuis-siswa"><div className="classroom-section-heading"><div><span className="classroom-kicker">TANTANGAN DARI GURU</span><h2>Waktunya <em>mencoba.</em></h2></div><p>Kamu bisa memilih dan mengubah jawaban sampai menekan tombol submit di akhir kuis.</p></div><div className="student-quiz-grid">{quizzes.map((quiz,index)=>{const attempt=attempts[quiz.id];return <article className={`student-quiz-card${attempt?" student-quiz-completed":""}`} key={quiz.id}><div className="student-quiz-icon">0{index+1}</div><span className="quiz-topic-label">{quiz.topic}</span>{attempt&&<span className="student-complete-badge">✓ Selesai · {attempt.score}/100</span>}<h3>{quiz.title}</h3><p>Guru: {quiz.createdByName || "Guru FisikaQuest"}</p><p>{quiz.questions.length} soal · estimasi {Math.max(1,quiz.questions.length*2)} menit</p><button onClick={()=>openQuiz(quiz)}>{attempt?"Lihat hasil":"Mulai kuis"}<span>↗</span></button></article>;})}{quizzes.length===0&&<p className="empty-quizzes">Belum ada kuis. Cek kembali nanti saat guru sudah membagikan kuis.</p>}</div></section>
    <section className="classroom-hero"><div><span className="classroom-kicker">RUANG BELAJAR SISWA</span><h1>Halo, <em>{displayName || "pembelajar"}.</em><br/>Siap belajar hari ini?</h1><p>Pelajari konsep usaha dan energi, lalu uji pemahamanmu lewat kuis dari guru.</p><a className="classroom-cta" href="#materi-siswa">Jelajahi materi <span>↓</span></a></div><div className="classroom-hero-visual"><div className="hero-visual-orbit"/><div className="hero-visual-core">W</div><span className="hero-visual-chip">W = F × s</span><small>USAHA &amp; ENERGI</small></div></section>
    <section className="classroom-section" id="materi-siswa"><div className="classroom-section-heading"><div><span className="classroom-kicker">PETA BELAJAR</span><h2>Materi <em>pilihan.</em></h2></div><p>Enam materi inti, lengkap dengan rumus dan contoh hitung untuk membantu memahami usaha dan energi.</p></div><div className="topic-grid">{materials.map((topic)=><article className={`topic-card topic-${topic.tint}`} key={topic.slug}><div className="topic-top"><span>{topic.number}</span><b>{topic.formula}</b></div><h3>{topic.title}</h3><p>{topic.summary}</p><Link href={`/belajar/materi/${topic.slug}`}>Buka materi lengkap <span>↗</span></Link></article>)}</div></section>

    <footer className="classroom-footer"><span>FisikaQuest <i>·</i> Belajar dengan rasa ingin tahu.</span><Link href="/guru">Area guru</Link></footer>
    {active&&<div className="classroom-backdrop" onMouseDown={(event)=>{if(event.target===event.currentTarget&&submitted)setActive(null);}}><section className="student-question-modal student-quiz-modal" role="dialog" aria-modal="true" aria-labelledby="student-question-title">{submitted&&<button className="student-modal-close" onClick={()=>setActive(null)} aria-label="Tutup">×</button>}<span className="classroom-kicker">{active.topic}</span><h2 id="student-question-title">{active.title}</h2>{!submitted&&<div className="quiz-time"><span>Waktu tersisa</span><strong className={timeLeft<=60?"quiz-time-warning":""}>{Math.floor(timeLeft/60).toString().padStart(2,"0")}:{(timeLeft%60).toString().padStart(2,"0")}</strong></div>}{submitted&&autoSubmitted&&<div className="quiz-timeout-note" role="status">Waktu habis. Jawaban yang sudah dipilih dikirim otomatis.</div>}
      {submitted?<div className="quiz-results"><div className="quiz-result-score"><small>SKOR AKHIR</small><strong>{score}<span>/100</span></strong><p>{active.questions.filter((question,index)=>answers[index]===question.correctIndex).length} dari {active.questions.length} soal benar · {Math.round(1000/active.questions.length)/10} poin per soal</p></div><div className="quiz-result-list">{active.questions.map((question,index)=>{const isCorrect=answers[index]===question.correctIndex;return <article className="quiz-result-item" key={`${index}-${question.question}`}><div className="quiz-result-heading"><b>Soal {index+1}</b><span className={isCorrect?"result-correct":"result-incorrect"}>{isCorrect?"Benar":"Belum tepat"}</span></div><p><FormulaText>{question.question}</FormulaText></p><div className="result-answer"><small>Jawabanmu</small><span><FormulaText>{answers[index]>=0?question.options[answers[index]]:"Tidak dijawab"}</FormulaText></span></div>{!isCorrect&&<div className="result-answer result-correct-answer"><small>Jawaban benar</small><span><FormulaText>{question.options[question.correctIndex]}</FormulaText></span></div>}<div className="result-explanation"><small>Pembahasan</small><p><FormulaText>{question.explanation}</FormulaText></p></div></article>;})}</div><div className="quiz-result-actions"><button className="student-modal-done" onClick={()=>setActive(null)}>Selesai</button></div></div>:<><div className="student-question-progress">Soal {questionIndex+1} dari {active.questions.length}<span>{answers.filter((answer)=>answer>=0).length}/{active.questions.length} terjawab</span></div><p>{currentQuestion && <FormulaText>{currentQuestion.question}</FormulaText>}</p><div className="student-options">{currentQuestion?.options.map((option,index)=><button key={`${index}-${option}`} className={answers[questionIndex]===index?"option-picked":""} aria-pressed={answers[questionIndex]===index} onClick={()=>setAnswers((current)=>current.map((answer,answerIndex)=>answerIndex===questionIndex?index:answer))}><b>{String.fromCharCode(65+index)}</b><FormulaText>{option}</FormulaText></button>)}</div><div className="quiz-navigation">{questionIndex>0&&<button className="quiz-back-button" onClick={()=>setQuestionIndex((value)=>value-1)}>← Sebelumnya</button>}{questionIndex<active.questions.length-1?<button className="student-modal-done" onClick={()=>setQuestionIndex((value)=>value+1)}>Soal berikutnya →</button>:<button className="student-modal-done" disabled={answers.some((answer)=>answer<0)} onClick={()=>submitQuiz()}>Submit kuis</button>}</div>{answers.some((answer)=>answer<0)&&<small className="quiz-answer-hint">Jawab semua soal untuk mengirim kuis.</small>}</>}
    </section></div>}
  </main>;
}
