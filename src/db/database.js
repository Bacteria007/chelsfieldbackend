const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Chelsefield", // Specify the database name here
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};
