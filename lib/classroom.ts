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

export function loadQuizzes(): ClassroomQuiz[] {
  const saved = localStorage.getItem(QUIZZES_KEY);
  if (!saved) return [];
  try {
    const stored = JSON.parse(saved) as Array<Record<string, unknown>>;
    if (!Array.isArray(stored)) return [];
    const loaded = stored.map((quiz) => ({
      id: String(quiz.id ?? crypto.randomUUID()), title: String(quiz.title ?? "Kuis tanpa judul"),
      topic: String(quiz.topic ?? "Umum"), createdAt: Number(quiz.createdAt ?? 0),
      durationMinutes: quiz.durationMinutes == null ? undefined : Number(quiz.durationMinutes),
      expiresAt: quiz.expiresAt == null ? undefined : Number(quiz.expiresAt),
      createdBy: quiz.createdBy == null ? undefined : String(quiz.createdBy),
      questions: Array.isArray(quiz.questions) ? quiz.questions as QuizQuestion[] : typeof quiz.question === "string"
        ? [{ question: quiz.question, options: Array.isArray(quiz.options) ? quiz.options as string[] : [], correctIndex: Number(quiz.correctIndex ?? 0), explanation: String(quiz.explanation ?? "") }]
        : [],
    }));
    const manualQuizzes = loaded.filter((quiz) => quiz.id !== "starter-usaha");
    if (manualQuizzes.length !== loaded.length) localStorage.setItem(QUIZZES_KEY, JSON.stringify(manualQuizzes));
    return manualQuizzes;
  } catch {
    localStorage.removeItem(QUIZZES_KEY);
    return [];
  }
}
