const db = require("../config/db");

const getLabs = (req, res) => {
  db.query("SELECT * FROM Labs", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

const getLabById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM Labs WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Lab not found!" });
    res.status(200).json(results[0]);
  });
};

const createLab = (req, res) => {
  const { name, capacity, facilities, status } = req.body;

  db.query(
    "INSERT INTO Labs (name, capacity, facilities, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [name, capacity, facilities, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Lab created successfully!" });
    }
  );
};

const updateLab = (req, res) => {
  const { id } = req.params;
  const { name, capacity, facilities, status } = req.body;

  db.query(
    "UPDATE Labs SET name = ?, capacity = ?, facilities = ?, status = ?, updated_at = NOW() WHERE id = ?",
    [name, capacity, facilities, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Lab not found!" });
      res.status(200).json({ message: "Lab updated successfully!" });
    }
  );
};

const deleteLab = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Labs WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Lab not found!" });
    res.status(200).json({ message: "Lab deleted successfully!" });
  });
};

module.exports = { getLabs, getLabById, createLab, updateLab, deleteLab };
