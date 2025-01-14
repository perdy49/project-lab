const express = require("express");
const { getWorldTime } = require("../controllers/publicApiController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// Endpoint untuk mendapatkan waktu dunia berdasarkan timezone
router.get("/world-time/:timezone", authenticateToken, getWorldTime);

module.exports = router;
