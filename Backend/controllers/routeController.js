// to handle route operations = fetching routes and similar route safety consultation

const Route = require("../models/route.model")

//to get all routes
const getAllRoutes = async (req, res) =>{
    try{
        const routes = await Route.find()
        res.status(200).json({
            success: true,
            data: routes
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch routes",
            error: error.message
        })
    }
}

// to get a single route by ID
const getRouteById = async (req, res) =>{
    try{
        const route = await Route.findById(req.params.id)
        if(!route){
            return res.status(404).json({
                success: false,
                message: "Route not found"
            })
        }
        res.status(200).json({
            success: true,
            data: route
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch route",
            error: error.message
        })
    }
}

// to get similar routes based on safety scores (unique feature)

//“Given one route, find other routes of similar length,
//  rank them by safety, and return the best ones.”

const getSimilarRoutes = async (req, res) => {
    try {
        // Finding the selected route first
        const selectedRoute = await Route.findById(req.params.id)
        if (!selectedRoute) {
            return res.status(404).json({
                success: false,
                message: "Route not found"
            })
        }

        // Finding routes with similar distance (within 20% range)
        const minDistance = selectedRoute.distance * 0.8
        const maxDistance = selectedRoute.distance * 1.2

        // Fetching similar routes sorted by safety score
        const similarRoutes = await Route.find({
            _id: { $ne: selectedRoute._id }, // exclude current route --$ means exclude
            distance: { $gte: minDistance, $lte: maxDistance }, // similar distance
            avgSafetyScore: { $gt: 0 } // only routes that have been rated
        })
        .sort({ avgSafetyScore: -1 }) // sort by highest safety score
        .limit(5) // return top 5 similar routes

        res.status(200).json({
            success: true,
            data: similarRoutes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch similar routes",
            error: error.message
        })
    }
}

module.exports = { getAllRoutes, getRouteById, getSimilarRoutes }