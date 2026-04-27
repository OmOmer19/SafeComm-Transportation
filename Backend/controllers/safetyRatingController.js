// here we will handle rating  operations like-
// submit and view ratings for routes

const SafetyRating = require("../models/safetyRating")
const Route = require("../models/route.model")

// to submit rating for a route
const submitRating = async(req,res)=>{
    try{
        const{ routeId, score, comment} = req.body

        // if route exists
        const route = await Route.findById(routeId)
        if(!route){
            return res.status(404).json({
                success: false,
                message: "Route not found"
            })
        }
        // checking if user has allready rated this route
        const existingRating = await SafetyRating.findOne({
            userId: req.user.id,
            routeId
        })
        if(existingRating){
            return res.status(400).json({
                success:false,
                message: "You have already rated this route"
            })
        }
        //creating the rating
        const rating = await SafetyRating.create({
            userId: req.user.id,
            routeId,
            score,
            comment
        })
        //updating the average safety score of the route
        const allRatings = await SafetyRating.find({routeId})
        const avgScore = allRatings.reduce((sum,r) => sum + r.score,0)/ allRatings.length

        await Route.findByIdAndUpdate(routeId, {avgSafetyScore: avgScore})

        res.status(201).json({
            success: true,
            message: "Rating submitted successfully",
            data: rating
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"failed to submit rating",
            error: err.message
        })
    }
}

// get all ratings for a specific route
const getRouteRatings = async(req, res) =>{
    try{
        const ratings = await SafetyRating.find({routeId: req.params.routeId}).populate("userId","name") //only showing username 
        res.status(200).json({
            success:true,
            data: ratings
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Failed to fetch ratings",
            error: err.message
        })
    }
}

module.exports = {submitRating, getRouteRatings}