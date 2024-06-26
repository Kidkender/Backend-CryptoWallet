import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import btcRoutes from "./src/routes/btcRoutes";
import { createWebSocketConnection } from "./src/services/socketService";

dotenv.config();

const app: Application = express();

// rest package
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString || "");
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// Socket service
createWebSocketConnection();

// route

app.use("/api/btc", btcRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
