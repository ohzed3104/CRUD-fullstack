import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, token: null, loading: true });

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (token) {
      setAuth({ user: user ? JSON.parse(user) : null, token, loading: false });
    } else {
      setAuth({ user: null, token: null, loading: false });
    }
  }, []);

  const login = ({ user, token }) => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("access_token", token);
    }
    if (user) localStorage.setItem("user", JSON.stringify(user));
    setAuth({ user: user ?? null, token: token ?? null, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAuth({ user: null, token: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

