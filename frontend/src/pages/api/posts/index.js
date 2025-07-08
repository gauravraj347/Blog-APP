// Proxy for listing all posts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const resp = await axios.get(`${API_BASE}/api/posts`);
      res.status(200).json({ posts: resp.data.posts });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  } else if (req.method === "POST") {
    // Create post
    try {
      const resp = await axios.post(`${API_BASE}/api/posts/create`, req.body, {
        headers: {
          'x-api-key': req.headers['x-api-key'] || '',
        },
      });
      res.status(200).json(resp.data);
    } catch (err) {
      res.status(500).json({ error: err?.response?.data?.error || err.message || "Failed to create post" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
