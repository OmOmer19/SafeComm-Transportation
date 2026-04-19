const jwt = require("jsonwebtoken")

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    try {
        // Getting token from request headers
        const token = req.headers.authorization?.split(" ")[1] // Bearer <token>

        // If no token found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied, no token provided"
            })
        }

        // Verifying token using our JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Attaching decoded user data to request object
        req.user = decoded

        // Moving to next middleware or route handler
        next()

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

// Middleware to check user role (RBAC)
const checkRole = (...roles) => {
    return (req, res, next) => {
        // Checking if logged in user's role is allowed
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied, you don't have permission"
            })
        }
        // Role is allowed, move forward
        next()
    }
}

module.exports = { verifyToken, checkRole }