import type { QuizQuestion } from "@/lib/classroom";

export const materialQuizzes: Record<string, QuizQuestion[]> = {
  usaha: [
    { question: "Kapan suatu gaya melakukan usaha pada benda?", options: ["Saat gaya menyebabkan perpindahan", "Saat benda diam", "Saat benda berubah warna", "Saat gaya tegak lurus tanpa perpindahan"], correctIndex: 0, explanation: "Usaha terjadi jika gaya memiliki komponen searah perpindahan benda." },
    { question: "Tembok didorong tetapi tidak berpindah. Usaha pada tembok adalah...", options: ["0 J", "Sama dengan gaya", "Selalu 1 J", "Tidak terhingga"], correctIndex: 0, explanation: "Tanpa perpindahan, usaha pada tembok bernilai nol." },
    { question: "Gaya 10 N searah perpindahan 3 m. Besar usahanya...", options: ["30 J", "13 J", "7 J", "3 J"], correctIndex: 0, explanation: "W = F s = 10 x 3 = 30 J." },
    { question: "Jika gaya berlawanan arah dengan perpindahan, usaha gaya itu bernilai...", options: ["Negatif", "Positif", "Selalu nol", "Tak dapat bernilai"], correctIndex: 0, explanation: "Komponen gaya yang berlawanan arah perpindahan menghasilkan usaha negatif." },
    { question: "Gaya 8 N tegak lurus perpindahan 2 m. Usaha oleh gaya tersebut...", options: ["0 J", "16 J", "4 J", "10 J"], correctIndex: 0, explanation: "Gaya tegak lurus perpindahan tidak memiliki komponen searah perpindahan." },
  ],
  "energi-kinetik": [
    { question: "Energi kinetik dimiliki benda karena...", options: ["Geraknya", "Warnanya", "Bentuknya", "Suhu ruang"], correctIndex: 0, explanation: "Energi kinetik adalah energi yang dimiliki benda karena bergerak." },
    { question: "Rumus energi kinetik adalah...", options: ["1/2 m v²", "m g h", "F s", "W/t"], correctIndex: 0, explanation: "Energi kinetik dihitung dengan Ek = 1/2 m v²." },
    { question: "Benda 2 kg bergerak 3 m/s. Energi kinetiknya...", options: ["9 J", "6 J", "12 J", "18 J"], correctIndex: 0, explanation: "Ek = 1/2 x 2 x 3² = 9 J." },
    { question: "Jika kelajuan menjadi dua kali, energi kinetik menjadi...", options: ["4 kali", "2 kali", "3 kali", "8 kali"], correctIndex: 0, explanation: "Energi kinetik sebanding dengan kuadrat kelajuan." },
    { question: "Satuan SI energi kinetik adalah...", options: ["Joule", "Watt", "Newton", "Meter"], correctIndex: 0, explanation: "Energi, termasuk energi kinetik, diukur dalam joule (J)." },
  ],
  "energi-potensial": [
    { question: "Energi potensial gravitasi berkaitan dengan...", options: ["Posisi atau ketinggian", "Warna benda", "Luas permukaan", "Bentuk lintasan saja"], correctIndex: 0, explanation: "Energi potensial gravitasi bergantung pada ketinggian terhadap titik acuan." },
    { question: "Rumus energi potensial gravitasi adalah...", options: ["m g h", "1/2 m v²", "F/t", "k x"], correctIndex: 0, explanation: "Energi potensial gravitasi dihitung dengan Ep = mgh." },
    { question: "Benda 2 kg berada 5 m di atas tanah, g=10 m/s². Ep-nya...", options: ["100 J", "50 J", "25 J", "10 J"], correctIndex: 0, explanation: "Ep = 2 x 10 x 5 = 100 J." },
    { question: "Saat benda jatuh tanpa hambatan udara, energi potensialnya...", options: ["Berkurang", "Bertambah terus", "Selalu nol", "Tidak berubah"], correctIndex: 0, explanation: "Ketinggian berkurang saat jatuh, sehingga energi potensial juga berkurang." },
    { question: "Titik acuan pada energi potensial digunakan untuk menentukan...", options: ["Ketinggian benda", "Massa benda", "Kelajuan benda", "Waktu tempuh"], correctIndex: 0, explanation: "Nilai energi potensial ditentukan dari ketinggian relatif terhadap titik acuan." },
  ],
  "kekekalan-energi": [
    { question: "Energi mekanik merupakan jumlah dari...", options: ["Energi kinetik dan potensial", "Massa dan gaya", "Usaha dan daya", "Kelajuan dan waktu"], correctIndex: 0, explanation: "Energi mekanik Em = Ek + Ep." },
    { question: "Tanpa gesekan, energi mekanik total benda...", options: ["Tetap", "Selalu bertambah", "Selalu hilang", "Menjadi nol"], correctIndex: 0, explanation: "Tanpa gaya nonkonservatif, jumlah energi kinetik dan potensial tetap." },
    { question: "Saat bola jatuh, Ep umumnya berubah menjadi...", options: ["Ek", "Massa", "Daya", "Gaya normal"], correctIndex: 0, explanation: "Energi potensial gravitasi berubah menjadi energi kinetik saat bola jatuh." },
    { question: "Gaya gesek dapat mengubah sebagian energi mekanik menjadi...", options: ["Panas", "Massa", "Ketinggian", "Perpindahan"], correctIndex: 0, explanation: "Gesekan mengubah sebagian energi mekanik menjadi energi dalam seperti panas." },
    { question: "Di titik tertinggi ayunan, energi potensial biasanya...", options: ["Maksimum", "Minimum", "Selalu nol", "Tidak ada"], correctIndex: 0, explanation: "Pada titik tertinggi, posisi dan energi potensial gravitasi paling besar." },
  ],
  daya: [
    { question: "Daya menyatakan...", options: ["Laju melakukan usaha", "Jumlah massa", "Arah gaya", "Jarak tempuh"], correctIndex: 0, explanation: "Daya adalah usaha atau energi yang dipindahkan per satuan waktu." },
    { question: "Rumus daya rata-rata adalah...", options: ["P = W/t", "P = mgh", "P = F+s", "P = mv"], correctIndex: 0, explanation: "Daya rata-rata sama dengan usaha dibagi waktu." },
    { question: "Usaha 600 J dilakukan selama 30 s. Dayanya...", options: ["20 W", "30 W", "570 W", "18.000 W"], correctIndex: 0, explanation: "P = 600/30 = 20 W." },
    { question: "Satuan SI untuk daya adalah...", options: ["Watt", "Joule", "Newton", "Kilogram"], correctIndex: 0, explanation: "Daya diukur dalam watt (W), setara joule per sekon." },
    { question: "Dua orang melakukan usaha sama. Yang lebih cepat bekerja memiliki...", options: ["Daya lebih besar", "Energi lebih kecil pasti", "Massa lebih besar", "Usaha nol"], correctIndex: 0, explanation: "Usaha sama dalam waktu lebih singkat berarti daya lebih besar." },
  ],
  "energi-pegas": [
    { question: "Pegas menyimpan energi saat...", options: ["Diregangkan atau ditekan", "Dibiarkan tanpa perubahan", "Didinginkan saja", "Dipindahkan tanpa deformasi"], correctIndex: 0, explanation: "Pegas menyimpan energi potensial ketika berubah panjang dari posisi setimbang." },
    { question: "Rumus energi potensial pegas adalah...", options: ["1/2 k x²", "mgh", "F s", "W/t"], correctIndex: 0, explanation: "Energi pegas dihitung dengan E = 1/2 k x²." },
    { question: "Jika perubahan panjang pegas menjadi dua kali, energinya menjadi...", options: ["4 kali", "2 kali", "3 kali", "8 kali"], correctIndex: 0, explanation: "Energi sebanding dengan kuadrat perubahan panjang." },
    { question: "Konstanta pegas k menunjukkan...", options: ["Kekakuan pegas", "Massa pegas", "Panjang awal", "Waktu getaran saja"], correctIndex: 0, explanation: "Nilai k yang besar berarti pegas lebih kaku." },
    { question: "Pegas k=200 N/m ditekan 0,1 m. Energi tersimpannya...", options: ["1 J", "2 J", "10 J", "20 J"], correctIndex: 0, explanation: "E = 1/2 x 200 x 0,1² = 1 J." },
  ],
};
