import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", form);
      setSuccess("Account created! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>🏦</div>
        <h1 style={styles.title}>NexaBank</h1>
        <p style={styles.subtitle}>Create your free account</p>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            minLength={6}
            required
          />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p style={styles.link}>
          Already have an account?{" "}
          <Link to="/login" style={styles.a}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0f1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: 16,
    padding: "2.5rem",
    width: "100%",
    maxWidth: 400,
  },
  logo: { fontSize: 40, textAlign: "center", marginBottom: 8 },
  title: {
    color: "#f9fafb",
    textAlign: "center",
    fontSize: 28,
    fontWeight: 700,
    margin: "0 0 4px",
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
    fontSize: 14,
    margin: "0 0 2rem",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: 12,
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: 8,
    color: "#f9fafb",
    fontSize: 15,
    boxSizing: "border-box",
    outline: "none",
  },
  btn: {
    width: "100%",
    padding: "13px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 4,
  },
  error: {
    background: "#450a0a",
    border: "1px solid #991b1b",
    color: "#fca5a5",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  success: {
    background: "#052e16",
    border: "1px solid #166534",
    color: "#86efac",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  link: { color: "#6b7280", textAlign: "center", fontSize: 14, marginTop: 20 },
  a: { color: "#3b82f6", textDecoration: "none", fontWeight: 500 },
};
