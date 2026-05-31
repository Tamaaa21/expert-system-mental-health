'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-maroon-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">Navigasi</h4>
            <ul className="space-y-2 text-maroon-100 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="hover:text-white transition-colors">
                  Informasi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Layanan</h4>
            <ul className="space-y-2 text-maroon-100 text-sm">
              <li>
                <Link href="/diagnosis" className="hover:text-white transition-colors">
                  Diagnosis Mental
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-maroon-100 text-sm">
              <li>Phone: (0274) 1234-5678</li>
              <li>Email: support@uhn.ac.id</li>
              <li>Jam Operasional: 08:00 - 17:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-maroon-200 transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-maroon-200 transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-maroon-200 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-maroon-700 pt-8 text-center">
          <p className="text-maroon-100 mb-2">
            Berharap Kebaikan dalam Setiap Langkah Kesehatan Mental Anda
          </p>
          <p className="text-maroon-100 text-sm">
            © 2024 Universitas Harkat Negeri. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
