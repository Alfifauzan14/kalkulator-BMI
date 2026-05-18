// ============================================================
// File: src/App.jsx
// Deskripsi: Kalkulator BMI (Body Mass Index) - Tugas Sekolah
// Nama Siswa: [Isi nama kamu di sini]
// ============================================================

// Baris ini mengimpor dua "alat" dari library React:
// - useState: untuk menyimpan data yang bisa berubah (seperti variabel tapi "reaktif")
import { useState } from "react";

// Mendefinisikan komponen utama aplikasi kita bernama "App"
// Komponen = bagian UI yang bisa kita pakai berulang kali
function App() {

  // --- BAGIAN STATE (DATA YANG BISA BERUBAH) ---

  // State untuk menyimpan nilai berat badan yang diketik user
  // berat = nilai saat ini | setBerat = fungsi untuk mengubah nilai
  // "" artinya nilai awalnya kosong
  const [berat, setBerat] = useState("");

  // State untuk menyimpan nilai tinggi badan yang diketik user
  const [tinggi, setTinggi] = useState("");

  // State untuk menyimpan hasil BMI (angka desimal)
  // null artinya belum ada hasil dihitung
  const [hasilBMI, setHasilBMI] = useState(null);

  // State untuk menyimpan status/kategori BMI (Kurus/Normal/Gemuk/Obesitas)
  const [status, setStatus] = useState("");

  // State untuk menyimpan warna kartu hasil (berubah sesuai kategori)
  const [warnaBadge, setWarnaBadge] = useState("");

  // State untuk menyimpan pesan error jika input tidak valid
  const [error, setError] = useState("");


  // --- BAGIAN LOGIKA / FUNGSI ---

  // Fungsi ini dijalankan ketika tombol "Hitung BMI" diklik
  const hitungBMI = () => {

    // Langkah 1: Kosongkan pesan error sebelumnya
    setError("");

    // Langkah 2: Ubah nilai dari string (teks) menjadi angka desimal
    // parseFloat() = mengubah teks menjadi angka (contoh: "70" → 70)
    const beratNum = parseFloat(berat);
    const tinggiNum = parseFloat(tinggi);

    // Langkah 3: Validasi - cek apakah input kosong atau bukan angka valid
    // isNaN() = apakah "bukan angka?" (is Not a Number)
    if (!berat || !tinggi || isNaN(beratNum) || isNaN(tinggiNum)) {
      setError("⚠️ Masukkan berat dan tinggi yang valid!"); // Tampilkan pesan error
      setHasilBMI(null); // Hapus hasil sebelumnya
      return; // Hentikan fungsi, jangan lanjut hitung
    }

    // Langkah 4: Validasi range angka yang masuk akal
    if (beratNum <= 0 || tinggiNum <= 0) {
      setError("⚠️ Berat dan tinggi harus lebih dari 0!"); // Tampilkan pesan error
      setHasilBMI(null);
      return;
    }

    // Langkah 5: Hitung BMI dengan rumus resmi WHO
    // Rumus: BMI = berat (kg) / (tinggi (m) * tinggi (m))
    // Tinggi dikonversi dari cm ke meter dengan dibagi 100
    const tinggimeters = tinggiNum / 100;           // Contoh: 170 cm → 1.70 m
    const bmi = beratNum / (tinggimeters * tinggimeters); // Hitung BMI

    // Langkah 6: Bulatkan hasil BMI menjadi 1 angka di belakang koma
    // toFixed(1) = membulatkan ke 1 desimal, contoh: 22.345 → "22.3"
    const bmiDibulatkan = bmi.toFixed(1);

    // Langkah 7: Tentukan kategori BMI berdasarkan nilai yang dihitung
    // Kategori berdasarkan standar WHO (Asia Pasifik)
    let kategori = ""; // Variabel sementara untuk menyimpan kategori
    let warna = "";    // Variabel sementara untuk menyimpan warna badge

    if (bmi < 18.5) {
      // BMI di bawah 18.5 = Kurus (Underweight)
      kategori = "Kurus (Underweight)";
      warna = "bg-blue-100 text-blue-700 border-blue-300"; // Warna biru
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      // BMI antara 18.5 - 24.9 = Normal
      kategori = "Normal";
      warna = "bg-green-100 text-green-700 border-green-300"; // Warna hijau
    } else if (bmi >= 25 && bmi <= 29.9) {
      // BMI antara 25 - 29.9 = Gemuk (Overweight)
      kategori = "Gemuk (Overweight)";
      warna = "bg-yellow-100 text-yellow-700 border-yellow-300"; // Warna kuning
    } else {
      // BMI 30 ke atas = Obesitas
      kategori = "Obesitas";
      warna = "bg-red-100 text-red-700 border-red-300"; // Warna merah
    }

    // Langkah 8: Simpan hasil ke dalam state agar tampil di layar
    setHasilBMI(bmiDibulatkan); // Simpan angka BMI
    setStatus(kategori);         // Simpan kategori
    setWarnaBadge(warna);        // Simpan warna badge
  };


  // --- BAGIAN TAMPILAN (JSX / HTML) ---

  // "return" berisi tampilan yang akan muncul di browser
  // JSX = JavaScript + XML, mirip HTML tapi ditulis di dalam JavaScript
  return (
    // Container utama: latar belakang gradient, tinggi penuh layar, flex untuk centering
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      {/* Kartu utama aplikasi */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        {/* --- HEADER / JUDUL --- */}
        <div className="text-center mb-8">
          {/* Ikon emoji besar */}
          <div className="text-5xl mb-3">⚖️</div>

          {/* Judul utama aplikasi */}
          <h1 className="text-3xl font-bold text-gray-800">
            Kalkulator BMI
          </h1>

          {/* Subjudul / keterangan */}
          <p className="text-gray-500 mt-1 text-sm">
            Body Mass Index Calculator
          </p>
        </div>


        {/* --- FORM INPUT --- */}
        <div className="space-y-5">

          {/* Input Berat Badan */}
          <div>
            {/* Label: teks kecil di atas input */}
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Berat Badan (kg)
            </label>

            {/* Input field untuk berat badan */}
            <input
              type="number"          // Hanya bisa input angka
              placeholder="Contoh: 65"
              value={berat}          // Nilai input terhubung ke state "berat"
              onChange={(e) => setBerat(e.target.value)} // Setiap ketik → update state
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Input Tinggi Badan */}
          <div>
            {/* Label untuk tinggi badan */}
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Tinggi Badan (cm)
            </label>

            {/* Input field untuk tinggi badan */}
            <input
              type="number"          // Hanya bisa input angka
              placeholder="Contoh: 170"
              value={tinggi}         // Nilai input terhubung ke state "tinggi"
              onChange={(e) => setTinggi(e.target.value)} // Setiap ketik → update state
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Tampilkan pesan error jika ada (hanya muncul kalau state error tidak kosong) */}
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* Tombol Hitung BMI */}
          {/* onClick → memanggil fungsi hitungBMI saat diklik */}
          <button
            onClick={hitungBMI}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition duration-200 active:scale-95"
          >
            Hitung BMI
          </button>
        </div>


        {/* --- BAGIAN HASIL --- */}
        {/* hasilBMI !== null artinya: tampilkan HANYA kalau sudah ada hasil */}
        {hasilBMI !== null && (
          <div className="mt-8 text-center">

            {/* Garis pemisah */}
            <hr className="mb-6 border-gray-200" />

            {/* Teks "Hasil BMI kamu:" */}
            <p className="text-gray-500 text-sm mb-1">Hasil BMI kamu:</p>

            {/* Angka BMI besar */}
            <p className="text-6xl font-extrabold text-indigo-600 mb-3">
              {hasilBMI} {/* Menampilkan nilai dari state hasilBMI */}
            </p>

            {/* Badge status (warna berubah sesuai kategori) */}
            {/* Template literal (`...`) dipakai agar kita bisa campur string + variabel */}
            <span className={`inline-block px-5 py-2 rounded-full border font-semibold text-sm ${warnaBadge}`}>
              {status} {/* Menampilkan kategori dari state status */}
            </span>

            {/* Tabel referensi kategori BMI */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left text-sm">
              <p className="font-semibold text-gray-600 mb-2 text-center">Tabel Kategori BMI</p>

              {/* Baris tabel - setiap baris adalah 1 kategori */}
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-blue-600">Kurus</span>
                <span className="text-gray-500">BMI &lt; 18.5</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-green-600">Normal</span>
                <span className="text-gray-500">BMI 18.5 – 24.9</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-yellow-600">Gemuk</span>
                <span className="text-gray-500">BMI 25 – 29.9</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-red-600">Obesitas</span>
                <span className="text-gray-500">BMI ≥ 30</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
  // Akhir dari bagian return (tampilan)
}

// Baris ini WAJIB ada agar komponen App bisa dipakai di file lain (index.js)
export default App;
