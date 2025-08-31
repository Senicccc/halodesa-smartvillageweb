"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function LaporanPage() {
  const [formData, setFormData] = useState({
    judul: "",
    nama: "",
    kontak: "",
    kategori: "Keluhan",
    pesan: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setAlert({ type: "", message: "" });

    if (formData.pesan.length < 10) {
      setAlert({ type: "error", message: "Pesan minimal 10 karakter" });
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "laporan"), {
        judul: formData.judul,
        nama: formData.nama,
        kontak: formData.kontak,
        kategori: formData.kategori,
        pesan: formData.pesan,
        createdAt: serverTimestamp(),
      });

      setAlert({ type: "success", message: "✅ Laporan berhasil dikirim!" });
      setFormData({
        judul: "",
        nama: "",
        kontak: "",
        kategori: "Keluhan",
        pesan: "",
      });
    } catch (error) {
      console.error("Error menambahkan laporan: ", error);
      setAlert({
        type: "error",
        message: "❌ Gagal mengirim laporan, coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Kirim Laporan / Aspirasi
        </h1>

        {alert.message && (
          <div
            className={`mb-6 p-3 rounded-lg text-center font-medium ${
              alert.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Judul Laporan"
            className="w-full border p-3 rounded-lg text-black placeholder-black focus:outline-green-600"
            required
          />

          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama Anda"
            className="w-full border p-3 rounded-lg text-black placeholder-black focus:outline-green-600"
            required
          />

          <input
            type="text"
            name="kontak"
            value={formData.kontak}
            onChange={handleChange}
            placeholder="Email / Nomor HP"
            className="w-full border p-3 rounded-lg text-black placeholder-black focus:outline-green-600"
            required
          />

          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-black focus:outline-green-600"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Keluhan">Keluhan</option>
            <option value="Saran">Saran</option>
            <option value="Aspirasi">Aspirasi</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Layanan Publik">Layanan Publik</option>
          </select>

          <textarea
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            placeholder="Tulis pesan anda (minimal 10 karakter)..."
            rows="5"
            className="w-full border p-3 rounded-lg text-black placeholder-black focus:outline-green-600"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "🚀 Kirim Laporan"}
          </button>
        </form>
      </div>
    </main>
  );
}
