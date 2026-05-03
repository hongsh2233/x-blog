import puppeteer from 'puppeteer';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);

    await page.goto('https://yozm.wishket.com/magazine/list/ai/', {
      waitUntil: 'networkidle2',
    });

    const articles = await page.evaluate(() => {
      const items: any[] = [];
      const articles = document.querySelectorAll('[class*="article"]');

      articles.forEach((article) => {
        const titleEl = article.querySelector('h2, h3, [class*="title"]');
        const summaryEl = article.querySelector('[class*="summary"], [class*="excerpt"], p');
        const linkEl = article.querySelector('a');
        const dateEl = article.querySelector('[class*="date"], time');

        if (titleEl && linkEl) {
          items.push({
            title: titleEl.textContent?.trim() || 'No title',
            summary: summaryEl?.textContent?.trim() || 'No summary',
            link: linkEl.getAttribute('href') || '',
            date: dateEl?.textContent?.trim() || new Date().toISOString(),
          });
        }
      });

      return items;
    });

    await browser.close();

    if (articles.length === 0) {
      // Fallback: Return mock data if scraping fails
      return Response.json({
        success: true,
        articles: [
          {
            title: 'AI 뉴스를 불러올 수 없습니다',
            summary: '페이지 구조가 변경되었을 수 있습니다. 나중에 다시 시도해주세요.',
            link: 'https://yozm.wishket.com/magazine/list/ai/',
            date: new Date().toISOString(),
          },
        ],
      });
    }

    return Response.json({
      success: true,
      articles: articles.slice(0, 20), // Return top 20 articles
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
