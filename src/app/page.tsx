import { getAllPosts } from "@/lib/markdown";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          글 목록
        </h1>
        <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl">
          개발하며 배운 것들을 기록합니다.
          <br />
          기술, 디자인, 그리고 학습 경험을 공유합니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-gray-400 text-lg">아직 게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="-mx-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
