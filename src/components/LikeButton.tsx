"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${slug}/likes`)
      .then((r) => r.json())
      .then((data: { likes: number }) => {
        setLikes(data.likes);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleLike = async () => {
    if (liked) return; // 한 번만 누를 수 있음

    // Optimistic update
    setLikes((prev) => prev + 1);
    setLiked(true);

    try {
      const res = await fetch(`/api/posts/${slug}/likes`, { method: "POST" });
      const data: { likes: number } = await res.json();
      setLikes(data.likes);
    } catch {
      // Rollback on error
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      className={`
        flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform
        ${
          liked
            ? "bg-accent-100 text-accent-700 border-2 border-accent-300 cursor-default shadow-md"
            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-accent-400 hover:text-accent-600 hover:bg-accent-50 active:scale-95"
        }
        disabled:opacity-60 disabled:scale-100
      `}
      aria-label="좋아요"
    >
      <svg
        className={`w-6 h-6 transition-all duration-300 ${liked ? "scale-110" : ""}`}
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{loading ? "—" : likes.toLocaleString()}</span>
    </button>
  );
}
