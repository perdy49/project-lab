const express = require("express");
const {
  getBorrowings,
  getBorrowingById,
  createBorrowing,
  updateBorrowing,
  deleteBorrowing
} = require("../controllers/borrowingController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// CRUD routes for Borrowings
router.get("/", authenticateToken, getBorrowings); // GET all borrowings
router.get("/:id", authenticateToken, getBorrowingById); // GET a single borrowing
router.post("/", authenticateToken, createBorrowing); // CREATE a borrowing
router.put("/:id", authenticateToken, updateBorrowing); // UPDATE a borrowing
router.delete("/:id", authenticateToken, deleteBorrowing); // DELETE a borrowing

module.exports = router;
