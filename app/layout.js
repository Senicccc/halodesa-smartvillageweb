import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HaloDesa",
  description: "Solusi digital untuk desa lebih maju",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <p>© 2025 HaloDesa. All rights reserved.</p>
            <p className="text-sm text-gray-500">Made for Desa Maju Sejahtera</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
