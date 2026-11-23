export type Material = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  formula: string;
  tint: "blue" | "gold" | "mint" | "violet";
  intro: string;
  sections: { heading: string; body: string[] }[];
  variables: { symbol: string; meaning: string; unit: string }[];
  example: { prompt: string; steps: string[]; result: string };
  applications: string[];
  commonMistake: string;
  takeaway: string;
};

export const materials: Material[] = [
  {
    slug: "usaha", number: "01", title: "Usaha dalam Fisika", shortTitle: "Usaha",
    summary: "Energi berpindah ketika gaya menyebabkan benda berpindah.", formula: "W = F s cos(theta)", tint: "blue",
    intro: "Dalam fisika, usaha bukan sekadar merasa lelah. Usaha terjadi ketika gaya memberikan perpindahan pada benda. Karena itu, mendorong dinding yang tidak bergerak tidak menghasilkan usaha pada dinding, meskipun kita mengeluarkan tenaga.",
    sections: [
      { heading: "Gaya harus menghasilkan perpindahan", body: ["Usaha oleh gaya adalah hasil kali komponen gaya yang searah perpindahan dengan besar perpindahan. Jika gaya searah gerak, usaha bernilai positif. Jika gaya berlawanan arah gerak, usaha bernilai negatif karena mengurangi energi gerak benda.", "Jika gaya membentuk sudut terhadap arah gerak, hanya komponen sejajar perpindahan yang melakukan usaha. Komponen tegak lurus tidak menambah atau mengurangi energi gerak."] },
      { heading: "Usaha total dan perubahan energi", body: ["Jika beberapa gaya bekerja sekaligus, usaha total adalah jumlah usaha dari semua gaya. Teorema usaha-energi menyatakan usaha total sama dengan perubahan energi kinetik benda.", "Gesekan biasanya melakukan usaha negatif. Gaya dorong dapat melakukan usaha positif, sementara gaya normal pada lantai datar sering tidak melakukan usaha karena arahnya tegak lurus perpindahan."] },
    ],
    variables: [{ symbol: "W", meaning: "Usaha", unit: "joule (J)" }, { symbol: "F", meaning: "Besar gaya", unit: "newton (N)" }, { symbol: "s", meaning: "Perpindahan", unit: "meter (m)" }, { symbol: "theta", meaning: "Sudut antara gaya dan perpindahan", unit: "derajat atau radian" }],
    example: { prompt: "Sebuah peti didorong dengan gaya 20 N sejauh 5 m. Gaya searah perpindahan. Berapa usaha yang dilakukan?", steps: ["Tuliskan data: F = 20 N, s = 5 m, dan theta = 0 derajat.", "Gunakan W = F s cos(theta). Karena cos(0 derajat) = 1, W = 20 x 5 x 1.", "Kalikan besar gaya dengan perpindahan."], result: "Usaha pada peti adalah 100 J." },
    applications: ["Mendorong troli hingga berpindah tempat.", "Mengerem sepeda: gaya gesek melakukan usaha negatif.", "Mengangkat tas: gaya tangan melakukan usaha positif pada tas."],
    commonMistake: "Menganggap setiap gaya selalu menghasilkan usaha. Periksa apakah benda berpindah dan apakah gaya memiliki komponen searah perpindahan.",
    takeaway: "Usaha menghubungkan gaya dan perpindahan dengan perubahan energi benda.",
  },
  {
    slug: "energi-kinetik", number: "02", title: "Energi Kinetik", shortTitle: "Energi Kinetik",
    summary: "Energi yang dimiliki benda karena bergerak.", formula: "Ek = 1/2 m v^2", tint: "gold",
    intro: "Benda yang bergerak dapat melakukan kerja, misalnya bola yang menggelinding dapat mendorong benda lain. Kemampuan akibat gerak ini disebut energi kinetik.",
    sections: [
      { heading: "Massa dan kecepatan menentukan energi", body: ["Energi kinetik meningkat sebanding dengan massa. Untuk kecepatan yang sama, benda dua kali lebih berat memiliki energi kinetik dua kali lebih besar.", "Kecepatan berpengaruh kuadrat. Menggandakan kecepatan membuat energi kinetik menjadi empat kali. Inilah alasan kendaraan yang melaju cepat membutuhkan jarak lebih panjang untuk berhenti."] },
      { heading: "Hubungan dengan usaha", body: ["Usaha total yang diberikan pada benda mengubah energi kinetiknya. Jika benda dipercepat, energi kinetiknya bertambah; jika diperlambat, energi kinetiknya berkurang.", "Energi kinetik adalah besaran skalar dan nilainya tidak negatif. Arah gerak tidak mengubah nilainya, tetapi besar kecepatan menentukan besar energi."] },
    ],
    variables: [{ symbol: "Ek", meaning: "Energi kinetik", unit: "joule (J)" }, { symbol: "m", meaning: "Massa benda", unit: "kilogram (kg)" }, { symbol: "v", meaning: "Kelajuan benda", unit: "meter per sekon (m/s)" }],
    example: { prompt: "Bola bermassa 2 kg bergerak dengan kelajuan 3 m/s. Hitung energi kinetiknya.", steps: ["Data: m = 2 kg dan v = 3 m/s.", "Substitusikan ke Ek = 1/2 m v^2.", "Ek = 1/2 x 2 x 3^2 = 1 x 9."], result: "Energi kinetik bola adalah 9 J." },
    applications: ["Bola yang ditendang memiliki energi kinetik saat bergerak.", "Air mengalir memutar turbin karena membawa energi gerak.", "Kendaraan yang melaju memiliki energi kinetik yang perlu dikurangi saat pengereman."],
    commonMistake: "Lupa mengkuadratkan kecepatan. Pada rumus energi kinetik, yang dipakai adalah v^2, bukan v.",
    takeaway: "Energi kinetik bertambah empat kali ketika kelajuan menjadi dua kali.",
  },
  {
    slug: "energi-potensial", number: "03", title: "Energi Potensial Gravitasi", shortTitle: "Energi Potensial",
    summary: "Energi karena posisi benda pada ketinggian tertentu.", formula: "Ep = m g h", tint: "mint",
    intro: "Benda yang berada di tempat tinggi memiliki energi tersimpan karena posisinya terhadap permukaan acuan. Saat jatuh, energi potensial gravitasi dapat berubah menjadi energi kinetik.",
    sections: [
      { heading: "Titik acuan menentukan ketinggian", body: ["Energi potensial gravitasi dekat permukaan bumi dihitung dari massa, percepatan gravitasi, dan ketinggian terhadap titik acuan. Titik acuan dapat dipilih sesuai masalah, misalnya lantai atau tanah.", "Yang penting adalah perubahan ketinggian. Jika benda berpindah dari satu posisi ke posisi lain, perubahan energi potensialnya adalah m g kali perubahan tinggi."] },
      { heading: "Energi tersimpan dapat berubah", body: ["Ketika benda jatuh, ketinggian berkurang sehingga energi potensial berkurang. Tanpa hambatan udara, energi tersebut berubah menjadi energi kinetik.", "Jika ada gesekan atau hambatan udara, sebagian energi mekanik berubah menjadi energi dalam dan bunyi. Energi total tetap, tetapi energi mekanik benda tidak lagi tetap."] },
    ],
    variables: [{ symbol: "Ep", meaning: "Energi potensial gravitasi", unit: "joule (J)" }, { symbol: "m", meaning: "Massa benda", unit: "kilogram (kg)" }, { symbol: "g", meaning: "Percepatan gravitasi", unit: "m/s^2" }, { symbol: "h", meaning: "Ketinggian dari titik acuan", unit: "meter (m)" }],
    example: { prompt: "Pot bunga bermassa 2 kg berada 5 m di atas tanah. Gunakan g = 10 m/s^2.", steps: ["Data: m = 2 kg, g = 10 m/s^2, dan h = 5 m.", "Gunakan Ep = m g h.", "Ep = 2 x 10 x 5 = 100."], result: "Energi potensial pot bunga adalah 100 J terhadap tanah." },
    applications: ["Air di waduk memiliki energi potensial sebelum dialirkan ke turbin.", "Buku di rak memiliki energi potensial terhadap lantai.", "Roller coaster di puncak lintasan memiliki energi potensial yang besar."],
    commonMistake: "Memakai tinggi tanpa menyebut titik acuannya. Nilai energi potensial bergantung pada acuan yang dipilih.",
    takeaway: "Semakin tinggi posisi benda, semakin besar energi potensialnya terhadap titik acuan yang sama.",
  },
  {
    slug: "kekekalan-energi", number: "04", title: "Kekekalan Energi Mekanik", shortTitle: "Kekekalan Energi",
    summary: "Energi berubah bentuk, sementara jumlahnya tetap jika tidak ada gesekan.", formula: "Em = Ek + Ep", tint: "violet",
    intro: "Energi tidak hilang begitu saja. Dalam sistem ideal tanpa gesekan, energi potensial dan energi kinetik saling berubah, sedangkan jumlah energi mekanik tetap.",
    sections: [
      { heading: "Energi mekanik adalah jumlah energi", body: ["Energi mekanik adalah jumlah energi kinetik dan energi potensial. Pada benda yang jatuh, energi potensial menurun dan energi kinetik meningkat.", "Di titik tertinggi, benda dapat memiliki energi potensial besar dan energi kinetik kecil. Di titik terendah, energi kinetik dapat menjadi besar sementara energi potensialnya kecil terhadap acuan tanah."] },
      { heading: "Kapan energi mekanik tetap?", body: ["Energi mekanik tetap jika hanya gaya konservatif, seperti gravitasi atau gaya pegas ideal, yang melakukan usaha. Gesekan dan hambatan udara dapat mengubah sebagian energi mekanik menjadi panas atau bunyi.", "Untuk dua posisi, tulis energi awal sama dengan energi akhir. Pilih titik acuan yang memudahkan perhitungan, lalu masukkan energi kinetik dan potensial di tiap posisi."] },
    ],
    variables: [{ symbol: "Em", meaning: "Energi mekanik total", unit: "joule (J)" }, { symbol: "Ek", meaning: "Energi kinetik", unit: "joule (J)" }, { symbol: "Ep", meaning: "Energi potensial", unit: "joule (J)" }],
    example: { prompt: "Bola dijatuhkan dari ketinggian 5 m. Abaikan hambatan udara dan gunakan g = 10 m/s^2. Tentukan kelajuan bola sesaat sebelum menyentuh tanah.", steps: ["Di awal, bola diam sehingga energi kinetiknya nol. Energi awal adalah m g h.", "Di tanah, pilih Ep = 0. Energi akhir seluruhnya kinetik, yaitu 1/2 m v^2.", "Samakan energi: mgh = 1/2mv^2. Massa saling menghapus, sehingga v = akar(2gh) = akar(100)."], result: "Kelajuan bola sesaat sebelum menyentuh tanah adalah 10 m/s." },
    applications: ["Ayunan mengubah energi potensial menjadi kinetik dan kembali lagi.", "Roller coaster mempercepat saat turun dan melambat saat menanjak.", "Pembangkit listrik tenaga air mengubah energi potensial air menjadi gerak turbin."],
    commonMistake: "Menganggap energi mekanik tetap walaupun gesekan besar. Jika ada gesekan, masukkan perubahan energi menjadi panas atau gunakan usaha gaya nonkonservatif.",
    takeaway: "Tanpa gesekan, energi potensial dan kinetik dapat berubah, tetapi jumlahnya tetap.",
  },
  {
    slug: "daya", number: "05", title: "Daya", shortTitle: "Daya",
    summary: "Laju melakukan usaha atau memindahkan energi.", formula: "P = W/t", tint: "blue",
    intro: "Dua orang dapat melakukan usaha yang sama, tetapi orang yang menyelesaikannya lebih cepat memiliki daya lebih besar. Daya menggambarkan seberapa cepat energi dipindahkan atau usaha dilakukan.",
    sections: [
      { heading: "Daya rata-rata", body: ["Daya rata-rata adalah usaha atau energi yang dipindahkan dibagi waktu. Satuan SI daya adalah watt; satu watt sama dengan satu joule per sekon.", "Daya bukan jumlah energi. Mesin berdaya tinggi memindahkan energi lebih cepat, tetapi energi total tetap bergantung pada lama mesin bekerja."] },
      { heading: "Daya pada gaya dan gerak", body: ["Jika gaya konstan searah kecepatan, daya sesaat dapat dihitung dengan P = Fv. Jika gaya dan kecepatan tidak searah, gunakan komponen gaya yang sejajar dengan arah kecepatan.", "Dalam kehidupan sehari-hari, daya listrik pada label alat menunjukkan laju pemakaian energi listrik ketika alat bekerja."] },
    ],
    variables: [{ symbol: "P", meaning: "Daya", unit: "watt (W)" }, { symbol: "W", meaning: "Usaha atau energi yang dipindahkan", unit: "joule (J)" }, { symbol: "t", meaning: "Waktu", unit: "sekon (s)" }],
    example: { prompt: "Sebuah mesin melakukan usaha 600 J dalam 30 sekon. Berapa daya rata-ratanya?", steps: ["Data: W = 600 J dan t = 30 s.", "Gunakan P = W/t.", "P = 600/30 = 20."], result: "Daya rata-rata mesin adalah 20 W." },
    applications: ["Lampu 10 W menggunakan energi lebih lambat daripada alat 100 W saat keduanya menyala.", "Atlet yang menaiki tangga lebih cepat melakukan usaha dengan daya lebih besar.", "Motor dengan daya lebih tinggi dapat melakukan kerja lebih cepat pada kondisi yang sesuai."],
    commonMistake: "Menyamakan daya dengan energi. Energi diukur dalam joule, sedangkan daya diukur dalam watt atau joule per sekon.",
    takeaway: "Daya adalah energi yang dipindahkan setiap satuan waktu.",
  },
  {
    slug: "energi-pegas", number: "06", title: "Energi Potensial Pegas", shortTitle: "Energi Pegas",
    summary: "Energi yang tersimpan saat pegas diregangkan atau ditekan.", formula: "Epegas = 1/2 k x^2", tint: "gold",
    intro: "Pegas yang ditekan atau diregangkan menyimpan energi. Ketika dilepas, pegas dapat mendorong atau menarik benda kembali ke posisi setimbang.",
    sections: [
      { heading: "Hukum Hooke", body: ["Untuk pegas ideal, besar gaya pemulih sebanding dengan perubahan panjangnya: F = kx. Arah gaya pemulih selalu menuju posisi setimbang.", "Konstanta pegas k menunjukkan kekakuan pegas. Pegas dengan k besar memerlukan gaya lebih besar untuk perubahan panjang yang sama."] },
      { heading: "Energi tersimpan pada pegas", body: ["Energi potensial pegas bertambah sebanding dengan kuadrat perubahan panjang. Jika pegas diregangkan dua kali lebih jauh, energi yang tersimpan menjadi empat kali.", "Rumus ini berlaku selama pegas masih berada dalam batas elastisnya, yaitu dapat kembali ke bentuk semula setelah gaya dilepas."] },
    ],
    variables: [{ symbol: "Epegas", meaning: "Energi potensial pegas", unit: "joule (J)" }, { symbol: "k", meaning: "Konstanta pegas", unit: "newton per meter (N/m)" }, { symbol: "x", meaning: "Perubahan panjang dari posisi setimbang", unit: "meter (m)" }],
    example: { prompt: "Pegas dengan k = 200 N/m ditekan sejauh 0,1 m. Berapa energi yang tersimpan?", steps: ["Data: k = 200 N/m dan x = 0,1 m.", "Gunakan Epegas = 1/2 k x^2.", "Epegas = 1/2 x 200 x (0,1)^2 = 100 x 0,01."], result: "Energi potensial pegas adalah 1 J." },
    applications: ["Busur menyimpan energi saat talinya ditarik.", "Suspensi kendaraan memakai pegas untuk meredam perubahan posisi roda.", "Mainan pegas dapat bergerak setelah energi yang tersimpan dilepaskan."],
    commonMistake: "Lupa mengkuadratkan perubahan panjang atau memakai x dalam sentimeter. Ubah x ke meter sebelum menghitung.",
    takeaway: "Energi pegas bertambah sebanding dengan kuadrat perubahan panjangnya.",
  },
];
