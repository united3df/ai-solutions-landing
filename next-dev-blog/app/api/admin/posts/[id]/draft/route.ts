import { forwardToNest } from "@/lib/admin/nest-bff";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return forwardToNest(`/admin/posts/${encodeURIComponent(id)}/draft`, {
    method: "POST",
  });
}
