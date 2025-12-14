import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#12492f", // ✅ UPDATED BACKGROUND
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "24px",
            color: "#1f2933",
          }}
        >
          Welcome back
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              height: "48px",
              borderRadius: "999px",
              marginBottom: "14px",
            }}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              height: "48px",
              borderRadius: "999px",
              marginBottom: "10px",
            }}
          />

          <div style={{ textAlign: "right", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", color: "#6b7280" }}>
              Forgot Password?
            </span>
          </div>

          <Button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "999px",
              backgroundColor: "#12492f",
              color: "#ffffff",
              fontSize: "16px",
              marginBottom: "18px",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {/* Signup */}
        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            marginBottom: "16px",
            color: "#1f2933",
          }}
        >
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#12492f", fontWeight: 500 }}>
            Sign up
          </Link>
        </p>

        {/* Social */}
        <Button
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "999px",
            backgroundColor: "#000",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          🍎 Log in with Apple
        </Button>

        <Button
          variant="outline"
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "999px",
          }}
        >
          🔍 Log in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
