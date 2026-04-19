const mongoose = require("mongoose")

// Defining the structure of a Route document in MongoDB
const routeSchema = new mongoose.Schema(
    {
        // Unique identifier for the route (e.g. ROUTE-101)
        routeId: {
            type: String,
            required: true,
            unique: true,
        },

        // Name of the route (e.g. "Central Station to Airport")
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Starting point of the route
        startPoint: {
            name: { type: String, required: true }, // name of the location
            lat: { type: Number, required: true },  // latitude
            lng: { type: Number, required: true },  // longitude
        },

        // Ending point of the route
        endPoint: {
            name: { type: String, required: true },
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },

        // Intermediate stops along the route
        waypoints: [
            {
                name: { type: String },
                lat: { type: Number },
                lng: { type: Number },
            }
        ],

        // Total distance of the route in kilometers
        distance: {
            type: Number,
        },

        // Average safety score calculated from user ratings (1-5)
        avgSafetyScore: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true } // adds createdAt and updatedAt
)

const RouteModel = mongoose.model("Route", routeSchema)
module.exports = RouteModel