'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-neutral-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm text-neutral-900">UHN</span>
              <span className="text-xs text-neutral-500 font-medium">Mental Health</span>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/informasi', label: 'Informasi' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/diagnosis"
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 active:scale-95"
            >
              Diagnosis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
