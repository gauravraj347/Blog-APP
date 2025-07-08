import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/api/posts")
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: '#f7f7fa', minHeight: '100vh', padding: '0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ background: '#22223b', color: '#fff', padding: '2rem 0', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '1px' }}>📝 My Blog</h1>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1.1rem', color: '#c9c9e0' }}>A place to share ideas and stories</p>
          </div>
          <Link href="/admin" style={{
            display: 'inline-block',
            background: '#9a8c98',
            color: '#fff',
            padding: '0.7rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            transition: 'background 0.2s',
          }}>Admin Dashboard</Link>
        </div>
      </header>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 1rem' }}>
        {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
          posts.length === 0 ? <p>No posts found.</p> : (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {posts.map(post => (
                <li key={post.slug} style={{
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  marginBottom: '2rem',
                  padding: '2rem',
                  transition: 'box-shadow 0.2s',
                  border: '1px solid #ececec',
                }}>
                  <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.6rem', color: '#22223b' }}>
                    <Link href={`/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: '0.7rem' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '1.05rem', color: '#444', marginBottom: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: post.content.slice(0, 200) + (post.content.length > 200 ? '...' : '') }} />
                  <Link href={`/${post.slug}`} style={{
                    display: 'inline-block',
                    background: '#4a4e69',
                    color: '#fff',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    transition: 'background 0.2s',
                  }}>Read more</Link>
                </li>
              ))}
            </ul>
          )
        )}
      </main>
    </div>
  );
}
