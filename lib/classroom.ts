export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ClassroomQuiz = {
  id: string;
  title: string;
  topic: string;
  questions: QuizQuestion[];
  createdAt: number;
  durationMinutes?: number;
  expiresAt?: number;
  createdBy?: string;
};

export const QUIZZES_KEY = "fisikaquest-quizzes";
export const SESSION_KEY = "fisikaquest-session";
export const USER_KEY = "fisikaquest-current-user";

export const starterQuiz: ClassroomQuiz = {
  id: "starter-usaha", title: "Misi pertama: usaha", topic: "Konsep Usaha", createdAt: 0,
  questions: [
    { question: "Seseorang mendorong tembok, tetapi tembok tidak berpindah. Berapa usaha pada tembok?", options: ["Usaha bernilai nol", "Usaha sangat besar", "Usaha sama dengan gaya", "Usaha tidak dapat ditentukan"], correctIndex: 0, explanation: "Usaha dalam fisika adalah gaya dikali perpindahan. Karena tembok tidak berpindah, usahanya nol." },
    { question: "Sebuah benda didorong dengan gaya 10 N sejauh 3 m searah gaya. Berapa usaha yang dilakukan?", options: ["3 J", "13 J", "30 J", "0 J"], correctIndex: 2, explanation: "Usaha adalah gaya dikali perpindahan, jadi W = 10 N × 3 m = 30 J." },
    { question: "Dalam satuan SI, usaha diukur menggunakan satuan apa?", options: ["Watt", "Joule", "Newton", "Meter per sekon"], correctIndex: 1, explanation: "Satuan SI untuk usaha adalah joule (J), setara dengan newton meter." },
  ],
};

export function loadQuizzes(): ClassroomQuiz[] {
  const saved = localStorage.getItem(QUIZZES_KEY);
  if (!saved) return [starterQuiz];
  try {
    const stored = JSON.parse(saved) as Array<Record<string, unknown>>;
    if (!Array.isArray(stored)) return [starterQuiz];
    return stored.map((quiz) => ({
      id: String(quiz.id ?? crypto.randomUUID()), title: String(quiz.title ?? "Kuis tanpa judul"),
      topic: String(quiz.topic ?? "Umum"), createdAt: Number(quiz.createdAt ?? 0),
      durationMinutes: quiz.durationMinutes == null ? undefined : Number(quiz.durationMinutes),
      expiresAt: quiz.expiresAt == null ? undefined : Number(quiz.expiresAt),
      createdBy: quiz.createdBy == null ? undefined : String(quiz.createdBy),
      questions: Array.isArray(quiz.questions) ? quiz.questions as QuizQuestion[] : typeof quiz.question === "string"
        ? [{ question: quiz.question, options: Array.isArray(quiz.options) ? quiz.options as string[] : [], correctIndex: Number(quiz.correctIndex ?? 0), explanation: String(quiz.explanation ?? "") }]
        : [],
    }));
  } catch {
    return [starterQuiz];
  }
}
