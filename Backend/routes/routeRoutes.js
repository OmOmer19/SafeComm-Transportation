// Route routes - fetch routes and similar route safety consultation

const express = require("express")
const { getAllRoutes, getRouteById, getSimilarRoutes } = require("../controllers/routeController")
const { verifyToken} = require("../middleware/authMiddleware")

const router = express.Router()

// GET /api/routes - get all routes
router.get("/", verifyToken, getAllRoutes)

// GET /api/routes/:id - get a single route by ID
router.get("/:id", verifyToken, getRouteById)

// GET /api/routes/:id/similar - get similar routes (unique feature)
router.get("/:id/similar", verifyToken, getSimilarRoutes)

module.exports = router