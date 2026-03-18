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
      <body className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Tech Blog
            </Link>
            <nav>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Tech Blog. Built with Next.js &amp; Tailwind CSS.
        </footer>
      </body>
    </html>
  );
}
