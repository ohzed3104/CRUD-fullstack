import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import AuthProvider from "./context/AuthProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
