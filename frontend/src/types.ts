export type UserSummary = {
  id: string;
  name: string;
  email: string;
};

export type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
  };
};

export type Blog = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  bannerImage?: string;
  tags?: string[];
  createdAt: string;
  author: {
    _id: string;
    name: string;
  };
  comments: Comment[];
};

export type CommunityPost = {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    name: string;
  };
  upvotes: { _id: string; name: string }[];
  createdAt: string;
};

