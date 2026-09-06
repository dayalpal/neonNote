import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../api";

const CreatePage = ({ auth }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please enter a title and content.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(apiUrl("/api/notes/create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Unable to create note");

      await response.json();
      toast.success("Note created successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Could not create note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page create-page">
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit} className="note-form">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Note title"
          />
        </label>
        <label>
          Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Note content"
            rows={8}
          />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
