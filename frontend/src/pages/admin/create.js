import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostForm from "../../components/PostForm";

export default function CreatePost() {
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      await axios.post(
        "/api/posts",
        data,
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || '',
          },
        }
      );
      router.push("/admin");
    } catch (err) {
      alert("Failed to create post: " + (err?.response?.data?.error || err?.response?.data?.message || err.message || "Unknown error"));
    }
  };
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h1>Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
