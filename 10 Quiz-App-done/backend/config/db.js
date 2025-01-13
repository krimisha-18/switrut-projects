const mongoose = require('mongoose');
const seedDatabase = require('../sampleData');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Force reseed the database
    await seedDatabase();
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 