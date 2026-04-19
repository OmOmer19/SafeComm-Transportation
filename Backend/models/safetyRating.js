const mongoose = require("mongoose")

// Defining the structure of a SafetyRating document in MongoDB
const safetyRatingSchema = new mongoose.Schema(
    {
        // Reference to the user who submitted the rating
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // reference to User model
            required: true,
        },

        // Reference to the route being rated
        routeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route", // reference to Route model
            required: true,
        },

        // Safety score given by the user (1 to 5)
        score: {
            type: Number,
            required: true,
            min: 1, // minimum rating
            max: 5, // maximum rating
        },

        // Optional comment from the user about the route
        comment: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true } //createdAt and updatedAt
)

const SafetyRatingModel = mongoose.model("SafetyRating", safetyRatingSchema)
module.exports = SafetyRatingModel