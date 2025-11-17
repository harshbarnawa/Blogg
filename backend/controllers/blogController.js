import Blog from '../models/Blog.js';

export const getBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name')
      .populate('comments.author', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Get blogs error', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, bannerImage, tags } = req.body;
    if (!title || !excerpt || !content) {
      return res.status(400).json({ message: 'Title, excerpt and content are required' });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      bannerImage,
      tags,
      author: req.user.id,
    });

    const populated = await blog.populate('author', 'name');
    res.status(201).json(populated);
  } catch (error) {
    console.error('Create blog error', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Comment content required' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.comments.push({ author: req.user.id, content });
    await blog.save();

    const populated = await blog.populate('comments.author', 'name');
    res.status(201).json(populated.comments[populated.comments.length - 1]);
  } catch (error) {
    console.error('Add comment error', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

