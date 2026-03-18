import Link from "next/link";
import { PostMeta } from "@/lib/markdown";

export default function PostCard({ post }: { post: PostMeta }) {
  const formatted = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group py-8 border-b border-gray-200 last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 mb-3">{formatted}</p>
        <p className="text-gray-600 leading-relaxed mb-4">{post.summary}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
