const IncidentReport = require("../models/incidentReport")

// function to submit an incident report
const submitIncident = async (req, res) => {
    try {
        const { routeId, vehicleId, type, description, location } = req.body

        // Creating the incident report
        const incident = await IncidentReport.create({
            userId: req.user.id,
            routeId,
            vehicleId,
            type,
            description,
            location
        })

        res.status(201).json({
            success: true,
            message: "Incident reported successfully",
            data: incident
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to report incident",
            error: error.message
        })
    }
}

// function to Get all incidents for a specific route
const getRouteIncidents = async (req, res) => {
    try {
        const incidents = await IncidentReport.find({ routeId: req.params.routeId })
            .populate("userId", "name") // only show user's name
        res.status(200).json({
            success: true,
            data: incidents
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch incidents",
            error: error.message
        })
    }
}

// function to get all incidents (admin only)
const getAllIncidents = async (req, res) => {
    try {
        const incidents = await IncidentReport.find()
            .populate("userId", "name")
            .populate("routeId", "name")
        res.status(200).json({
            success: true,
            data: incidents
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch incidents",
            error: error.message
        })
    }
}

// function to update incident status(admin only)
// Update incident status (admin only)
const updateIncidentStatus = async (req, res) => {
    try {
        const { status } = req.body
        const incident = await IncidentReport.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Incident status updated",
            data: incident
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update incident status",
            error: error.message
        })
    }
}

module.exports = { submitIncident, getRouteIncidents, getAllIncidents, updateIncidentStatus }