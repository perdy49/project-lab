const db = require("../config/db");

const getBorrowings = (req, res) => {
  db.query("SELECT * FROM Borrowings", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

const getBorrowingById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM Borrowings WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Borrowing not found!" });
    res.status(200).json(results[0]);
  });
};

const createBorrowing = (req, res) => {
  const { user_id, lab_id, schedule_id, reason, status } = req.body;

  // Check if the schedule is reserved
  db.query(
    "SELECT is_reserved FROM Schedules WHERE id = ?",
    [schedule_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "Schedule not found!" });
      if (results[0].is_reserved) {
        return res
          .status(400)
          .json({ message: "Schedule is already reserved!" });
      }

      // Create borrowing record
      db.query(
        "INSERT INTO Borrowings (user_id, lab_id, schedule_id, reason, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [user_id, lab_id, schedule_id, reason, status || "pending"],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          // Update schedule to reserved
          db.query(
            "UPDATE Schedules SET is_reserved = true WHERE id = ?",
            [schedule_id],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res
                .status(201)
                .json({ message: "Borrowing created successfully!" });
            }
          );
        }
      );
    }
  );
};

const updateBorrowing = (req, res) => {
  const { id } = req.params;
  const { user_id, lab_id, schedule_id, reason, status } = req.body;

  db.query(
    "UPDATE Borrowings SET user_id = ?, lab_id = ?, schedule_id = ?, reason = ?, status = ?, updated_at = NOW() WHERE id = ?",
    [user_id, lab_id, schedule_id, reason, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Borrowing not found!" });
      res.status(200).json({ message: "Borrowing updated successfully!" });
    }
  );
};

const deleteBorrowing = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Borrowings WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Borrowing not found!" });
    res.status(200).json({ message: "Borrowing deleted successfully!" });
  });
};

module.exports = {
  getBorrowings,
  getBorrowingById,
  createBorrowing,
  updateBorrowing,
  deleteBorrowing
};
