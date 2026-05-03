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
    const response = await axios.get(
      'https://www.aitimes.kr/news/articleList.html?sc_section_code=S1N2&view_type=sm',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 15000,
      }
    );

    const $ = load(response.data);
    const articles: Article[] = [];

    // Parse article list
    $('a[href*="/news/view"]').each((_, element) => {
      const $el = $(element);
      const $row = $el.closest('tr') || $el.closest('li') || $el.closest('[class*="item"]');

      const title = $el.text().trim();
      const link = $el.attr('href') || '';

      // Try to find date and summary
      const dateEl = $row?.find('[class*="date"], time, span[class*="time"]').first();
      const date = dateEl?.text().trim() || new Date().toISOString();

      // Try to find summary
      const summaryEl = $row?.find('p, [class*="summary"], [class*="excerpt"]').first();
      const summary = summaryEl?.text().trim() || title.substring(0, 100);

      if (title && link) {
        articles.push({
          title: title.substring(0, 120),
          summary: summary.substring(0, 200),
          link: link.startsWith('http') ? link : `https://www.aitimes.kr${link}`,
          date,
        });
      }
    });

    // Remove duplicates and limit to 20
    const uniqueArticles = Array.from(
      new Map(articles.map((item) => [item.title, item])).values()
    ).slice(0, 20);

    if (uniqueArticles.length === 0) {
      return Response.json({
        success: false,
        message: 'AI Times에서 뉴스를 불러올 수 없습니다',
        articles: [
          {
            title: 'AI Times 뉴스 로드 실패',
            summary: 'AI Times 웹사이트에서 뉴스를 가져올 수 없습니다. 직접 방문해주세요.',
            link: 'https://www.aitimes.kr/news/articleList.html?sc_section_code=S1N2',
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
    console.error('AI Times scraping error:', error);

    return Response.json({
      success: false,
      message: 'AI Times 뉴스를 불러올 수 없습니다',
      articles: [
        {
          title: 'AI Times 뉴스 로드 실패',
          summary: 'AI Times 웹사이트에서 뉴스를 가져올 수 없습니다. 네트워크 오류가 발생했거나 웹사이트에 접근할 수 없습니다. 직접 방문해주세요.',
          link: 'https://www.aitimes.kr/news/articleList.html?sc_section_code=S1N2',
          date: new Date().toISOString(),
        },
      ],
    });
  }
}
