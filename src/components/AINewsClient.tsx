'use client';

import { useEffect, useState } from 'react';

interface Article {
  title: string;
  summary: string;
  link: string;
  date: string;
}

export default function AINewsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/ai-news');
        const data = await response.json();

        if (data.success) {
          setArticles(data.articles);
        } else {
          setError('뉴스를 불러올 수 없습니다');
        }
      } catch (err) {
        setError('요청 중 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          AI 소식
        </h1>
        <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl">
          Wishket 매거진에서 수집한 최신 AI 관련 뉴스입니다.
        </p>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
          </div>
          <p className="text-gray-500 mt-4">뉴스를 불러오는 중...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
          <a
            href="https://yozm.wishket.com/magazine/list/ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors"
          >
            Wishket 매거진 방문
          </a>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="-mx-4">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link.startsWith('http') ? article.link : `https://yozm.wishket.com${article.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-8 px-4 -mx-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200"
            >
              <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide">
                {formatDate(article.date)}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors duration-200 mb-3 tracking-tight leading-snug">
                {article.title}
              </h2>
              <p className="text-gray-700 leading-8 line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-accent-600 font-medium group-hover:gap-3 transition-all">
                원문 보기
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400">뉴스를 찾을 수 없습니다</p>
        </div>
      )}
    </div>
  );
}
