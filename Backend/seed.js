// seed script to populate DB with dummy routes and vehicles for testing

const mongoose = require("mongoose")
const connectToDB = require("./config/mongodb.config")
const Route = require("./models/route.model")
const Vehicle = require("./models/vehicle")
require("dotenv").config()

const routes = [
    {
        routeId: "ROUTE-101",
        name: "Kanpur Central to IIT Kanpur",
        startPoint: { name: "Kanpur Central", lat: 26.4499, lng: 80.3319 },
        endPoint: { name: "IIT Kanpur", lat: 26.5123, lng: 80.2329 },
        waypoints: [
            { name: "Naveen Market", lat: 26.4640, lng: 80.3496 },
            { name: "Kalyanpur", lat: 26.4953, lng: 80.2716 }
        ],
        distance: 16.2,
        avgSafetyScore: 0
    },
    {
        routeId: "ROUTE-102",
        name: "Kanpur Central to Kidwai Nagar",
        startPoint: { name: "Kanpur Central", lat: 26.4499, lng: 80.3319 },
        endPoint: { name: "Kidwai Nagar", lat: 26.4731, lng: 80.3654 },
        waypoints: [
            { name: "Phoolbagh", lat: 26.4607, lng: 80.3423 },
            { name: "Govind Nagar", lat: 26.4682, lng: 80.3541 }
        ],
        distance: 8.5,
        avgSafetyScore: 0
    },
    {
        routeId: "ROUTE-103",
        name: "Chunniganj to Kakadeo",
        startPoint: { name: "Chunniganj", lat: 26.4564, lng: 80.3423 },
        endPoint: { name: "Kakadeo", lat: 26.4812, lng: 80.3102 },
        waypoints: [
            { name: "Civil Lines", lat: 26.4693, lng: 80.3319 },
            { name: "Tilak Nagar", lat: 26.4753, lng: 80.3201 }
        ],
        distance: 10.3,
        avgSafetyScore: 0
    },
    {
        routeId: "ROUTE-104",
        name: "Rawatpur to Kidwai Nagar",
        startPoint: { name: "Rawatpur", lat: 26.5012, lng: 80.3201 },
        endPoint: { name: "Kidwai Nagar", lat: 26.4731, lng: 80.3654 },
        waypoints: [
            { name: "Kalyanpur", lat: 26.4953, lng: 80.2716 },
            { name: "Govind Nagar", lat: 26.4682, lng: 80.3541 }
        ],
        distance: 11.7,
        avgSafetyScore: 0
    },
    {
        routeId: "ROUTE-105",
        name: "Barra to Naveen Market",
        startPoint: { name: "Barra", lat: 26.4101, lng: 80.3456 },
        endPoint: { name: "Naveen Market", lat: 26.4640, lng: 80.3496 },
        waypoints: [
            { name: "Kidwai Nagar", lat: 26.4731, lng: 80.3654 },
            { name: "Phoolbagh", lat: 26.4607, lng: 80.3423 }
        ],
        distance: 9.8,
        avgSafetyScore: 0
    },
    {
        routeId: "ROUTE-106",
        name: "Armapur to Civil Lines",
        startPoint: { name: "Armapur", lat: 26.4823, lng: 80.2987 },
        endPoint: { name: "Civil Lines", lat: 26.4693, lng: 80.3319 },
        waypoints: [
            { name: "Kakadeo", lat: 26.4812, lng: 80.3102 },
            { name: "Tilak Nagar", lat: 26.4753, lng: 80.3201 }
        ],
        distance: 7.4,
        avgSafetyScore: 0
    }
]

const vehicles = [
    {
        vehicleId: "BUS-101",
        type: "bus",
        currentLocation: { lat: 26.4499, lng: 80.3319 },
        status: "active"
    },
    {
        vehicleId: "BUS-102",
        type: "bus",
        currentLocation: { lat: 26.4564, lng: 80.3423 },
        status: "active"
    },
    {
        vehicleId: "BUS-103",
        type: "bus",
        currentLocation: { lat: 26.4640, lng: 80.3496 },
        status: "active"
    },
    {
        vehicleId: "BUS-104",
        type: "bus",
        currentLocation: { lat: 26.4812, lng: 80.3102 },
        status: "active"
    },
    {
        vehicleId: "METRO-101",
        type: "metro",
        currentLocation: { lat: 26.4731, lng: 80.3654 },
        status: "active"
    },
    {
        vehicleId: "METRO-102",
        type: "metro",
        currentLocation: { lat: 26.4953, lng: 80.2716 },
        status: "active"
    },
    {
        vehicleId: "METRO-103",
        type: "metro",
        currentLocation: { lat: 26.5012, lng: 80.3201 },
        status: "active"
    },
    {
        vehicleId: "AUTO-101",
        type: "auto",
        currentLocation: { lat: 26.4823, lng: 80.2987 },
        status: "active"
    },
    {
        vehicleId: "AUTO-102",
        type: "auto",
        currentLocation: { lat: 26.4101, lng: 80.3456 },
        status: "active"
    }
]

// seed db function
const seedDB = async () => {
    try {
        // connecting to DB
        await connectToDB()

        // clearing existing data
        await Route.deleteMany()
        await Vehicle.deleteMany()
        console.log("🗑️ Cleared existing data")

        // inserting routes
        const insertedRoutes = await Route.insertMany(routes)
        console.log("✅ Routes seeded successfully")

        // assigning routeId to vehicles and inserting
        vehicles.forEach((vehicle,index) =>{
            vehicle.routeId = insertedRoutes[index % insertedRoutes.length]._id
        })
        await Vehicle.insertMany(vehicles)
        console.log("✅ Vehicles seeded successfully")

        console.log("🎉 Database seeded successfully!")
        process.exit(0)
    } catch (error) {
        console.log("❌ Seeding failed", error.message)
        process.exit(1)
    }
}

seedDB()