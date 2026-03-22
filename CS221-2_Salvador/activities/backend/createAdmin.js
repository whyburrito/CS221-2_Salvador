import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: "admin@store.com" });

    if (adminExists) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Note: Your User schema uses a pre-save hook to hash the password automatically using bcrypt.
    // Also, your schema uses `role: "Admin"` instead of an `isAdmin` boolean, so we set that here.
    const adminUser = new User({
      username: "Admin",
      email: "admin@store.com",
      password: "password123",
      role: "Admin", 
    });

    await adminUser.save();
    
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
