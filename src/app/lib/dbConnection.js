import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(
      "mongodb://localhost:27017/next-ecommerce"
    );

    if (!conn) {
      throw new Error("Failed to connect to MongoDB");
    }
  } catch (error) {
    throw error;
  }
};

export default connectDb;
