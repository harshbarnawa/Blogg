import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CommunityPost } from '../types';

type CommunitySectionProps = {
  posts: CommunityPost[];
  onCreatePost: (payload: { title: string; description: string }) => Promise<void>;
  onToggleUpvote: (id: string) => Promise<void>;
};

const CommunitySection = ({ posts, onCreatePost, onToggleUpvote }: CommunitySectionProps) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onCreatePost(form);
      setForm({ title: '', description: '' });
    } catch (err) {
      console.error(err);
      setError('Could not create community post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Community Lounge</h2>
          <p className="text-sm text-slate-500">Ask questions, start discussions, or find collaborators.</p>
        </div>
      </div>
      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Discussion title"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Start the conversation..."
          className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          required
        />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            {loading ? 'Posting…' : 'Share with community'}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="rounded-2xl border border-slate-100 bg-white/80 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="text-sm text-slate-500">By {post.author?.name ?? 'Anonymous'}</p>
              </div>
              <button
                onClick={() => onToggleUpvote(post._id)}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-400"
              >
                ❤️ {post.upvotes?.length ?? 0} applauds
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600">{post.description}</p>
          </div>
        ))}
        {!posts.length && <p className="text-sm text-slate-400">No community threads yet.</p>}
      </div>
    </section>
  );
};

export default CommunitySection;

