import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Blog } from '../types';
import CommentList from './CommentList';

type BlogCardProps = {
  blog: Blog;
  onAddComment: (blogId: string, comment: string) => Promise<void>;
};

const BlogCard = ({ blog, onAddComment }: BlogCardProps) => {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.trim()) return;

    setError('');
    setSubmitting(true);
    try {
      await onAddComment(blog._id, comment.trim());
      setComment('');
    } catch (err) {
      console.error(err);
      setError('Could not add comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{blog.title}</h3>
          <p className="mt-1 text-sm text-slate-500">By {blog.author?.name ?? 'Unknown'}</p>
        </div>
        {blog.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {blog.bannerImage && (
        <img
          src={blog.bannerImage}
          alt={blog.title}
          className="mt-4 w-full rounded-2xl object-cover"
          loading="lazy"
        />
      )}
      <p className="mt-4 text-base text-slate-700">{blog.excerpt}</p>
      <p className="mt-2 text-sm text-slate-500">{blog.content}</p>
      <div className="mt-6 border-t border-slate-100 pt-6">
        <h4 className="text-sm font-semibold text-slate-700">Responses</h4>
        <CommentList comments={blog.comments || []} />
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment..."
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          />
          {error && <p className="text-xs text-rose-500">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
            >
              {submitting ? 'Posting…' : 'Post comment'}
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default BlogCard;

