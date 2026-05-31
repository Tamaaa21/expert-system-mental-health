'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

type Article = {
  title: string;
  description: string;
  category: string;
  image: string;
  tag: string;
};

export default function Informasi() {
  const categories = ['Semua', 'Tips & Self Care', 'Stres & Kecemasan', 'Motivasi', 'Layanan & Bantuan'];
  const [activeCategory, setActiveCategory] = useState('Semua');

  const articles: Article[] = [
    {
      title: '5 Cara Menjaga Kesehatan Mental di Tengah Kesibukan Kuliah',
      description:
        'Tips praktis untuk menjaga keseimbangan mental dan fisik selama masa perkuliahan.',
      category: 'Tips & Self Care',
      tag: 'Tips & Self Care',
      image:
        'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Mengenal Stres Akademik dan Cara Mengelolanya',
      description:
        'Panduan untuk mengenali tanda stres akademik dan strategi mengatasinya.',
      category: 'Stres & Kecemasan',
      tag: 'Stres & Kecemasan',
      image:
        'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Bangun Motivasi Diri Saat Merasa Lelah',
      description:
        'Cara sederhana untuk membangun kembali semangat dan fokus belajar.',
      category: 'Motivasi',
      tag: 'Motivasi',
      image:
        'https://images.pexels.com/photos/4101141/pexels-photo-4101141.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Layanan Konseling di Universitas Harkat Negeri',
      description:
        'Informasi layanan konseling dan bagaimana mendapatkan bantuan profesional.',
      category: 'Layanan & Bantuan',
      tag: 'Layanan & Bantuan',
      image:
        'https://images.pexels.com/photos/4101148/pexels-photo-4101148.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const visibleArticles =
    activeCategory === 'Semua'
      ? articles
      : articles.filter((item) => item.category === activeCategory);

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-maroon-700 text-xs font-semibold tracking-[0.2em] mb-3">
              INFORMASI & EDUKASI
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Informasi Kesehatan Mental
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai informasi, tips, dan sumber daya untuk menjaga kesehatan mental Anda.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  activeCategory === category
                    ? 'bg-maroon-800 text-white border-maroon-800'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-maroon-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  <span className="inline-flex px-3 py-1 rounded-full bg-maroon-50 text-maroon-800 text-xs font-semibold">
                    {article.tag}
                  </span>
                </div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                  <button className="text-maroon-800 text-sm font-semibold hover:text-maroon-900">
                    Baca Selengkapnya -
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Help CTA */}
          <div className="mt-12 bg-maroon-50 border border-maroon-100 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-maroon-800 mb-3">
              Butuh Bantuan Segera?
            </h2>
            <p className="text-gray-600 mb-6">
              Jika Anda merasa tertekan atau membutuhkan seseorang untuk diajak bicara,
              jangan ragu untuk mencari bantuan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1500123"
                className="px-6 py-3 bg-maroon-800 text-white rounded-full font-semibold hover:bg-maroon-900 transition-colors"
              >
                Hubungi Layanan Konseling
              </a>
              <a
                href="mailto:support@uhn.ac.id"
                className="px-6 py-3 border border-maroon-300 text-maroon-800 rounded-full font-semibold hover:bg-maroon-100 transition-colors"
              >
                Email Kami
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
