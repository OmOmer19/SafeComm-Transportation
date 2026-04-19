// Import Mongoose
const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have same email
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Role of the user
      default: "user",
    },
  },
  { timestamps: true } // automatically add createdAt and updatedAt
);

// Export User model
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel