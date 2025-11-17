import axios from 'axios';
import type { Blog, CommunityPost, UserSummary } from '../types';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type AuthResponse = {
  token: string;
  user: UserSummary;
};

export const registerRequest = (payload: { name: string; email: string; password: string }) =>
  api.post<AuthResponse>('/auth/register', payload);

export const loginRequest = (payload: { email: string; password: string }) =>
  api.post<AuthResponse>('/auth/login', payload);

export const fetchBlogs = () => api.get<Blog[]>('/blogs');

export const createBlogRequest = (payload: {
  title: string;
  excerpt: string;
  content: string;
  bannerImage?: string;
  tags?: string[];
}) => api.post<Blog>('/blogs', payload);

export const addCommentRequest = (blogId: string, payload: { content: string }) =>
  api.post(`/blogs/${blogId}/comments`, payload);

export const fetchCommunityPosts = () => api.get<CommunityPost[]>('/community');

export const createCommunityPost = (payload: { title: string; description: string }) =>
  api.post<CommunityPost>('/community', payload);

export const toggleUpvoteRequest = (postId: string) => api.patch<CommunityPost>(`/community/${postId}/upvote`);

