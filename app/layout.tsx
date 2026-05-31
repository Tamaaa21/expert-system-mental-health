import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diagnosis Depresi - Universitas Harkat',
  description:
    'Platform diagnosis kesehatan mental untuk mahasiswa Universitas Harkat Negeri',
    icons: {
      icon: '/logo-ml.png',
    },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white">{children}</body>
    </html>
  );
}
