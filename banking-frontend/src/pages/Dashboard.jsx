import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Dashboard() {
  const { userName, logout } = useAuth();
  const [account, setAccount] = useState(null);
  const [txns, setTxns] = useState([]);
  const [myAcc, setMyAcc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/accounts/me").then((r) => setAccount(r.data));
    API.get("/transactions/history").then((r) => {
      setTxns(r.data.transactions);
      setMyAcc(r.data.myAccount);
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navBrand}>🏦 NexaBank</span>
        <div style={styles.navRight}>
          <Link to="/transfer" style={styles.navBtn}>
            Transfer
          </Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.content}>
        <h2 style={styles.welcome}>Welcome back, {userName} 👋</h2>

        {account && (
          <div style={styles.balanceCard}>
            <p style={styles.balLabel}>Total Balance</p>
            <h1 style={styles.balAmount}>
              $
              {parseFloat(account.balance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </h1>
            <p style={styles.accNum}>Account: {account.account_number}</p>
            <Link to="/transfer" style={styles.transferBtn}>
              Send Money →
            </Link>
          </div>
        )}

        <h3 style={styles.sectionTitle}>Recent Transactions</h3>
        <div style={styles.txnList}>
          {txns.length === 0 && (
            <p style={styles.empty}>No transactions yet.</p>
          )}
          {txns.map((t) => {
            const isSent = t.sender_account === myAcc;
            return (
              <div key={t.id} style={styles.txnRow}>
                <div style={styles.txnIcon(isSent)}>{isSent ? "↑" : "↓"}</div>
                <div style={styles.txnInfo}>
                  <p style={styles.txnTitle}>
                    {isSent
                      ? `To: ${t.receiver_account}`
                      : `From: ${t.sender_account}`}
                  </p>
                  <p style={styles.txnDesc}>{t.description || "Transfer"}</p>
                </div>
                <div style={styles.txnAmount(isSent)}>
                  {isSent ? "-" : "+"}${parseFloat(t.amount).toFixed(2)}
                </div>
              </div>
            );
          })}
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
  navRight: { display: "flex", gap: 12, alignItems: "center" },
  navBtn: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 15,
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #374151",
    color: "#9ca3af",
    padding: "6px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },
  content: { maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" },
  welcome: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: "1.5rem",
    color: "#f9fafb",
  },
  balanceCard: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
    borderRadius: 16,
    padding: "2rem",
    marginBottom: "2rem",
  },
  balLabel: { color: "#bfdbfe", fontSize: 14, margin: "0 0 8px" },
  balAmount: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 700,
    margin: "0 0 8px",
  },
  accNum: {
    color: "#93c5fd",
    fontSize: 13,
    margin: "0 0 1.5rem",
    fontFamily: "monospace",
  },
  transferBtn: {
    display: "inline-block",
    background: "#fff",
    color: "#1d4ed8",
    padding: "10px 20px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#e5e7eb",
  },
  txnList: {
    background: "#111827",
    border: "1px solid #1f2937",
    borderRadius: 12,
    overflow: "hidden",
  },
  txnRow: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #1f2937",
  },
  txnIcon: (isSent) => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isSent ? "#450a0a" : "#052e16",
    color: isSent ? "#f87171" : "#4ade80",
    fontWeight: 700,
    fontSize: 18,
    marginRight: 14,
    flexShrink: 0,
  }),
  txnInfo: { flex: 1 },
  txnTitle: {
    margin: "0 0 2px",
    fontSize: 15,
    color: "#f9fafb",
    fontWeight: 500,
  },
  txnDesc: { margin: 0, fontSize: 13, color: "#6b7280" },
  txnAmount: (isSent) => ({
    fontWeight: 600,
    fontSize: 16,
    color: isSent ? "#f87171" : "#4ade80",
  }),
  empty: { color: "#6b7280", textAlign: "center", padding: "2rem", margin: 0 },
};
