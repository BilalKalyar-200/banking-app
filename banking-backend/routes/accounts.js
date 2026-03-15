const router = require("express").Router();
const pool = require("../db");
const protect = require("../middleware/auth");

// Get my account info
router.get("/me", protect, async (req, res) => {
  const acc = await pool.query(
    `SELECT a.*, u.full_name, u.email FROM accounts a
     JOIN users u ON u.id = a.user_id
     WHERE a.user_id = $1`,
    [req.user.id],
  );
  res.json(acc.rows[0]);
});

module.exports = router;
