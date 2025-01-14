const db = require("../config/db");

const getUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM Users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT id, name, email, role FROM Users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0)
        return res.status(404).json({ message: "User not found!" });

      res.status(200).json(results[0]);
    }
  );
};

module.exports = { getUsers, getUserById };
