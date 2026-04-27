// to handle admin dashboard data - safety stats and visualizations

const IncidentReport = require("../models/incidentReport")
const SafetyRating = require("../models/safetyRating")
const Route = require('../models/route.model')

// to get overall stats for admin dashboard
const getDashboardStats = async (req, res) => {
    try {
        // Total number of incidents
        const totalIncidents = await IncidentReport.countDocuments()

        // Total number of ratings
        const totalRatings = await SafetyRating.countDocuments()

        // Total number of routes
        const totalRoutes = await Route.countDocuments()

        // Incidents grouped by type
        const incidentsByType = await IncidentReport.aggregate([
            { $group: 
                { _id: "$type",
                  count: { $sum: 1 } } }
        ])

        // Average safety score across all routes
        const avgSafetyScore = await SafetyRating.aggregate([
            { $group: 
                { _id: null, 
                  avg: { $avg: "$score" } } }
        ])

        res.status(200).json({
            success: true,
            data: {
                totalIncidents,
                totalRatings,
                totalRoutes,
                incidentsByType,
                avgSafetyScore: avgSafetyScore[0]?.avg.toFixed(1) || 0
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats",
            error: error.message
        })
    }
}

//  to Get safety ratings per route for chart visualization
const getRatingsPerRoute = async (req, res) => {
    try {
        // Grouping ratings by route and calculating avg score
        const ratingsPerRoute = await SafetyRating.aggregate([
            { $group: { _id: "$routeId", avgScore: { $avg: "$score" }, totalRatings: { $sum: 1 } } },
            { $lookup: { from: "routes", localField: "_id", foreignField: "_id", as: "route" } },
            { $unwind: "$route" },
            { $project: { routeName: "$route.name", avgScore: 1, totalRatings: 1 } }
        ])

        res.status(200).json({
            success: true,
            data: ratingsPerRoute
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch ratings per route",
            error: error.message
        })
    }
}

module.exports = { getDashboardStats, getRatingsPerRoute }