const router = require("express").Router();
const pool = require("../db");
const protect = require("../middleware/auth");

// Transfer money
router.post("/transfer", protect, async (req, res) => {
  const { to_account, amount, description } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const sender = await client.query(
      "SELECT * FROM accounts WHERE user_id=$1",
      [req.user.id],
    );
    if (!sender.rows.length) throw new Error("Sender not found");
    if (parseFloat(sender.rows[0].balance) < parseFloat(amount))
      throw new Error("Insufficient funds");
    const receiver = await client.query(
      "SELECT * FROM accounts WHERE account_number=$1",
      [to_account],
    );
    if (!receiver.rows.length) throw new Error("Receiver not found");
    await client.query(
      "UPDATE accounts SET balance = balance - $1 WHERE user_id=$2",
      [amount, req.user.id],
    );
    await client.query(
      "UPDATE accounts SET balance = balance + $1 WHERE account_number=$2",
      [amount, to_account],
    );
    await client.query(
      "INSERT INTO transactions (sender_account, receiver_account, amount, description) VALUES ($1,$2,$3,$4)",
      [sender.rows[0].account_number, to_account, amount, description],
    );
    await client.query("COMMIT");
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ message: err.message });
  } finally {
    client.release();
  }
});

// Get my transactions
router.get("/history", protect, async (req, res) => {
  const acc = await pool.query(
    "SELECT account_number FROM accounts WHERE user_id=$1",
    [req.user.id],
  );
  const accNum = acc.rows[0]?.account_number;
  const txns = await pool.query(
    `SELECT * FROM transactions 
     WHERE sender_account=$1 OR receiver_account=$1
     ORDER BY created_at DESC LIMIT 20`,
    [accNum],
  );
  res.json({ transactions: txns.rows, myAccount: accNum });
});

module.exports = router;
