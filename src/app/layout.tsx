// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://my-portfolio-virid-phi-66.vercel.app'),
  title: 'Ray | Fullstack Developer',
  description: 'Fullstack Web Developer',
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
