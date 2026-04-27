const express = require("express")
const { submitIncident, getRouteIncidents, getAllIncidents, updateIncidentStatus } = require("../controllers/incidentController")
const { verifyToken, checkRole } = require("../middleware/authMiddleware")

const router = express.Router()

// POST /api/incidents - to submit an incident report (logged in users only)
router.post("/", verifyToken, submitIncident)

// GET /api/incidents/route/:routeId -to get all incidents for a specific route
router.get("/route/:routeId", verifyToken, getRouteIncidents)

// GET /api/incidents - to get all incidents (admin only)
router.get("/", verifyToken, checkRole("admin"), getAllIncidents)

// PATCH /api/incidents/:id/status - to update incident status (admin only)
router.patch("/:id/status", verifyToken, checkRole("admin"), updateIncidentStatus)

module.exports = router