import express from "express";
import cors from "cors";

import notesRoutes from "./src/routes/notesRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on PORT : 5000");
  });
});
