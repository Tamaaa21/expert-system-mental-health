'use client';

import Link from 'next/link';
import { Heart, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">UHN Health</span>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Platform kesehatan mental terpercaya untuk mahasiswa Universitas Harkat Negeri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Navigasi</h4>
            <ul className="space-y-3 text-neutral-300 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/informasi', label: 'Informasi' },
                { href: '/diagnosis', label: 'Diagnosis' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Layanan</h4>
            <ul className="space-y-3 text-neutral-300 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors font-medium">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors font-medium">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors font-medium">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors font-medium">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5 text-white">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">(0274) 1234-5678</p>
                  <p className="text-neutral-400 text-xs">Mon-Fri, 08:00 - 17:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">support@uhn.ac.id</p>
                  <p className="text-neutral-400 text-xs">Response time: 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-center sm:text-left text-neutral-400 text-sm mb-4 sm:mb-0">
              © 2024 Universitas Harkat Negeri. All rights reserved.
            </p>
            <p className="text-center sm:text-right text-neutral-500 text-xs">
              Caring for your mental health, always.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
