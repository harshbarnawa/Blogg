import CommunityPost from '../models/CommunityPost.js';

export const getCommunityPosts = async (_req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate('author', 'name')
      .populate('upvotes', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Get community posts error', error);
    res.status(500).json({ message: 'Failed to fetch community posts' });
  }
};

export const createCommunityPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const post = await CommunityPost.create({
      title,
      description,
      author: req.user.id,
      upvotes: [],
    });

    const populated = await post.populate('author', 'name');
    res.status(201).json(populated);
  } catch (error) {
    console.error('Create community post error', error);
    res.status(500).json({ message: 'Failed to create community post' });
  }
};

export const toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await CommunityPost.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const hasUpvote = post.upvotes.some((userId) => userId.toString() === req.user.id);
    if (hasUpvote) {
      post.upvotes = post.upvotes.filter((userId) => userId.toString() !== req.user.id);
    } else {
      post.upvotes.push(req.user.id);
    }

    await post.save();
    const populated = await post.populate(['author', 'upvotes']);
    res.json(populated);
  } catch (error) {
    console.error('Toggle upvote error', error);
    res.status(500).json({ message: 'Failed to toggle upvote' });
  }
};

