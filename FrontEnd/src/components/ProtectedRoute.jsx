import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const authCtx = useAuth(); // may be null until Provider mounted
  const token = authCtx?.auth?.token ?? authCtx?.token ?? localStorage.getItem("token") ?? localStorage.getItem("access_token");
  const loading = authCtx?.auth?.loading ?? authCtx?.loading ?? false;

  if (loading) return null;
  return token ? children : <Navigate to="/login" replace />;
}