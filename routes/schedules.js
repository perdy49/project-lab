const express = require("express");
const {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require("../controllers/scheduleController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// CRUD routes for Schedules
router.get("/", authenticateToken, getSchedules); // GET all schedules
router.get("/:id", authenticateToken, getScheduleById); // GET a single schedule
router.post("/", authenticateToken, createSchedule); // CREATE a schedule
router.put("/:id", authenticateToken, updateSchedule); // UPDATE a schedule
router.delete("/:id", authenticateToken, deleteSchedule); // DELETE a schedule

module.exports = router;
