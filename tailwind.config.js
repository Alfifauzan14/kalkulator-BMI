/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind akan scan file-file ini untuk mencari class yang dipakai
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan semua file di folder src
  ],
  theme: {
    extend: {}, // Bisa tambah warna/font custom di sini
  },
  plugins: [], // Plugin tambahan (kita tidak pakai)
};
