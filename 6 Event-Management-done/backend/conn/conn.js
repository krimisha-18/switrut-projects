const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const conn = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Options to avoid deprecation warnings
        });
        if (response) {
            console.log("Connected mongodb");
        }
    } catch (error) {
        console.log("Error connecting to DB:", error);
    }
};

conn();


