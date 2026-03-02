import mongoose from "mongoose";

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_CONN);

    console.log("MongoDB Connected");

  } catch (error) {

    console.log("DB Error:", error.message);

  }
};

export default connectDB;