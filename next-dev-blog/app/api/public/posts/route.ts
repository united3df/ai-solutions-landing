import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/services/blogApi";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
