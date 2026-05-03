import { getAllPosts, getPostBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ViewCounter from "@/components/ViewCounter";
import LikeButton from "@/components/LikeButton";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return { title: post.title, description: post.summary };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const formatted = new Date(post.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
          {post.title}
        </h1>

        {/* Metadata row */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600 mb-8 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-accent-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatted}
          </span>
          <ViewCounter slug={slug} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <div
        className="prose-enhanced"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Like section */}
      <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 mb-2">이 글이 도움이 되었나요?</p>
          <p className="text-sm text-gray-500">좋아요를 눌러주면 더 나은 콘텐츠 작성에 도움이 됩니다.</p>
        </div>
        <LikeButton slug={slug} />
      </div>
    </article>
  );
}
