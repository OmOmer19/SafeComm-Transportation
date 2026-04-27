// handles real time location updates using socket.io

const Vehicle = require("../models/vehicle")

const startVehicleTracking = (io) => {
    // updating vehicle locations every 5 seconds to simulate movement
    setInterval(async () => {
        try {
            // fetching all active vehicles from DB
            const vehicles = await Vehicle.find({ status: "active" })

            // simulating movement by slightly changing lat/lng of each vehicle
            for (const vehicle of vehicles) {
                const updatedLat = vehicle.currentLocation.lat + (Math.random() - 0.5) * 0.001
                const updatedLng = vehicle.currentLocation.lng + (Math.random() - 0.5) * 0.001

                // updating vehicle location in DB
                await Vehicle.findByIdAndUpdate(vehicle._id, {
                    currentLocation: { lat: updatedLat, lng: updatedLng }
                })

                // broadcasting updated location to all connected clients
                io.emit("vehicleLocationUpdate", {
                    vehicleId: vehicle.vehicleId,
                    type: vehicle.type,
                    currentLocation: { lat: updatedLat, lng: updatedLng }
                })
            }
        } catch (error) {
            console.log("Error updating vehicle locations", error.message)
        }
    }, 5000) // runs every 5 seconds
}

module.exports = { startVehicleTracking }