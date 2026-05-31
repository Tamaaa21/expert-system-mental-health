'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin');
      return;
    }

    setError('Username atau password salah.');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="text-center mb-6">
              <p className="text-maroon-700 text-xs font-semibold tracking-[0.2em] mb-3">
                ADMIN LOGIN
              </p>
              <h1 className="text-2xl font-bold text-gray-900">Masuk Admin</h1>
              <p className="text-gray-600 mt-2">
                Gunakan kredensial admin untuk mengakses dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100"
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100"
                  placeholder="admin123"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-full bg-maroon-800 py-3 text-white font-semibold hover:bg-maroon-900 transition-colors"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
