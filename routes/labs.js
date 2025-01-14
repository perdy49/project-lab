const express = require("express");
const {
  getLabs,
  getLabById,
  createLab,
  updateLab,
  deleteLab
} = require("../controllers/labController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// CRUD routes for Labs
router.get("/", authenticateToken, getLabs); // GET all labs
router.get("/:id", authenticateToken, getLabById); // GET a single lab
router.post("/", authenticateToken, createLab); // CREATE a lab
router.put("/:id", authenticateToken, updateLab); // UPDATE a lab
router.delete("/:id", authenticateToken, deleteLab); // DELETE a lab

module.exports = router;
