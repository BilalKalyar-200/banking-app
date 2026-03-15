import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Transfer() {
  const [form, setForm] = useState({
    to_account: "",
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await API.post("/transactions/transfer", form);
      setSuccess("Transfer successful! 🎉");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navBrand}>🏦 NexaBank</span>
        <Link to="/dashboard" style={styles.back}>
          ← Back to Dashboard
        </Link>
      </nav>
      <div style={styles.content}>
        <h2 style={styles.title}>Send Money</h2>
        <div style={styles.card}>
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Recipient Account Number</label>
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. ACC1234567890"
              value={form.to_account}
              onChange={(e) => setForm({ ...form, to_account: e.target.value })}
              required
            />
            <label style={styles.label}>Amount (USD)</label>
            <input
              style={styles.input}
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
            <label style={styles.label}>Description (optional)</label>
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. Rent payment"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? "Processing..." : "Send Money"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0a0f1e", color: "#f9fafb" },
  nav: {
    background: "#111827",
    borderBottom: "1px solid #1f2937",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBrand: { fontSize: 20, fontWeight: 700, color: "#f9fafb" },
  back: { color: "#3b82f6", textDecoration: "none", fontSize: 15 },
  content: { maxWidth: 500, margin: "0 auto", padding: "2rem 1rem" },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: "1.5rem",
    color: "#f9fafb",
  },
  card: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: 16,
    padding: "2rem",
  },
  label: {
    display: "block",
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 6,
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: 20,
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
};
