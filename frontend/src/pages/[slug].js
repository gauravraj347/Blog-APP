import React from "react";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps({ params }) {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://blog-app-xwiv.onrender.com";
    const res = await axios.get(`${API_BASE}/api/posts/${params.slug}`);
    return { props: { post: res.data.post } };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }
}

export default function PostPage({ post }) {
  if (!post) return <p>Post not found</p>;
  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.title} />
        <meta property="og:type" content="article" />
      </Head>
      <div style={{ maxWidth: 700, margin: "2rem auto", padding: "0 1rem" }}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <p style={{ color: "#888", marginTop: "2rem" }}>
          Published: {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
    </>
  );
}
