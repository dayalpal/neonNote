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

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ message: "Database unavailable" });
  }
});

app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on PORT: ${process.env.PORT || 5000}`);
    });
  });
}

export default app;
