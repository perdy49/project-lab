const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO Users (name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0)
        return res.status(404).json({ message: "User not found!" });

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials!" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      res.status(200).json({ token, message: "Login successful!" });
    }
  );
};

module.exports = { registerUser, loginUser };
