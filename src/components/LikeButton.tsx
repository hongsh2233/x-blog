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
        flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-200
        ${
          liked
            ? "border-red-400 bg-red-50 text-red-500 cursor-default"
            : "border-gray-300 bg-white text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
        }
        disabled:opacity-60
      `}
      aria-label="좋아요"
    >
      <svg
        className={`w-5 h-5 transition-transform ${liked ? "scale-110" : ""}`}
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
      <span className="font-medium">{loading ? "—" : likes.toLocaleString()}</span>
    </button>
  );
}
