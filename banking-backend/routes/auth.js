const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [full_name, email, hashed],
    );
    // Auto-create account with random account number
    const accNum = "ACC" + Math.floor(1000000000 + Math.random() * 9000000000);
    await pool.query(
      "INSERT INTO accounts (user_id, account_number) VALUES ($1,$2)",
      [user.rows[0].id, accNum],
    );
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (!user.rows.length)
      return res.status(400).json({ message: "User not found" });
    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, name: user.rows[0].full_name });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
