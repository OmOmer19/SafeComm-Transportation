// Handles authentication logic: user/vendor/admin registration and login, and JWT token generation

const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//controller functions

//to register a user
const registerUser = async (req, res) => {
  try {
    // 1. Extracting data from request body
    const { name, email, password, role } = req.body;

    // 2. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // 3. Checking if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 4. Hashing password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Creating user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // default role = user
    });

    // JWT TOKEN GENERATION
    const token = jwt.sign(
        { id: user._id, role:user.role },//added id and role 
       process.env.JWT_SECRET,
       { expiresIn: "7d" }
        )        

    // 6. Sending response with token
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

//to login user
const loginUser = async (req, res) => {
  try {
    // Extracting email & password from request body
    const { email, password } = req.body;

    //  Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // 3. Checking if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4 Comparing password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // JWT TOKEN GENERATION
    const token = jwt.sign(
      { id: user._id, role: user.role }, //added id and user role
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // Sending success response with token
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
}

module.exports = { registerUser, loginUser}