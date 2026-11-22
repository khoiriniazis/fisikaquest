"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ClassroomQuiz, loadQuizzes, QUIZZES_KEY, QuizQuestion } from "../../lib/classroom";
import { supabase } from "@/lib/supabase";

type DraftQuestion = QuizQuestion & { id: string };
type QuizSubmission = { student: string; score: number; completedAt: number };
type QuizSubmissions = Record<string, QuizSubmission[]>;
const loadQuizSubmissions = (quizzes: ClassroomQuiz[]): QuizSubmissions => {
  const submissions: QuizSubmissions = {};
  const quizIds = new Set(quizzes.map((quiz) => quiz.id));
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key?.startsWith("fisikaquest-attempts-")) continue;
    const student = key.slice("fisikaquest-attempts-".length);
    try {
      const attempts = JSON.parse(localStorage.getItem(key) || "{}") as Record<string, { score?: number; completedAt?: number }>;
      for (const [quizId, attempt] of Object.entries(attempts)) {
        if (!quizIds.has(quizId) || typeof attempt?.score !== "number") continue;
        (submissions[quizId] ??= []).push({ student, score: attempt.score, completedAt: Number(attempt.completedAt) || 0 });
      }
    } catch { /* Abaikan data hasil yang tidak valid. */ }
  }
  for (const entries of Object.values(submissions)) entries.sort((a, b) => b.completedAt - a.completedAt);
  return submissions;
};
const newQuestion = (): DraftQuestion => ({ id: crypto.randomUUID(), question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" });

export default function TeacherPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<ClassroomQuiz[]>([]);
  const [submissions, setSubmissions] = useState<QuizSubmissions>({});
  const [resultsQuizId, setResultsQuizId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    let active = true;
    async function restoreTeacherSession() {
      if (!supabase) { router.replace("/auth"); return; }
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !session?.user) { router.replace("/auth"); return; }
      const { data: profile, error: profileError } = await supabase
        .from("profiles").select("role").eq("id", session.user.id).maybeSingle();
      if (!active) return;
      if (profileError || profile?.role !== "teacher") { router.replace("/belajar"); return; }
      const user = session.user.email ?? session.user.id;
      setTeacherEmail(user);
      const allQuizzes = loadQuizzes();
      setQuizzes(allQuizzes);
      setSubmissions(loadQuizSubmissions(allQuizzes.filter((quiz) => quiz.createdBy === user)));
      setQuestions([newQuestion()]);
      setReady(true);
    }
    void restoreTeacherSession();
    return () => { active = false; };
  }, [router]);

  async function logout() {
    await supabase?.auth.signOut();
    router.replace("/");
  }

  function updateQuestion(id: string, update: Partial<DraftQuestion>) {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, ...update } : question));
  }
  function updateOption(id: string, optionIndex: number, value: string) {
    setQuestions((current) => current.map((question) => question.id === id ? { ...question, options: question.options.map((option, index) => index === optionIndex ? value : option) } : question));
  }
  function createQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const existingQuiz = editingQuizId ? quizzes.find((item) => item.id === editingQuizId && item.createdBy === teacherEmail) : undefined;
    if (editingQuizId && !existingQuiz) { setNotice("Kuis ini hanya dapat diedit oleh guru pembuatnya."); return; }
    const quiz: ClassroomQuiz = {
      id: existingQuiz?.id ?? crypto.randomUUID(), title: String(data.get("title")), topic: String(data.get("topic")),
      questions: questions.map(({ id: _id, ...question }) => ({ ...question, question: question.question.trim(), options: question.options.map((option) => option.trim()), explanation: question.explanation.trim() })),
      createdAt: existingQuiz?.createdAt ?? Date.now(),
      durationMinutes: Number(data.get("durationMinutes")),
      createdBy: teacherEmail,
      expiresAt: data.get("expiresAt") ? new Date(String(data.get("expiresAt"))).getTime() : undefined,
    };
    const next = existingQuiz ? quizzes.map((item) => item.id === quiz.id ? quiz : item) : [quiz, ...quizzes];
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(next));
    setQuizzes(next);
    event.currentTarget.reset();
    setEditingQuizId(null);
    setQuestions([newQuestion()]);
    setNotice(existingQuiz ? "Perubahan kuis berhasil disimpan." : `Kuis dengan ${quiz.questions.length} soal berhasil diterbitkan untuk siswa.`);
  }
  function removeQuiz(id: string) {
    const quiz = quizzes.find((item) => item.id === id && item.createdBy === teacherEmail);
    if (!quiz || !window.confirm("Yakin ingin menghapus kuis \"" + quiz.title + "\"?")) return;
    const next = quizzes.filter((quiz) => quiz.id !== id || quiz.createdBy !== teacherEmail);
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(next));
    setQuizzes(next);
    setNotice("Kuis dihapus.");
  }

  if (!ready) return null;

  const ownQuizzes = quizzes.filter((quiz) => quiz.createdBy === teacherEmail);

  return <main className="teacher-page">
    <header className="classroom-header"><Link href="/" className="classroom-brand"><span>FQ</span> Fisika<span>Quest</span></Link><nav><span className="teacher-badge">PANEL GURU</span><Link href="/belajar">Lihat tampilan siswa ↗</Link><Link href="/">Beranda</Link><button onClick={logout}>Keluar</button></nav></header>
    <section className="teacher-wrap"><div className="teacher-intro"><span className="classroom-kicker">RUANG KREASI PENGAJAR</span><h1>Siapkan tantangan<br/><em>untuk kelasmu.</em></h1><p>Buat satu set kuis dengan beberapa soal, pilih jawaban benar, dan tambahkan pembahasan untuk siswa.</p></div>
      <div className="teacher-layout"><form ref={formRef} className="teacher-form" onSubmit={createQuiz}><h2>{editingQuizId ? "Edit kuis" : "Buat kuis baru"}</h2><p>Setiap judul kuis dapat berisi beberapa soal pilihan ganda.</p>
        <label>Judul kuis<input name="title" placeholder="Contoh: Memahami usaha" required/></label>
        <label>Topik<select name="topic" defaultValue="Konsep Usaha"><option>Konsep Usaha</option><option>Energi Kinetik</option><option>Energi Potensial</option><option>Kekekalan Energi</option></select></label><div className="quiz-settings-fields"><label>Waktu pengerjaan (menit)<input type="number" name="durationMinutes" min="1" max="180" defaultValue="15" required/></label><label>Tenggat (tanggal dan jam)<input type="datetime-local" name="expiresAt" required/></label></div>
        <div className="teacher-question-list">{questions.map((question, index) => <fieldset className="teacher-question-editor" key={question.id}><legend>Soal {index + 1}</legend>
          {questions.length > 1 && <button className="remove-question" type="button" onClick={() => setQuestions((current) => current.filter((item) => item.id !== question.id))}>Hapus soal</button>}
          <label>Pertanyaan<textarea value={question.question} onChange={(event) => updateQuestion(question.id, { question: event.target.value })} placeholder="Tuliskan pertanyaan untuk siswa..." rows={3} required/></label><small className="math-format-hint">Rumus bisa ditulis dengan simbol seperti ½, ×, √, ², ³, ₖ, dan ₚ. Contoh: W = F × s atau Eₖ = ½mv².</small>
          <small className="math-format-hint">Gunakan simbol pangkat dan indeks pada pilihan jawaban juga, misalnya m/s² atau Eₚ.</small><div className="teacher-options">{question.options.map((option, optionIndex) => <label key={optionIndex}>Pilihan {String.fromCharCode(65 + optionIndex)}<input value={option} onChange={(event) => updateOption(question.id, optionIndex, event.target.value)} placeholder={`Jawaban ${String.fromCharCode(65 + optionIndex)}`} required/></label>)}</div>
          <label>Jawaban yang benar<select value={question.correctIndex} onChange={(event) => updateQuestion(question.id, { correctIndex: Number(event.target.value) })}>{question.options.map((_, optionIndex) => <option key={optionIndex} value={optionIndex}>{String.fromCharCode(65 + optionIndex)}</option>)}</select></label>
          <label>Pembahasan<textarea value={question.explanation} onChange={(event) => updateQuestion(question.id, { explanation: event.target.value })} placeholder="Jelaskan alasan jawaban benar..." rows={2} required/></label><small className="math-format-hint">Contoh pembahasan: Eₖ = ½mv², sehingga jika v menjadi 2 kali, energinya menjadi 4 kali.</small>
        </fieldset>)}</div>
        <button className="add-question-button" type="button" onClick={() => setQuestions((current) => [...current, newQuestion()])}>＋ Tambah soal</button>
        {notice&&<div className="teacher-notice" role="status">{notice}</div>}
        <button className="teacher-submit">{editingQuizId ? "Simpan perubahan" : "Terbitkan kuis"} <span>?</span></button>{editingQuizId && <button type="button" className="add-question-button" onClick={() => { setEditingQuizId(null); formRef.current?.reset(); setQuestions([newQuestion()]); }}>Batal edit</button>}
      </form>
      <aside className="teacher-list"><div className="teacher-list-heading"><div><span className="classroom-kicker">BANK KUIS</span><h2>Kuis tersedia</h2></div><span>{ready?ownQuizzes.length:0}</span></div>{ownQuizzes.map((quiz)=><article className="teacher-quiz-row" key={quiz.id}><div><span>{quiz.topic} · {quiz.questions.length} soal · {quiz.durationMinutes ?? 15} menit ·</span><h3>{quiz.title}</h3><p>{quiz.questions[0]?.question}</p><p className="teacher-expiry">{quiz.expiresAt ? `Tenggat ${new Date(quiz.expiresAt).toLocaleString("id-ID")}` : "Tanpa tenggat"}</p></div>{quiz.createdBy === teacherEmail && <div className="teacher-quiz-actions"><button type="button" onClick={() => { const form=formRef.current; if (!form) return; const title=form.elements.namedItem("title") as HTMLInputElement; const topic=form.elements.namedItem("topic") as HTMLSelectElement; const duration=form.elements.namedItem("durationMinutes") as HTMLInputElement; const expiry=form.elements.namedItem("expiresAt") as HTMLInputElement; title.value=quiz.title; topic.value=quiz.topic; duration.value=String(quiz.durationMinutes ?? 15); expiry.value=quiz.expiresAt ? new Date(quiz.expiresAt-new Date(quiz.expiresAt).getTimezoneOffset()*60000).toISOString().slice(0,16) : ""; setQuestions(quiz.questions.map((question)=>({...question,id:crypto.randomUUID()}))); setEditingQuizId(quiz.id); form.scrollIntoView({behavior:"smooth",block:"start"}); }}>Edit</button><button type="button" onClick={()=>removeQuiz(quiz.id)} aria-label={`Hapus ${quiz.title}`}>Hapus</button><button type="button" onClick={()=>setResultsQuizId((current)=>current===quiz.id?null:quiz.id)} aria-expanded={resultsQuizId===quiz.id} aria-controls={`hasil-${quiz.id}`}>Hasil ({submissions[quiz.id]?.length ?? 0})</button></div>}{resultsQuizId===quiz.id && <div className="teacher-results" id={`hasil-${quiz.id}`}><h4>Daftar siswa</h4>{(submissions[quiz.id]?.length ?? 0) === 0 ? <p>Belum ada siswa yang mengisi kuis ini.</p> : <ul>{submissions[quiz.id].map((submission)=><li key={submission.student}><span>{submission.student}<small>{submission.completedAt ? new Date(submission.completedAt).toLocaleString("id-ID") : "Waktu tidak tersedia"}</small></span><strong>{submission.score} / 100</strong></li>)}</ul>}</div>}</article>)}</aside></div>
    </section><footer className="classroom-footer"><span>FisikaQuest <i>·</i> Materi dan kuis untuk belajar bermakna.</span><Link href="/">Kembali ke beranda</Link></footer>
  </main>;
}
