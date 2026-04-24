import { notFound, redirect } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { adminNestFetch } from "@/lib/admin/nest-server";
import type { AdminPostFull } from "@/lib/admin/types";

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    notFound();
  }
  const res = await adminNestFetch(`/admin/posts/${id}`);
  if (!res) {
    redirect("/admin/login");
  }
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    redirect("/admin/login");
  }
  const post = (await res.json()) as AdminPostFull;
  return <PostEditor mode="edit" initial={post} />;
}
