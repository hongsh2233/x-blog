import { NextRequest, NextResponse } from "next/server";

/**
 * In-memory store for development.
 * TODO: Replace with Supabase upsert when connecting the DB.
 *
 * Example Supabase snippet:
 *   const { data } = await supabase
 *     .from('post_stats')
 *     .upsert({ slug, views: supabase.rpc('increment', { row_slug: slug }) })
 *     .select('views')
 *     .single();
 */
const viewsStore = new Map<string, number>();

type Params = { slug: string };

// GET /api/posts/[slug]/views
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const views = viewsStore.get(slug) ?? 0;
  return NextResponse.json({ views });
}

// POST /api/posts/[slug]/views  — increment by 1
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const current = viewsStore.get(slug) ?? 0;
  const updated = current + 1;
  viewsStore.set(slug, updated);
  return NextResponse.json({ views: updated });
}
