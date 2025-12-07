import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function useHookLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authCtx = useAuth(); // guard: nếu Provider chưa mount thì null
  const login = authCtx?.login;

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setLoading(true);

    try {
      const payload = { email, password };
      const res = await axios.post("http://localhost:3000/api/auth/login", payload);
      const data = res.data ?? {};
      const token = data.token ?? data.accessToken ?? data.access_token ?? null;
      const user = data.user ?? data.data ?? null;

      if (!token) {
        setLoading(false);
        throw new Error("No token returned from server");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      localStorage.setItem("access_token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));

      if (typeof login === "function") {
        login({ user, token });
      } else {
        console.warn("AuthProvider not mounted — saved to localStorage only");
      }

      setLoading(false);
      navigate("/");
      return data;
    } catch (error) {
      console.error("login error:", error);
      setLoading(false);
      throw error;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  };
}

export default useHookLogin;
