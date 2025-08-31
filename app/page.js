"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ChatAssistant from "@/components/ChatAssistant";

function formatTS(ts) {
  try {
    const d = ts?.toDate?.() ?? ts;
    return d
      ? new Date(d).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "-";
  } catch {
    return "-";
  }
}

export default function Home() {
  const [topPengumuman, setTopPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil 3 pengumuman terbaru
  useEffect(() => {
    const q = query(
      collection(db, "pengumuman"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setTopPengumuman(rows);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  return (
    <main className="relative">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-bg.png"
            alt="Background desa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-6xl font-extrabold mb-6 text-white leading-tight drop-shadow-lg">
            HaloDesa – Platform Digital Desa
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
            Layanan terpadu untuk{" "}
            <span className="font-semibold text-green-300">laporan warga</span>,{" "}
            <span className="font-semibold text-green-300">
              aspirasi masyarakat
            </span>
            , dan{" "}
            <span className="font-semibold text-green-300">informasi desa</span>{" "}
            yang modern, transparan, dan inklusif.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pengumuman"
              className="px-8 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 hover:shadow-2xl hover:scale-105 transition transform"
            >
              📢 Lihat Pengumuman
            </a>
            <a
              href="/laporan"
              className="px-8 py-3 bg-white text-green-700 border border-green-600 rounded-xl shadow hover:bg-green-50 hover:scale-105 transition transform"
            >
              🚀 Kirim Laporan
            </a>
          </div>
        </div>
      </section>

      {/* Tentang Website */}
      <section id="about" className="py-24 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-2/3 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/about.png"
              alt="Drone Desa"
              className="w-full h-auto object-cover aspect-[16/10]"
              style={{ maxHeight: 400 }}
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Tentang HaloDesa – Desa Maju Sejahtera
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              <span className="font-semibold text-green-400">HaloDesa</span>{" "}
              adalah platform digital untuk Desa Maju Sejahtera yang memudahkan
              warga menyampaikan laporan, keluhan, saran, dan aspirasi secara
              langsung kepada pemerintah desa. Website ini juga menyediakan
              informasi pengumuman terbaru, layanan publik, serta wadah
              komunikasi yang transparan dan modern untuk seluruh masyarakat
              desa. Dengan HaloDesa, partisipasi dan kemajuan desa dapat
              terwujud bersama!
            </p>
          </div>
        </div>
      </section>

      <section id="pengumuman" className="py-32 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            📢 Pengumuman Terbaru
          </h2>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 bg-white shadow-lg rounded-xl animate-pulse"
                >
                  <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
                  <div className="h-3 w-1/3 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : topPengumuman.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada pengumuman.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {topPengumuman.map((p) => (
                <div
                  key={p.id}
                  className="p-6 bg-white shadow-lg rounded-xl text-left hover:shadow-2xl transition"
                >
                  <h3 className="text-xl font-semibold text-green-700">
                    {p.judul}
                  </h3>
                  <p className="text-gray-600 mt-2">{p.isi}</p>
                  <span className="text-sm text-gray-500 block mt-3">
                    {formatTS(p.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/pengumuman"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-2xl transition"
            >
              Lihat Semua Pengumuman →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="laporan"
        className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-center text-white"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Punya Laporan atau Aspirasi?
          </h2>
          <p className="mb-8 text-lg text-green-100">
            Sampaikan secara langsung melalui sistem kami agar dapat segera
            ditindaklanjuti.
          </p>
          <a
            href="/laporan"
            className="px-8 py-3 bg-white text-green-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition transform hover:scale-105"
          >
            🚀 Buat Laporan Sekarang
          </a>
        </div>
      </section>

      {/* Chat Assistant */}
      <ChatAssistant />
    </main>
  );
}
