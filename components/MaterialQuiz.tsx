"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/classroom";

type Props = { title: string; questions: QuizQuestion[] };

export function MaterialQuiz({ title, questions }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const score = questions.reduce((total, question, i) => total + (answers[i] === question.correctIndex ? 1 : 0), 0);
  function start() {
    setAnswers(Array(questions.length).fill(-1));
    setIndex(0);
    setSubmitted(false);
    setOpen(true);
  }

  return <>
    <button id="latihan-materi" type="button" className="material-quiz-cta" onClick={start}>
      <span><small>SUDAH MEMAHAMI MATERI?</small><strong>Kerjakan 5 soal pilihan ganda tentang {title}.</strong></span><b>Mulai latihan →</b>
    </button>
    {open && <div className="classroom-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="student-question-modal student-quiz-modal" role="dialog" aria-modal="true" aria-labelledby="material-quiz-title">
        <button className="student-modal-close" onClick={() => setOpen(false)} aria-label="Tutup">×</button>
        <span className="classroom-kicker">LATIHAN MATERI · {title}</span><h2 id="material-quiz-title">Latihan {title}</h2>
        {submitted ? <div className="quiz-results">
          <div className="quiz-result-score"><small>HASIL LATIHAN</small><strong>{score * 20}<span>/100</span></strong><p>{score} dari {questions.length} soal benar</p></div>
          <div className="quiz-result-list">{questions.map((question, i) => {
            const isCorrect = answers[i] === question.correctIndex;
            return <article className="quiz-result-item" key={question.question}>
              <div className="quiz-result-heading"><b>Soal {i + 1}</b><span className={isCorrect ? "result-correct" : "result-incorrect"}>{isCorrect ? "Benar" : "Belum tepat"}</span></div>
              <p>{question.question}</p>
              <div className="result-answer"><small>Jawabanmu</small><span>{question.options[answers[i]]}</span></div>
              {!isCorrect && <div className="result-answer result-correct-answer"><small>Jawaban yang benar</small><span>{question.options[question.correctIndex]}</span></div>}
              <div className="result-explanation"><small>Pembahasan</small><p>{question.explanation}</p></div>
            </article>;
          })}</div>
          <div className="quiz-result-actions"><button onClick={start}>Coba lagi</button><button className="student-modal-done" onClick={() => setOpen(false)}>Selesai</button></div>
        </div> : <>
          <div className="student-question-progress">Soal {index + 1} dari {questions.length}<span>{answers.filter((answer) => answer >= 0).length}/{questions.length} terjawab</span></div>
          <p>{questions[index]?.question}</p>
          <div className="student-options">{questions[index]?.options.map((option, optionIndex) => <button key={option} className={answers[index] === optionIndex ? "option-picked" : ""} aria-pressed={answers[index] === optionIndex} onClick={() => setAnswers((current) => current.map((answer, i) => i === index ? optionIndex : answer))}><b>{String.fromCharCode(65 + optionIndex)}</b>{option}</button>)}</div>
          <div className="quiz-navigation">{index > 0 && <button className="quiz-back-button" onClick={() => setIndex((value) => value - 1)}>← Sebelumnya</button>}{index < questions.length - 1 ? <button className="student-modal-done" onClick={() => setIndex((value) => value + 1)}>Soal berikutnya →</button> : <button className="student-modal-done" disabled={answers.some((answer) => answer < 0)} onClick={() => setSubmitted(true)}>Lihat hasil</button>}</div>
          {answers.some((answer) => answer < 0) && <small className="quiz-answer-hint">Jawab semua soal untuk melihat hasil.</small>}
        </>}
      </section>
    </div>}
  </>;
}
