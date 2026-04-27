// safety rating routes - 

const express = require("express")
const {submitRating, getRouteRatings} = require("../controllers/safetyRatingController")
const {verifyToken} = require("../middleware/authMiddleware")

const router = express.Router()

// POST /api/ratings - submit a rating (logged in users only)
router.post("/", verifyToken, submitRating)

// GET /api/ratings/:routeId - get all ratings for a route
router.get("/:routeId", verifyToken, getRouteRatings)

module.exports = router