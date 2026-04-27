// admin routes  - for dashboard stats
 
const express = require("express")
const { getDashboardStats, getRatingsPerRoute } = require("../controllers/adminController")
const { verifyToken, checkRole } = require("../middleware/authMiddleware")

const router = express.Router()

// GET /api/admin/stats - get dashboard stats (admin only)
router.get("/stats", verifyToken, checkRole("admin"), getDashboardStats)

// GET /api/admin/ratings-per-route - get ratings per route for charts (admin only)
router.get("/ratings-per-route", verifyToken, checkRole("admin"), getRatingsPerRoute)

module.exports = router