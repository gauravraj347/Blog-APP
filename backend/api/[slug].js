const dbConnect = require('../utils/db');
const Post = require('../models/Post');
const slugify = require('../utils/slugify');
const sanitize = require('../utils/sanitize');
const auth = require('./auth');

module.exports = async function handler(req, res) {
  const {
    query: { slug },
    method,
    body,
  } = req;
  await dbConnect();
  if (method === 'GET') {
    // Fetch post by slug
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.status(200).json({ post });
  } else if (method === 'PUT') {
    return auth(req, res, async () => {
      const { title, content } = body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      const cleanContent = sanitize(content);
      let newSlug = slug;
      if (title) {
        newSlug = slugify(title);
        // Ensure unique slug if title changed
        let uniqueSlug = newSlug;
        let count = 1;
        while (await Post.findOne({ slug: uniqueSlug, _id: { $ne: (await Post.findOne({ slug }))._id } })) {
          uniqueSlug = `${newSlug}-${count++}`;
        }
        newSlug = uniqueSlug;
      }
      const updated = await Post.findOneAndUpdate(
        { slug },
        { title, content: cleanContent, slug: newSlug, updatedAt: Date.now() },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json({ post: updated });
    });
  } else if (method === 'DELETE') {
    return auth(req, res, async () => {
      const deleted = await Post.findOneAndDelete({ slug });
      if (!deleted) return res.status(404).json({ error: 'Post not found' });
      return res.status(200).json({ success: true });
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}; 