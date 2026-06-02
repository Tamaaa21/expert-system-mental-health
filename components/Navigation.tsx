'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-maroon-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-800"
            >
              <svg className={`${open ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${open ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`${open ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-maroon-100">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'text-maroon-800' : 'text-gray-700 hover:text-maroon-800'
            }`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') ? 'text-maroon-800' : 'text-gray-700 hover:text-maroon-800'
            }`}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/informasi"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/informasi') ? 'text-maroon-800' : 'text-gray-700 hover:text-maroon-800'
            }`}
            onClick={() => setOpen(false)}
          >
            Informasi
          </Link>

          <Link
            href="/diagnosis"
            className="block w-full text-center mt-2 px-4 py-2 bg-maroon-800 text-white rounded-lg font-semibold text-sm hover:bg-maroon-900 transition-colors shadow-md"
            onClick={() => setOpen(false)}
          >
            Mulai Diagnosis
          </Link>
        </div>
      </div>
    </nav>
  );
}
