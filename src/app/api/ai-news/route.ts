import axios from 'axios';
import { load } from 'cheerio';

interface Article {
  title: string;
  summary: string;
  link: string;
  date: string;
}

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const response = await axios.get('https://yozm.wishket.com/magazine/list/ai/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = load(response.data);
    const articles: Article[] = [];

    // Scrape articles from the page
    $('a[href*="/magazine/detail/"]').each((_, element) => {
      const $el = $(element);
      const $article = $el.closest('article') || $el.closest('[role="article"]') || $el.closest('.article') || $el.parent();

      const title =
        $article.find('h2, h3, [class*="title"]').text().trim() ||
        $el.find('h2, h3, [class*="title"]').text().trim() ||
        $el.attr('title') ||
        '';

      const summary =
        $article.find('p, [class*="summary"], [class*="excerpt"]').first().text().trim() ||
        $el.find('p').first().text().trim() ||
        '';

      const link = $el.attr('href') || '';
      const date =
        $article.find('time, [class*="date"], span[class*="date"]').attr('datetime') ||
        $article.find('time, [class*="date"], span[class*="date"]').text().trim() ||
        new Date().toISOString();

      if (title && link) {
        articles.push({
          title: title.substring(0, 100),
          summary: summary.substring(0, 200),
          link: link.startsWith('http') ? link : `https://yozm.wishket.com${link}`,
          date,
        });
      }
    });

    // Remove duplicates
    const uniqueArticles = Array.from(
      new Map(articles.map((item) => [item.title, item])).values()
    ).slice(0, 20);

    if (uniqueArticles.length === 0) {
      return Response.json({
        success: true,
        articles: [
          {
            title: 'AI 뉴스 로드 실패',
            summary: '현재 Wishket 매거진에서 뉴스를 가져올 수 없습니다. 나중에 다시 시도해주세요.',
            link: 'https://yozm.wishket.com/magazine/list/ai/',
            date: new Date().toISOString(),
          },
        ],
      });
    }

    return Response.json({
      success: true,
      articles: uniqueArticles,
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return Response.json({
      success: true,
      articles: [
        {
          title: 'AI 뉴스를 불러올 수 없습니다',
          summary: '네트워크 오류로 뉴스를 가져올 수 없습니다. 나중에 다시 시도해주세요.',
          link: 'https://yozm.wishket.com/magazine/list/ai/',
          date: new Date().toISOString(),
        },
      ],
    });
  }
}
