const mongoose = require("mongoose");
require("dotenv").config();

const conn = async () => {
    try {
       
        const uri = process.env.MONGO_URL;
        if (!uri) {
            throw new Error("MONGO_URL is not defined in .env file");
        }

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
    }
};

conn();
