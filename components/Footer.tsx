'use client';

import Link from 'next/link';
import Script from 'next/script';

export function Footer() {
  return (
    <footer className="bg-maroon-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4  text-gray-100">Navigasi</h4>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>
                <Link href="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white ">
                  About
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="text-white ">
                  Informasi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4  text-gray-100">Layanan</h4>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>
                <Link href="/diagnosis" className="text-white ">
                  Diagnosis Mental
                </Link>
              </li>
              <li>
                <a href="#" className="text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white ">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4  text-gray-100">Hubungi Kami</h4>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li>Phone: (0274) 1234-5678</li>
              <li>Email: support@uhn.ac.id</li>
              <li>Jam Operasional: 08:00 - 17:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4  text-gray-100">HIstats</h4>
            <div className="flex gap-4">
          
    <div id="histats_counter"></div>
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





<Script id="histats" strategy="afterInteractive">
  {`
    var _Hasync = _Hasync || [];
    _Hasync.push(['Histats.start', '1,5032900,4,430,112,75,00011111']);
    _Hasync.push(['Histats.fasi', '1']);
    _Hasync.push(['Histats.track_hits', '']);

    (function() {
      var hs = document.createElement('script');
      hs.type = 'text/javascript';
      hs.async = true;
      hs.src = '//s10.histats.com/js15_as.js';
      document.body.appendChild(hs);
    })();
  `}
</Script>
        </div>
      </div>
    </footer>
  );
}
