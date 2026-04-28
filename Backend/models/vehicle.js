const mongoose = require("mongoose")

// transit vehicle schema

// Defining the structure of a Vehicle document in MongoDB
const vehicleSchema = new mongoose.Schema(
    {
        // Unique identifier for the vehicle (e.g. BUS-101)
        vehicleId: {
            type: String,
            required: true,
            unique: true,
        },

        // Type of public transit vehicle
        type: {
            type: String,
            enum: ["bus", "auto", "metro"], // only these types allowed
            required: true,
        },

        // Which route this vehicle is currently operating on
        routeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route", // reference to Route model
        },

        // Current live location of the vehicle
        currentLocation: {
            lat: { type: Number }, // latitude
            lng: { type: Number }, // longitude
        },

        // Whether the vehicle is active or inactive
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true } // adds createdAt and updatedAt
)

const VehicleModel = mongoose.model("Vehicle", vehicleSchema)
module.exports = VehicleModel