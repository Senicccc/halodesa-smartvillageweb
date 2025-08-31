"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export default function PengumumanPage() {
  const [items, setItems] = useState([]);
  const [qText, setQText] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const qRef = query(
      collection(db, "pengumuman"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      qRef,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(rows);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const t = qText.trim().toLowerCase();
    if (!t) return items;
    return items.filter(
      (p) =>
        p.judul?.toLowerCase?.().includes(t) ||
        p.isi?.toLowerCase?.().includes(t)
    );
  }, [items, qText]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 text-black">Semua Pengumuman</h1>

        <input
          value={qText}
          onChange={(e) => setQText(e.target.value)}
          placeholder="Cari judul atau isi pengumuman…"
          className="w-full border rounded-lg px-4 py-2 mb-6 text-black placeholder-black"
        />

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow animate-pulse"
              >
                <div className="h-5 w-1/3 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-black">Tidak ada pengumuman yang cocok.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="bg-white p-5 rounded-lg shadow border-l-4 border-green-600"
              >
                <button
                  className="w-full text-left flex flex-col items-start relative"
                  onClick={() =>
                    setExpandedId(expandedId === p.id ? null : p.id)
                  }
                  aria-label={
                    expandedId === p.id ? "Tutup detail" : "Lihat detail"
                  }
                >
                  <span className="font-semibold text-black">{p.judul}</span>
                  <span className="text-xs text-gray-600 mt-1">
                    {p.createdAt
                      ? new Date(p.createdAt.toDate()).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : ""}
                  </span>
                  <span className="flex items-center gap-1 text-green-700 text-xs mt-2 absolute right-5 top-5">
                    {expandedId === p.id ? "▲" : "▼"}{" "}
                    <span>
                      {expandedId === p.id
                        ? "Tutup"
                        : "Detail"}
                    </span>
                  </span>
                </button>
                {/* Isi hanya tampil saat di-expand */}
                {expandedId === p.id && (
                  <div className="mt-3 text-sm text-black space-y-1">
                    <div>
                      <span className="font-semibold">Kategori:</span>{" "}
                      {p.kategori}
                    </div>
                    <div>
                      <span className="font-semibold">Judul:</span> {p.judul}
                    </div>
                    <div>
                      <span className="font-semibold">Isi:</span> {p.isi}
                    </div>
                    <div>
                      <span className="font-semibold">Dibuat pada:</span>{" "}
                      {p.createdAt
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
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
