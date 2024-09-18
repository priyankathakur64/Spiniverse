import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB connected: ${conn.connection.host}`.underline.bold.cyan
    );
  } catch (err) {
    console.error(`Error: ${err.message}`.bold.red);
    process.exit(1);
  }
};

export default connectDB;
