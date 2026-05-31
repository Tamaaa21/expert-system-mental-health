'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b-2 border-maroon-800 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/logo-ml.png" alt="Logo" className="w-15 h-12" />
            <span className="font-bold text-maroon-800 hidden sm:inline text-sm">
              MENTAL HEALTH <br></br>UNIVERSITAS HARKAT NEGERI
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-8">
            <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 text-sm font-semibold transition-colors ${
                isActive('/')
                  ? 'text-maroon-800 border-b-2 border-maroon-800'
                  : 'text-gray-600 hover:text-maroon-800'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 sm:px-4 py-2 text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'text-maroon-800 border-b-2 border-maroon-800'
                  : 'text-gray-600 hover:text-maroon-800'
              }`}
            >
              About
            </Link>
            <Link
              href="/informasi"
              className={`px-3 sm:px-4 py-2 text-sm font-semibold transition-colors ${
                isActive('/informasi')
                  ? 'text-maroon-800 border-b-2 border-maroon-800'
                  : 'text-gray-600 hover:text-maroon-800'
              }`}
            >
              Informasi
            </Link>
            </div>

            <Link
              href="/diagnosis"
              className="ml-4 px-4 sm:px-6 py-2 bg-maroon-800 text-white rounded-lg font-semibold text-sm hover:bg-maroon-900 transition-colors shadow-md"
            >
              Mulai Diagnosis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
