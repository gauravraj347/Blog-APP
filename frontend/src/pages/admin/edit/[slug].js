import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostForm from "../../../components/PostForm";

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    axios.get(`/api/posts/${slug}`)
      .then(res => {
        setInitialData(res.data.post);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to load post");
        router.push("/admin");
      });
  }, [slug]);

  const handleSubmit = async (data) => {
    try {
      await axios.put(`/api/posts/${slug}`, data, {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
        },
      });
      router.push("/admin");
    } catch (err) {
      alert("Failed to update post: " + (err?.response?.data?.error || err?.response?.data?.message || err.message || "Unknown error"));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!initialData) return null;

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h1>Edit Post</h1>
      <PostForm initialData={initialData} onSubmit={handleSubmit} isEdit />
    </div>
  );
}
