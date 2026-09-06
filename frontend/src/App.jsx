import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import UserLogIn from "./pages/UserLogIn";
import { Toaster } from "react-hot-toast";

const STORAGE_KEY = "mern-app-auth";

const getStoredAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { user: null, token: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
};

const saveAuth = (authData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
};

const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const App = () => {
  const [auth, setAuth] = useState(() => {
    const stored = getStoredAuth();
    return { ...stored, ready: true };
  });


  const login = (user, token) => {
    const newAuth = { user, token, ready: true };
    saveAuth(newAuth);
    setAuth(newAuth);
  };

  const logout = () => {
    clearAuth();
    setAuth({ user: null, token: null, ready: true });
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <nav>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
            Home
          </NavLink>
          <NavLink to="/create" className={({ isActive }) => (isActive ? "active" : undefined)}>
            Create
          </NavLink>
          {auth.user ? (
            <button className="button" onClick={logout} type="button">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Login / Register
            </NavLink>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage auth={auth} />} />
          <Route
            path="/create"
            element={auth.user ? <CreatePage auth={auth} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/note/:id"
            element={auth.user ? <NoteDetailPage auth={auth} /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<UserLogIn auth={auth} login={login} />} />
        </Routes>
      </main>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
