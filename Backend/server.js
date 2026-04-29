const express = require("express")
const cors = require("cors"); // allows requests from frontend
require('dotenv').config(); //to load .env variables
const http = require("http") //i tis needed to create server for socket.io
const { Server } = require("socket.io") //importing socket.io

//creating express app
const app = express();

// creating http server from express app
const server = http.createServer(app)

//initializing socket.io on our http server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://safecomm-transportation.vercel.app"],//allowing frontend to connect
    methods: ["GET","POST"]
  }
})

app.use(cors()) //enabling cors

app.use(express.json()) //enabling json parsing for request bodies

//importing db connection fun
const connectToDB = require('./config/mongodb.config')
// connecting to mongodb atlas
connectToDB()

//importing routes
const authRoutes = require('./routes/authRoutes')
const transitRoutes = require("./routes/transitRoutes")
const safetyRatingRoutes = require("./routes/safetyRatingRoutes")
const incidentRoutes = require("./routes/incidentRoutes")
const routeRoutes = require("./routes/routeRoutes")
const adminRoutes = require("./routes/adminRoutes")

//using routes
app.use("/api/auth", authRoutes)
app.use("/api/transit", transitRoutes)
app.use("/api/ratings", safetyRatingRoutes)
app.use("/api/incidents", incidentRoutes)
app.use("/api/routes", routeRoutes)
app.use("/api/admin", adminRoutes)

app.get("/", (req, res) => {
  res.send(" SafeComm Transportation API is working fine!");
})

//socket.io connection handler
io.on("connection", (socket) =>{
  console.log(`User connected: ${socket.id}`)

  //when user disconnects
  socket.on("disconnect", () =>{
    console.log(`User disconnected: ${socket.id}`)
  })
})

// exporting io to use it in other files too
module.exports = {io}

// importing vehicle socket handler
const { startVehicleTracking } = require("./sockets/vehicleSocket")

//starting real time vehicle tracking
startVehicleTracking(io)

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})