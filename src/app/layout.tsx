import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "마크다운 기반 기술 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-white">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
          <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-accent-600 transition-colors duration-200 tracking-tight"
            >
              Tech Blog
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                href="/ai-news"
                className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors duration-200"
              >
                AI 소식
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 hover:text-accent-600 transition-colors duration-200"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-8 py-16">
          {children}
        </main>

        <footer className="border-t border-gray-100 py-12 text-center text-sm text-gray-500 bg-gray-50/50">
          <p className="mb-2">© {new Date().getFullYear()} Tech Blog</p>
          <p className="text-xs text-gray-400">Built with <span className="text-accent-600 font-medium">Next.js</span> &amp; <span className="text-accent-600 font-medium">Tailwind CSS</span></p>
        </footer>
      </body>
    </html>
  );
}
