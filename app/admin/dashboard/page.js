"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ClipboardList,
  Megaphone,
  LogOut,
  Search,
} from "lucide-react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("laporan");

  // state laporan & pengumuman
  const [laporanList, setLaporanList] = useState([]);
  const [searchLaporan, setSearchLaporan] = useState("");
  const [pengumumanList, setPengumumanList] = useState([]);
  const [searchPengumuman, setSearchPengumuman] = useState("");

  // form tambah pengumuman
  const [pengumuman, setPengumuman] = useState({
    judul: "",
    isi: "",
    kategori: "Umum",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [expandedLaporan, setExpandedLaporan] = useState(null);
  const [expandedPengumuman, setExpandedPengumuman] = useState(null);

  // fetch laporan
  useEffect(() => {
    const fetchLaporan = async () => {
      const q = query(collection(db, "laporan"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setLaporanList(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchLaporan();
  }, []);

  // fetch pengumuman
  useEffect(() => {
    const fetchPengumuman = async () => {
      const q = query(
        collection(db, "pengumuman"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setPengumumanList(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchPengumuman();
  }, []);

  // tambah pengumuman
  const handleSubmitPengumuman = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "pengumuman"), {
        ...pengumuman,
        createdAt: serverTimestamp(),
      });
      setAlert({
        type: "success",
        message: "Pengumuman berhasil ditambahkan!",
      });
      setPengumuman({ judul: "", isi: "", kategori: "Umum" });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Gagal tambah pengumuman." });
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk format tanggal
  function formatTS(ts) {
    try {
      const d = ts?.toDate?.() ?? ts;
      return d
        ? new Date(d).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : "-";
    } catch {
      return "-";
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar overlay for mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-green-700 text-white w-64 pt-8
          fixed z-40 inset-y-0 left-0 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-0 md:h-screen`}
      >
        <div className="flex items-center justify-between px-5">
          <h2 className="font-bold text-xl">Admin Desa</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="space-y-4 px-5 mt-6">
          <button
            onClick={() => setActiveMenu("laporan")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded-lg font-bold ${
              activeMenu === "laporan"
                ? "bg-white text-green-700 shadow"
                : "hover:bg-green-600/70 text-white"
            }`}
          >
            <ClipboardList size={18} /> Laporan
          </button>
          <button
            onClick={() => setActiveMenu("pengumuman")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded-lg font-bold ${
              activeMenu === "pengumuman"
                ? "bg-white text-green-700 shadow"
                : "hover:bg-green-600/70 text-white"
            }`}
          >
            <Megaphone size={18} /> Pengumuman
          </button>
          <button
            onClick={() => router.push("/admin/login")}
            className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-red-600/70 text-white"
          >
            <LogOut size={18} /> Keluar
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100">
        {/* Link navigasi kecil di atas konten */}
        <div className="mb-4 flex gap-4 text-xs text-green-700 font-semibold">
          <span>Admin /</span>
          <button
            className={`underline ${
              activeMenu === "laporan" ? "font-bold" : ""
            }`}
            onClick={() => setActiveMenu("laporan")}
          >
            Laporan
          </button>
          <span>|</span>
          <button
            className={`underline ${
              activeMenu === "pengumuman" ? "font-bold" : ""
            }`}
            onClick={() => setActiveMenu("pengumuman")}
          >
            Pengumuman
          </button>
          <span>|</span>
          <button
            className="flex items-center gap-1 underline hover:text-red-600"
            onClick={() => router.push("/admin/login")}
          >
            <LogOut size={12} /> Keluar
          </button>
        </div>

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

        {/* LAPORAN */}
        {activeMenu === "laporan" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-black">
              Daftar Laporan Warga
            </h1>
            <div className="flex items-center border rounded px-3 py-2 mb-4 bg-white">
              <Search size={18} className="text-black mr-2" />
              <input
                type="text"
                placeholder="Cari laporan..."
                value={searchLaporan}
                onChange={(e) => setSearchLaporan(e.target.value)}
                className="flex-1 outline-none text-black placeholder-black"
              />
            </div>
            <div className="space-y-4">
              {laporanList
                .filter((lap) => {
                  const search = searchLaporan.toLowerCase();
                  return (
                    (lap.pesan || "").toLowerCase().includes(search) ||
                    (lap.judul || "").toLowerCase().includes(search)
                  );
                })
                .map((lap) => (
                  <div
                    key={lap.id}
                    className="bg-white p-4 rounded shadow border-l-4 border-green-600"
                  >
                    <button
                      className="w-full text-left flex flex-col items-start relative"
                      onClick={() =>
                        setExpandedLaporan(
                          expandedLaporan === lap.id ? null : lap.id
                        )
                      }
                      aria-label={
                        expandedLaporan === lap.id
                          ? "Tutup detail"
                          : "Lihat detail"
                      }
                    >
                      <span className="font-semibold text-black">
                        {lap.judul || "(Tanpa Judul)"}
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        {lap.createdAt &&
                        typeof lap.createdAt.toDate === "function"
                          ? new Date(lap.createdAt.toDate()).toLocaleString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              }
                            )
                          : ""}
                      </span>
                      <span className="flex items-center gap-1 text-green-700 text-xs mt-2 absolute right-5 top-5">
                        {expandedLaporan === lap.id ? "▲" : "▼"}{" "}
                        <span>
                          {expandedLaporan === lap.id
                            ? "Click to fold"
                            : "Click to expand"}
                        </span>
                      </span>
                    </button>
                    {/* Detail hanya tampil saat di-expand */}
                    {expandedLaporan === lap.id && (
                      <div className="mt-3 text-sm text-black space-y-1">
                        <div>
                          <span className="font-semibold">Kategori:</span>{" "}
                          {lap.kategori}
                        </div>
                        <div>
                          <span className="font-semibold">Nama:</span>{" "}
                          {lap.nama}
                        </div>
                        <div>
                          <span className="font-semibold">Kontak:</span>{" "}
                          {lap.kontak}
                        </div>
                        <div>
                          <span className="font-semibold">Pesan:</span>{" "}
                          {lap.pesan}
                        </div>
                        <div>
                          <span className="font-semibold">Foto:</span>{" "}
                          {lap.fotoUrl ? (
                            <img
                              src={lap.fotoUrl}
                              alt="Foto laporan"
                              className="max-h-40 rounded mt-2"
                            />
                          ) : (
                            <span className="italic text-gray-500">
                              Tidak ada foto
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold">Created At:</span>{" "}
                          {lap.createdAt &&
                          typeof lap.createdAt.toDate === "function"
                            ? new Date(lap.createdAt.toDate()).toLocaleString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )
                            : ""}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* PENGUMUMAN */}
        {activeMenu === "pengumuman" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-black">
              Kelola Pengumuman
            </h1>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Tambah Pengumuman Baru
              </h2>
              <form onSubmit={handleSubmitPengumuman} className="space-y-4">
                <input
                  type="text"
                  placeholder="Judul"
                  value={pengumuman.judul}
                  onChange={(e) =>
                    setPengumuman({ ...pengumuman, judul: e.target.value })
                  }
                  className="w-full border p-3 rounded text-black placeholder-black"
                  required
                />
                <select
                  value={pengumuman.kategori}
                  onChange={(e) =>
                    setPengumuman({ ...pengumuman, kategori: e.target.value })
                  }
                  className="w-full border p-3 rounded text-black"
                >
                  <option value="Umum">Umum</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Layanan">Layanan</option>
                  <option value="Darurat">Darurat</option>
                </select>
                <textarea
                  placeholder="Isi pengumuman..."
                  value={pengumuman.isi}
                  onChange={(e) =>
                    setPengumuman({ ...pengumuman, isi: e.target.value })
                  }
                  rows="4"
                  className="w-full border p-3 rounded text-black placeholder-black"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  {loading ? "Menyimpan..." : "Simpan Pengumuman"}
                </button>
              </form>
            </div>

            <div className="flex items-center border rounded px-3 py-2 mb-4 bg-white">
              <Search size={18} className="text-black mr-2" />
              <input
                type="text"
                placeholder="Cari pengumuman..."
                value={searchPengumuman}
                onChange={(e) => setSearchPengumuman(e.target.value)}
                className="flex-1 outline-none text-black placeholder-black"
              />
            </div>

            <div className="space-y-4">
              {pengumumanList
                .filter(
                  (p) =>
                    p.judul
                      .toLowerCase()
                      .includes(searchPengumuman.toLowerCase()) ||
                    p.isi.toLowerCase().includes(searchPengumuman.toLowerCase())
                )
                .map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-4 rounded shadow border-l-4 border-green-600"
                  >
                    <button
                      className="w-full text-left flex flex-col items-start relative"
                      onClick={() =>
                        setExpandedPengumuman(
                          expandedPengumuman === p.id ? null : p.id
                        )
                      }
                      aria-label={
                        expandedPengumuman === p.id
                          ? "Tutup detail"
                          : "Lihat detail"
                      }
                    >
                      <span className="font-semibold text-black">
                        {p.judul}
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        {p.createdAt && typeof p.createdAt.toDate === "function"
                          ? new Date(p.createdAt.toDate()).toLocaleString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              }
                            )
                          : ""}
                      </span>
                      <span className="flex items-center gap-1 text-green-700 text-xs mt-2 absolute right-5 top-5">
                        {expandedPengumuman === p.id ? "▲" : "▼"}{" "}
                        <span>
                          {expandedPengumuman === p.id
                            ? "Click to fold"
                            : "Click to expand"}
                        </span>
                      </span>
                    </button>
                    {/* Detail hanya tampil saat di-expand */}
                    {expandedPengumuman === p.id && (
                      <div className="mt-3 text-sm text-black space-y-1">
                        <div>
                          <span className="font-semibold">Kategori:</span>{" "}
                          {p.kategori}
                        </div>
                        <div>
                          <span className="font-semibold">Judul:</span>{" "}
                          {p.judul}
                        </div>
                        <div>
                          <span className="font-semibold">Isi:</span> {p.isi}
                        </div>
                        <div>
                          <span className="font-semibold">Created At:</span>{" "}
                          {p.createdAt &&
                          typeof p.createdAt.toDate === "function"
                            ? new Date(p.createdAt.toDate()).toLocaleString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )
                            : ""}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
