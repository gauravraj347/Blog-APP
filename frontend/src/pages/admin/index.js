import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/AdminDashboard.module.css";

export default function AdminDashboard() {
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

  const handleDelete = async (slug) => {
    if (!confirm("Delete this post?")) return;
    try {
      await axios.delete(`/api/posts/${slug}`, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
        },
      });
      setPosts(posts.filter(p => p.slug !== slug));
    } catch {
      alert("Failed to delete post");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>
      <Link href="/admin/create" className={styles.createBtn}>Create New Post</Link>
      {loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableTh}>Title</th>
              <th className={styles.tableTh}>Slug</th>
              <th className={styles.tableTh}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.slug}>
                <td className={styles.tableTd}>{post.title}</td>
                <td className={styles.tableTd}>
                  <Link href={`/${post.slug}`}>{post.slug}</Link>
                </td>
                <td className={styles.tableTd}>
                  <Link href={`/admin/edit/${post.slug}`} className={styles.editBtn}>Edit</Link>
                  <button onClick={() => handleDelete(post.slug)} className={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
