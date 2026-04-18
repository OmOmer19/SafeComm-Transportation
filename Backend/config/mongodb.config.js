const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

// async function to connect to mongodb
const connectToDB = async() => {
    try {
        // connecting to mongo db at localhost and using our database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully.")
    } catch (error) {
        console.log("Error: Unable to connect DB", error.message);
        process.exit(1); // stop server if DB fails
    }
}
// exporting the function 
module.exports = connectToDB;