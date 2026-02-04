import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3000;
dotenv.config();

//get -> display name, var name = "sean",
//post -> logic, if usename="sean" password="Pass123" success else fail
//http://localhost:3000/api/auth/login
//http://localhost:3000/api/auth/register
//http://localhost:3000/api/auth/logout

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT: ${PORT}`);
});
