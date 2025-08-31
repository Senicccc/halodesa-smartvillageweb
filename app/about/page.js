// app/about/page.js
"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Tentang HaloDesa & Desa Maju Sejahtera</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">HaloDesa</h2>
          <p className="text-gray-700">
            HaloDesa adalah platform digital resmi Desa Maju Sejahtera yang memudahkan warga 
            dalam mengakses informasi, menyampaikan aspirasi, laporan, serta pengumuman penting desa. 
            Kami berkomitmen untuk transparansi, pelayanan publik yang efisien, dan pemberdayaan warga melalui teknologi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">Desa Maju Sejahtera</h2>
          <p className="text-gray-700">
            Desa Maju Sejahtera terletak di wilayah Kabupaten XYZ, dengan visi mewujudkan komunitas yang maju, sejahtera, dan harmonis. 
            Desa ini memiliki fasilitas pendidikan, kesehatan, serta layanan publik yang mendukung kesejahteraan warga.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">Kontak & Informasi Desa</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li><strong>Alamat:</strong> Jl. Raya Maju Sejahtera No. 123, Kecamatan ABC, Kabupaten XYZ</li>
            <li><strong>Email Resmi:</strong> <a href="mailto:desamajusejahtera@halodesa.com" className="text-green-600 underline">halodesa@desamajusejahtera.id</a></li>
            <li><strong>Telepon / WA:</strong> +62 812 3456 7890</li>
            <li><strong>Jam Layanan Kantor Desa:</strong> Senin - Jumat, 08.00 - 16.00 WIB</li>
            <li><strong>Website Resmi:</strong> <a href="https://halodesa-desamajusejahtera.com" target="_blank" className="text-green-600 underline">https://halodesa-desamajusejahtera.com</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-black">Misi & Tujuan</h2>
          <p className="text-gray-700">
            Misi HaloDesa adalah mempermudah komunikasi antara aparat desa dan warga, meningkatkan transparansi, 
            serta memfasilitasi layanan publik secara digital. Dengan platform ini, warga dapat menyampaikan aspirasi, laporan, 
            mendapatkan pengumuman terbaru, dan mengakses informasi desa secara cepat dan aman.
          </p>
        </section>
      </div>
    </main>
  );
}
