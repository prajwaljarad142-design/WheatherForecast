import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDatabase } from "./config/db.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Weather Forecast Prediction API is running.",
  });
});

app.use("/api/weather", weatherRoutes);

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
