// Authentication routes for register and login

const express = require("express")
const {registerUser, loginUser} = require("../controllers/authController")

const router = express.Router()

// to register user ---POST /api/auth/register
router.post("/register", registerUser);

// to register user ---POST /api/auth/login
router.post("/login", loginUser)

module.exports = router