const mongoose = require("mongoose")

// Defining the structure of an IncidentReport document in MongoDB
const incidentReportSchema = new mongoose.Schema(
    {
        // Reference to the user who reported the incident
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // reference to User model
            required: true,
        },

        // Reference to the route where incident occurred
        routeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route", // reference to Route model
        },

        // Reference to the vehicle where incident occurred (optional)
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle", // reference to Vehicle model
        },

        // Type of incident reported
        type: {
            type: String,
            enum: ["harassment", "accident", "breakdown", "unsafe_stop", "other"],
            required: true,
        },

        // Detailed description of the incident
        description: {
            type: String,
            required: true,
            trim: true,
        },

        // Location where the incident occurred
        location: {
            lat: { type: Number },
            lng: { type: Number },
        },

        // Current status of the incident report
        status: {
            type: String,
            enum: ["open", "reviewed", "resolved"],
            default: "open", // all new reports start as open
        },
    },
    { timestamps: true } // adds createdAt and updatedAt
)

const IncidentReportModel = mongoose.model("IncidentReport", incidentReportSchema)
module.exports = IncidentReportModel