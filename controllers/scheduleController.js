const db = require("../config/db");

const getSchedules = (req, res) => {
  db.query("SELECT * FROM Schedules", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

const getScheduleById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM Schedules WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Schedule not found!" });
    res.status(200).json(results[0]);
  });
};

const createSchedule = (req, res) => {
  const { lab_id, start_time, end_time, is_reserved } = req.body;

  // Validate that start_time is before end_time
  if (new Date(start_time) >= new Date(end_time)) {
    return res
      .status(400)
      .json({ message: "Start time must be before end time" });
  }

  db.query(
    "INSERT INTO Schedules (lab_id, start_time, end_time, is_reserved, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [lab_id, start_time, end_time, is_reserved || false],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Schedule created successfully!" });
    }
  );
};

const updateSchedule = (req, res) => {
  const { id } = req.params;
  const { lab_id, start_time, end_time, is_reserved } = req.body;

  // Validate that start_time is before end_time
  if (new Date(start_time) >= new Date(end_time)) {
    return res
      .status(400)
      .json({ message: "Start time must be before end time" });
  }

  db.query(
    "UPDATE Schedules SET lab_id = ?, start_time = ?, end_time = ?, is_reserved = ?, updated_at = NOW() WHERE id = ?",
    [lab_id, start_time, end_time, is_reserved, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Schedule not found!" });
      res.status(200).json({ message: "Schedule updated successfully!" });
    }
  );
};

const deleteSchedule = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Schedules WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Schedule not found!" });
    res.status(200).json({ message: "Schedule deleted successfully!" });
  });
};

module.exports = {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule
};
