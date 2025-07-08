const dbConnect = require('../utils/db');
const Post = require('../models/Post');
const slugify = require('../utils/slugify');
const sanitize = require('../utils/sanitize');
const auth = require('./auth');

module.exports = async function handler(req, res) {
  auth(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const cleanContent = sanitize(content);
    await dbConnect();
    let slug = slugify(title);
    // Ensure unique slug
    let uniqueSlug = slug;
    let count = 1;
    while (await Post.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count++}`;
    }
    try {
      const post = await Post.create({ title, content: cleanContent, slug: uniqueSlug });
      return res.status(201).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
}; 