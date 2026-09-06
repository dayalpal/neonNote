import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserLogIn = ({ auth, login }) => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const isLogin = mode === "login";
  const endpoint = isLogin ? "/api/users/login" : "/api/users/create";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    try {
      const body = isLogin ? { email, password } : { name, email, password };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to authenticate");
      }

      login(data.user, data.token);
      toast.success(isLogin ? "Logged in successfully." : "User created and logged in.");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Could not complete authentication.");
    } finally {
      setSaving(false);
    }
  };

  if (auth.user) {
    return (
      <div className="page login-page">
        <h1>Already logged in</h1>
        <p>You are logged in as {auth.user.name}.</p>
      </div>
    );
  }

  return (
    <div className="page login-page">
      <div className="page-header">
        <div>
          <h1>{isLogin ? "User Login" : "Create Account"}</h1>
          <p className="text-muted">
            {isLogin
              ? "Sign in to view and manage your notes."
              : "Create an account to save notes just for you."}
          </p>
        </div>
        <button className="button" type="button" onClick={() => setMode(isLogin ? "register" : "login")}> 
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="note-form">
        {!isLogin && (
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />
          </label>
        )}
        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            type="email"
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
        </label>
        <button type="submit" disabled={saving}>
          {saving ? (isLogin ? "Signing in..." : "Creating account...") : isLogin ? "Log In" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default UserLogIn;
