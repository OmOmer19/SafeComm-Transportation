// all the vehicle operations - get ,add, update location
// vehicle controller

const Vehicle = require("../models/vehicle")

const getAllVehicles = async(req,res)=>{
    try{
        // fetching all vehicles from db and populating route details
        const vehicle = await Vehicle.find().populate("routeID")
        res.status(200).json({success:true,
            data: vehicles
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"failed to fetch vehicles",
            error: err.message
        })
    }
}

// get a vehicle by its id
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate("routeId")
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        }
        res.status(200).json({
            success: true,
            data: vehicle
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch vehicle",
            error: error.message
        })
    }
}

module.exports = {getAllVehicles, getVehicleById}