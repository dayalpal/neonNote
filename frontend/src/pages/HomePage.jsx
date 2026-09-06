import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const HomePage = ({ auth }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        const response = await fetch(apiUrl("/api/notes/get"), {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        toast.error(error.message || "Could not load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [auth.user, auth.token]);

  if (!auth.user) {
    return (
      <div className="page home-page">
        <div className="page-header">
          <h1>Welcome</h1>
        </div>
        <p>You must log in to view your personal notes.</p>
        <Link className="button" to="/login">
          Login or Register
        </Link>
      </div>
    );
  }

  return (
    <div className="page home-page">
      <div className="page-header">
        <div>
          <h1>{auth.user.name}'s Notes</h1>
          <p className="text-muted">Only notes created by you are visible here.</p>
        </div>
        <Link className="button" to="/create">
          Create New Note
        </Link>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found. Create one to get started.</p>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <Link key={note._id} to={`/note/${note._id}`} className="note-card">
              <h2>{note.title}</h2>
              <p>{note.content.slice(0, 120)}{note.content.length > 120 ? "..." : ""}</p>
              <div className="note-meta">
                <span>Created: {formatDate(note.createdAt)}</span>
                <span>Updated: {formatDate(note.updatedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
