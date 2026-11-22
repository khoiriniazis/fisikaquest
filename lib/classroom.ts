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

export const starterQuiz: ClassroomQuiz = {
  id: "starter-usaha", title: "Misi usaha dan energi: 10 soal", topic: "Usaha dan Energi", createdAt: 0, durationMinutes: 20,
  questions: [
    { question: "Seseorang mendorong tembok, tetapi tembok tidak berpindah. Berapa usaha yang dilakukan pada tembok?", options: ["0 J", "10 J", "Sama dengan besar gaya", "Tidak dapat ditentukan"], correctIndex: 0, explanation: "Usaha pada benda adalah komponen gaya searah perpindahan dikali perpindahan. Karena tembok tidak berpindah, usahanya nol." },
    { question: "Gaya 10 N membentuk sudut 60 derajat terhadap perpindahan 4 m. Berapa usaha oleh gaya tersebut?", options: ["40 J", "20 J", "10 J", "5 J"], correctIndex: 1, explanation: "W = F s cos(theta) = 10 x 4 x cos(60 derajat) = 40 x 0,5 = 20 J." },
    { question: "Benda bermassa 2 kg bergerak dengan kecepatan 3 m/s. Berapa energi kinetiknya?", options: ["6 J", "9 J", "12 J", "18 J"], correctIndex: 1, explanation: "Ek = 1/2 m v^2 = 1/2 x 2 x 3^2 = 9 J." },
    { question: "Jika kecepatan benda menjadi dua kali semula, energi kinetiknya menjadi berapa kali?", options: ["2 kali", "3 kali", "4 kali", "8 kali"], correctIndex: 2, explanation: "Energi kinetik sebanding dengan kuadrat kecepatan. Jika v menjadi 2v, Ek menjadi (2v)^2 atau 4 kali." },
    { question: "Benda 2 kg berada pada ketinggian 5 m. Gunakan g = 10 m/s^2. Berapa energi potensial gravitasinya?", options: ["25 J", "50 J", "100 J", "200 J"], correctIndex: 2, explanation: "Ep = mgh = 2 x 10 x 5 = 100 J." },
    { question: "Benda jatuh dari ketinggian 5 m tanpa hambatan udara. Berapa kecepatannya tepat sebelum menyentuh tanah? Gunakan g = 10 m/s^2.", options: ["5 m/s", "10 m/s", "20 m/s", "50 m/s"], correctIndex: 1, explanation: "Energi potensial berubah menjadi kinetik: mgh = 1/2 mv^2. Maka v = akar(2gh) = akar(100) = 10 m/s." },
    { question: "Mesin melakukan usaha 600 J selama 30 s. Berapa daya rata-ratanya?", options: ["20 W", "30 W", "570 W", "18.000 W"], correctIndex: 0, explanation: "Daya P = W/t = 600/30 = 20 W." },
    { question: "Pegas dengan konstanta 200 N/m ditekan sejauh 0,1 m. Berapa energi potensial pegasnya?", options: ["0,1 J", "1 J", "2 J", "20 J"], correctIndex: 1, explanation: "Epegas = 1/2 k x^2 = 1/2 x 200 x 0,1^2 = 1 J." },
    { question: "Pernyataan yang tepat tentang teorema usaha-energi adalah...", options: ["Usaha total sama dengan perubahan energi kinetik", "Usaha selalu sama dengan energi potensial", "Daya sama dengan gaya dikali waktu", "Energi kinetik selalu tetap"], correctIndex: 0, explanation: "Teorema usaha-energi menyatakan usaha total oleh resultan gaya sama dengan perubahan energi kinetik: Wtotal = delta Ek." },
    { question: "Seseorang mengangkat benda 3 kg setinggi 2 m dengan kecepatan konstan. Berapa usaha minimum melawan gravitasi? Gunakan g = 10 m/s^2.", options: ["6 J", "15 J", "60 J", "600 J"], correctIndex: 2, explanation: "Usaha melawan gravitasi sama dengan pertambahan energi potensial: W = mgh = 3 x 10 x 2 = 60 J." },
  ],
};

export function loadQuizzes(): ClassroomQuiz[] {
  const saved = localStorage.getItem(QUIZZES_KEY);
  if (!saved) return [starterQuiz];
  try {
    const stored = JSON.parse(saved) as Array<Record<string, unknown>>;
    if (!Array.isArray(stored)) return [starterQuiz];
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
    const previousStarter = loaded.find((quiz) => quiz.id === starterQuiz.id);
    return [
      { ...starterQuiz, createdBy: previousStarter?.createdBy },
      ...loaded.filter((quiz) => quiz.id !== starterQuiz.id),
    ];
  } catch {
    return [starterQuiz];
  }
}
