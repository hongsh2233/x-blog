import { getAllPosts } from "@/lib/markdown";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">글 목록</h1>
        <p className="text-gray-500">개발하며 배운 것들을 기록합니다.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-20">아직 게시글이 없습니다.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
