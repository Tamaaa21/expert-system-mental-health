import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diagnosis Depresi - Universitas Harkat Negeri',
  description:
    'Platform diagnosis kesehatan mental untuk mahasiswa Universitas Harkat Negeri',
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
