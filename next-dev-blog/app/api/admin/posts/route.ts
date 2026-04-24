import { forwardToNest } from "@/lib/admin/nest-bff";

export async function GET() {
  return forwardToNest("/admin/posts", { method: "GET" });
}

export async function POST(req: Request) {
  const body = await req.text();
  return forwardToNest("/admin/posts", {
    method: "POST",
    body,
  });
}
