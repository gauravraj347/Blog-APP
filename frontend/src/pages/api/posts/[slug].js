// Proxy dynamic post operations to backend
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://blog-app-xwiv.onrender.com";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { slug } = query;
  try {
    if (method === "GET") {
      const resp = await axios.get(`${API_BASE}/api/posts/${slug}`);
      res.status(200).json({ post: resp.data.post });
    } else if (method === "PUT") {
      const resp = await axios.put(`${API_BASE}/api/posts/${slug}`, body, {
        headers: {
          'x-api-key': req.headers['x-api-key'] || '',
        },
      });
      res.status(200).json(resp.data);
    } else if (method === "DELETE") {
      const resp = await axios.delete(`${API_BASE}/api/posts/${slug}`, {
        headers: {
          'x-api-key': req.headers['x-api-key'] || '',
        },
      });
      res.status(200).json(resp.data);
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({ message: "Backend error" });
  }
}
