const express = require("express");
const { getUsers, getUserById } = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUserById);

module.exports = router;
