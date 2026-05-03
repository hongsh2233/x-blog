import type { Metadata } from 'next';
import AINewsClient from '@/components/AINewsClient';

export const metadata: Metadata = {
  title: 'AI 소식 | Tech Blog',
  description: 'Wishket 매거진에서 수집한 최신 AI 관련 뉴스입니다.',
};

export default function AINewsPage() {
  return <AINewsClient />;
}
