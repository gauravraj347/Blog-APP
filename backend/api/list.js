const dbConnect = require('../utils/db');
const Post = require('../models/Post');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await dbConnect();
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}; 