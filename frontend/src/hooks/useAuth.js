import { useEffect, useState } from "react";

const STORAGE_KEY = "mern-app-auth";

const getStoredAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveAuth = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export function useAuth() {
  const [auth, setAuth] = useState({ user: null, token: null, ready: false });

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored && stored.token) {
      setAuth({ ...stored, ready: true });
    } else {
      setAuth({ user: null, token: null, ready: true });
    }
  }, []);

  const login = (user, token) => {
    const newAuth = { user, token, ready: true };
    saveAuth(newAuth);
    setAuth(newAuth);
  };

  const logout = () => {
    clearAuth();
    setAuth({ user: null, token: null, ready: true });
  };

  return { auth, login, logout };
}
