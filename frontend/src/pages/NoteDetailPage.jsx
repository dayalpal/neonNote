import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../api";

const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const NoteDetailPage = ({ auth }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(apiUrl(`/api/notes/get/${id}`), {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) throw new Error("Note not found");
        const data = await response.json();
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        toast.error(error.message || "Could not load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, auth.token]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(apiUrl(`/api/notes/update/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) throw new Error("Unable to update note");
      toast.success("Note updated successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Could not update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;

    try {
      const response = await fetch(apiUrl(`/api/notes/delete/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) throw new Error("Unable to delete note");
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Could not delete note.");
    }
  };

  if (loading) {
    return <div className="page note-detail-page">Loading note...</div>;
  }

  if (!note) {
    return <div className="page note-detail-page">Note not found.</div>;
  }

  return (
    <div className="page note-detail-page">
      <div className="page-header">
        <div>
          <h1>Edit Note</h1>
          <p className="text-muted">
            Created: {formatDate(note.createdAt)} • Updated: {formatDate(note.updatedAt)}
          </p>
        </div>
      </div>
      <form onSubmit={handleUpdate} className="note-form">
        <label>
          Title
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={8}
          />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Note"}
          </button>
          <button type="button" className="delete-button" onClick={handleDelete}>
            Delete Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteDetailPage;
