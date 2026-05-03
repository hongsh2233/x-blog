import type { Metadata } from 'next';
import AITimesNewsClient from '@/components/AITimesNewsClient';

export const metadata: Metadata = {
  title: 'AI Times 뉴스 | Tech Blog',
  description: 'AI Times에서 수집한 최신 AI 관련 뉴스입니다.',
};

export default function AITimesNewsPage() {
  return <AITimesNewsClient />;
}
