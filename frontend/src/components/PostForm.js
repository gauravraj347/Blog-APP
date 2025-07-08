import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/PostForm.module.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
}

const PostForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [slugEditable, setSlugEditable] = useState(false);

  useEffect(() => {
    if (!isEdit || !initialData.slug) {
      setSlug(slugify(title));
    }
  }, [title, isEdit, initialData.slug]);

  const handleSlugEdit = () => setSlugEditable(true);
  const handleSlugChange = (e) => setSlug(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, slug });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>Title</label>
      <input
        type="text"
        className={styles.textInput}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label className={styles.label}>Content</label>
      <ReactQuill value={content} onChange={setContent} theme="snow" />
      <label className={styles.label}>Slug</label>
      <div className={styles.slugRow}>
        <input
          type="text"
          className={styles.textInput}
          value={slug}
          onChange={handleSlugChange}
          readOnly={!slugEditable}
          required
        />
        {!slugEditable && (
          <button type="button" onClick={handleSlugEdit} className={styles.editSlug}>
            Edit
          </button>
        )}
      </div>
      <button type="submit" className={styles.submitBtn}>
        {isEdit ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
