import { useState } from 'react';
import type { FormEvent } from 'react';

type BlogComposerProps = {
  onCreate: (payload: {
    title: string;
    excerpt: string;
    content: string;
    bannerImage?: string;
    tags?: string[];
  }) => Promise<void>;
};

const initialState = {
  title: '',
  excerpt: '',
  content: '',
  bannerImage: '',
  tags: '',
};

const BlogComposer = ({ onCreate }: BlogComposerProps) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        bannerImage: form.bannerImage || undefined,
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };
      await onCreate(payload);
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setError('Could not publish blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
      <h2 className="text-xl font-semibold text-slate-800">Write a new story</h2>
      <p className="mt-1 text-sm text-slate-500">Share your knowledge with the community.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
            required
          />
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Short description"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
            required
          />
        </div>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your full blog content here..."
          className="min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="bannerImage"
            value={form.bannerImage}
            onChange={handleChange}
            placeholder="Banner image URL (optional)"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          />
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            {loading ? 'Publishing…' : 'Publish blog'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BlogComposer;

