import { forwardToNest } from "@/lib/admin/nest-bff";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return forwardToNest(`/admin/posts/${encodeURIComponent(id)}`, {
    method: "GET",
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.text();
  return forwardToNest(`/admin/posts/${encodeURIComponent(id)}`, {
    method: "PUT",
    body,
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return forwardToNest(`/admin/posts/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
