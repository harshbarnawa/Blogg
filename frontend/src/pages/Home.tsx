import { useEffect, useState } from 'react';
import BlogComposer from '../components/BlogComposer';
import BlogCard from '../components/BlogCard';
import CommunitySection from '../components/CommunitySection';
import {
  addCommentRequest,
  createBlogRequest,
  createCommunityPost,
  fetchBlogs,
  fetchCommunityPosts,
  toggleUpvoteRequest,
} from '../services/api';
import type { Blog, CommunityPost } from '../types';

const HomePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadContent = async () => {
    setLoading(true);
    setError('');
    try {
      const [blogsResponse, communityResponse] = await Promise.all([fetchBlogs(), fetchCommunityPosts()]);
      setBlogs(blogsResponse.data);
      setCommunityPosts(communityResponse.data);
    } catch (err) {
      console.error(err);
      setError('Unable to load latest content. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleCreateBlog = async (payload: {
    title: string;
    excerpt: string;
    content: string;
    bannerImage?: string;
    tags?: string[];
  }) => {
    const { data } = await createBlogRequest(payload);
    setBlogs((prev) => [data, ...prev]);
  };

  const handleAddComment = async (blogId: string, content: string) => {
    const { data } = await addCommentRequest(blogId, { content });
    setBlogs((prev) =>
      prev.map((blog) => (blog._id === blogId ? { ...blog, comments: [...blog.comments, data] } : blog))
    );
  };

  const handleCreateCommunityPost = async (payload: { title: string; description: string }) => {
    const { data } = await createCommunityPost(payload);
    setCommunityPosts((prev) => [data, ...prev]);
  };

  const handleToggleUpvote = async (id: string) => {
    const { data } = await toggleUpvoteRequest(id);
    setCommunityPosts((prev) => prev.map((post) => (post._id === id ? data : post)));
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-12 text-white shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Community-powered publication</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight">
          Fresh insights, thoughtful commentary, and a vibrant discussion space.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/70">
          Publish long-form blogs, collect feedback from readers, and connect with a curious community through threads
          and collaborative prompts.
        </p>
      </section>

      <BlogComposer onCreate={handleCreateBlog} />

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm">
          <p className="text-slate-500">Loading latest blogs…</p>
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-100 bg-rose-50/80 p-6 text-center text-rose-600">{error}</div>
      ) : (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800">Featured blogs</h2>
          <div className="space-y-5">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onAddComment={handleAddComment} />
            ))}
            {!blogs.length && (
              <div className="rounded-3xl border border-slate-200 bg-white/60 p-8 text-center text-slate-500">
                No blogs yet. Be the first author today!
              </div>
            )}
          </div>
        </section>
      )}

      <CommunitySection
        posts={communityPosts}
        onCreatePost={handleCreateCommunityPost}
        onToggleUpvote={handleToggleUpvote}
      />
    </div>
  );
};

export default HomePage;

