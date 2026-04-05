import { connectDb } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { Category } from '@/models/Category';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminPostForm } from '@/components/admin/AdminPostForm';
import { CategoryManager } from '@/components/admin/CategoryManager';
import { PostTable } from '@/components/admin/PostTable';
import { LogoutButton } from '@/components/admin/LogoutButton';

async function getAdminData() {
  await connectDb();
  const [posts, categories] = await Promise.all([
    Post.find().sort({ createdAt: -1 }).lean(),
    Category.find().sort({ name: 1 }).lean(),
  ]);
  return { posts, categories };
}

export default async function DashboardPage() {
  const { posts, categories } = await getAdminData();

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200/10 bg-white/95 p-6 shadow-gold sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Admin dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Manage your content</h1>
          </div>
          <LogoutButton />
        </div>
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <AdminPostForm categories={categories} />
            <PostTable posts={posts} />
          </div>
          <CategoryManager categories={categories} />
        </div>
      </div>
    </AdminShell>
  );
}
