import { NextRequest, NextResponse } from "next/server";

/**
 * In-memory store for development.
 * TODO: Replace with Supabase upsert when connecting the DB.
 *
 * Example Supabase snippet:
 *   const { data } = await supabase
 *     .from('post_stats')
 *     .upsert({ slug, likes: supabase.rpc('increment_likes', { row_slug: slug }) })
 *     .select('likes')
 *     .single();
 */
const likesStore = new Map<string, number>();

type Params = { slug: string };

// GET /api/posts/[slug]/likes
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const likes = likesStore.get(slug) ?? 0;
  return NextResponse.json({ likes });
}

// POST /api/posts/[slug]/likes  — increment by 1
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const current = likesStore.get(slug) ?? 0;
  const updated = current + 1;
  likesStore.set(slug, updated);
  return NextResponse.json({ likes: updated });
}
