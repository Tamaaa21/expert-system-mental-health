'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-maroon-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Navigasi</h4>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>
                <Link href="/" className="text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="text-white transition-colors">
                  Informasi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>
                <Link href="/diagnosis" className="text-white transition-colors">
                  Diagnosis Mental
                </Link>
              </li>
              <li>
                <a href="#" className="text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>Phone: (0274) 1234-5678</li>
              <li>Email: support@uhn.ac.id</li>
              <li>Jam Operasional: 08:00 - 17:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-200 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-200 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-200 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-maroon-700 pt-8 text-center">
          <p className="text-gray-100 mb-2">
            Berharap Kebaikan dalam Setiap Langkah Kesehatan Mental Anda
          </p>
          <p className="text-gray-100 text-sm">
            © 2026 Universitas Harkat Negeri. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
