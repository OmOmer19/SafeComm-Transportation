// transit routes // vehicle routes

const express = require("express")
const { getAllVehicles, getVehicleById } = require("../controllers/transitController")
const {verifyToken} = require("../middleware/authMiddleware")

const router = express.Router()

// GET /api/transit/vehicles - get all active vehicles (logged in users only)
router.get("/vehicles", verifyToken, getAllVehicles)

// GET /api/transit/vehicles/:id - get a single vehicle by ID
router.get("/vehicles/:id", verifyToken, getVehicleById)

module.exports = router