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
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Metadata row */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
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

      {/* Divider */}
      <hr className="border-gray-200 mb-10" />

      {/* Content */}
      <div
        className="prose prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-7
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-transparent prose-pre:p-0
          prose-pre:rounded-none prose-pre:shadow-none
          prose-table:text-sm
          prose-th:bg-gray-100 prose-th:font-semibold
          prose-li:text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Like section */}
      <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-500">이 글이 도움이 되었나요?</p>
        <LikeButton slug={slug} />
      </div>
    </article>
  );
}
