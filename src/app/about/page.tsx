export const metadata = {
  title: "About | Tech Blog",
  description: "블로그 소개 페이지",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 tracking-tight">About</h1>

      <div className="space-y-8">
        <p className="text-lg text-gray-700 leading-8 font-light">
          개발하면서 배운 것들, 삽질한 경험, 유용한 팁들을 기록하는 기술 블로그입니다.
        </p>

        <p className="text-lg text-gray-700 leading-8 font-light">
          Next.js, React, TypeScript, Tailwind CSS를 주로 다루며, 가끔 개발 철학이나
          생산성에 관한 글도 씁니다.
        </p>

        <div className="mt-12 pt-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">기술 스택</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map((tech) => (
              <div key={tech} className="px-4 py-3 bg-accent-50 text-accent-700 rounded-lg font-medium text-sm border border-accent-100">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
