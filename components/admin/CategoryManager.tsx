'use client';
import { useState } from 'react';

interface CategoryManagerProps {
  categories: { _id: string; name: string; description?: string }[];
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Saving category...');
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      setName('');
      setDescription('');
      setStatus('Category added successfully.');
      window.location.reload();
    } else {
      const body = await res.json();
      setStatus(body.error || 'Could not add category.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this category?')) return;
    const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200/10 bg-white/90 p-6 shadow-gold">
      <h3 className="text-lg font-semibold text-slate-900">Manage categories</h3>
      <form onSubmit={handleAdd} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" required />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold" />
        </div>
        <button type="submit" className="rounded-3xl bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-yellow-400">
          Add category
        </button>
        {status ? <p className="text-sm text-slate-600">{status}</p> : null}
      </form>
      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <div key={category._id} className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">{category.name}</p>
              <p className="text-sm text-slate-600">{category.description || 'No description'}</p>
            </div>
            <button type="button" onClick={() => handleDelete(category._id)} className="text-sm text-red-600 transition hover:text-red-400">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
