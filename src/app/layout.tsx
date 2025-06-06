// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const metadata: Metadata = {
  title: 'Your Name | Fullstack Developer',
  description: 'Fullstack Developer portfolio built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        <Header />
        <main className="relative z-10 overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
