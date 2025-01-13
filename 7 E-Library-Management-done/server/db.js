import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect( process.env.URL);
    console.log("MongoDB connected...!");
  } catch (err) {
    console.log("error" , + err);
    
  }
};

Connection()