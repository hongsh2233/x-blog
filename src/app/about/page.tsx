export const metadata = {
  title: "About | Tech Blog",
  description: "블로그 소개 페이지",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        개발하면서 배운 것들, 삽질한 경험, 유용한 팁들을 기록하는 기술 블로그입니다.
      </p>
      <p className="text-gray-600 leading-relaxed">
        Next.js, React, TypeScript, Tailwind CSS를 주로 다루며, 가끔 개발 철학이나
        생산성에 관한 글도 씁니다.
      </p>
    </div>
  );
}
