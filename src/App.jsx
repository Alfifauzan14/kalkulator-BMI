import { useState } from "react";

export default function App() {
  // State untuk menyimpan input dan hasil
  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  
  // State baru untuk menyimpan warna hasil yang dinamis
  const [warnaStatus, setWarnaStatus] = useState(""); 

  const hitungBMI = () => {
    // Validasi input
    if (!berat || !tinggi) {
      alert("Tolong masukkan berat dan tinggi badan!");
      return;
    }

    // Rumus BMI
    const tinggiDalamMeter = tinggi / 100;
    const hasilBmi = berat / (tinggiDalamMeter * tinggiDalamMeter);
    setBmi(hasilBmi.toFixed(1));

    // Menentukan status dan warna kotak hasil menggunakan if-else
    if (hasilBmi < 18.5) {
      setStatus("Kurus");
      setWarnaStatus("bg-blue-100 text-blue-700 border-blue-300"); // Warna biru untuk kurus
    } else if (hasilBmi >= 18.5 && hasilBmi < 24.9) {
      setStatus("Normal");
      setWarnaStatus("bg-emerald-100 text-emerald-700 border-emerald-300"); // Warna hijau (emerald) untuk normal
    } else if (hasilBmi >= 25 && hasilBmi < 29.9) {
      setStatus("Gemuk");
      setWarnaStatus("bg-orange-100 text-orange-700 border-orange-300"); // Warna oranye untuk gemuk
    } else {
      setStatus("Obesitas");
      setWarnaStatus("bg-red-100 text-red-700 border-red-300"); // Warna merah muda untuk obesitas
    }
  };

  return (
    /* Latar belakang web dengan gradasi lembut (biru muda ke ungu muda) */
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4 font-sans">
      
      {/* Kotak utama dengan efek glassmorphism (transparan & blur) dan sudut sangat melengkung (rounded-3xl) */}
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white w-full max-w-sm transition-all duration-300 hover:shadow-2xl">
        
        {/* Judul dengan warna gradasi teks agar terlihat premium */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Kalkulator BMI
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm font-medium">Cek kesehatan tubuhmu sekarang!</p>

        {/* Input Berat Badan */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Berat Badan (kg)
          </label>
          {/* Input dengan ring highlight saat diklik (focus:ring-indigo-400) */}
          <input
            type="number"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            className="w-full bg-white/60 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            placeholder="Contoh: 60"
          />
        </div>

        {/* Input Tinggi Badan */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Tinggi Badan (cm)
          </label>
          <input
            type="number"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            className="w-full bg-white/60 border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            placeholder="Contoh: 170"
          />
        </div>

        {/* Tombol Hitung dengan warna gradasi, bayangan, dan efek sedikit terangkat saat di-hover (hover:-translate-y-1) */}
        <button
          onClick={hitungBMI}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-md transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Hitung BMI
        </button>

        {/* Kotak Hasil (Muncul Dinamis) */}
        {bmi && (
          /* Menggunakan state 'warnaStatus' agar warna background, border, dan text menyesuaikan hasil BMI-nya */
          <div className={`mt-8 p-5 rounded-2xl border-2 text-center transition-all duration-500 ${warnaStatus}`}>
            <p className="text-sm font-semibold mb-1 opacity-80">Skor BMI Anda</p>
            <p className="text-5xl font-black mb-3">{bmi}</p>
            
            {/* Label status bentuk "Pill" (bulat) */}
            <div className="inline-block px-4 py-1.5 bg-white/60 rounded-full shadow-sm">
              <p className="font-bold tracking-wide uppercase text-sm">
                {status}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
