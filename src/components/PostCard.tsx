import Link from "next/link";
import { PostMeta } from "@/lib/markdown";

export default function PostCard({ post }: { post: PostMeta }) {
  const formatted = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group py-8 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 px-4 -mx-4 transition-colors duration-200">
      <Link href={`/posts/${post.slug}`} className="block">
        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors duration-200 mb-3 tracking-tight leading-snug">
          {post.title}
        </h2>
        <p className="text-sm font-medium text-gray-500 mb-4 tracking-wide">{formatted}</p>
        <p className="text-gray-700 leading-8 mb-5 text-base">{post.summary}</p>
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
