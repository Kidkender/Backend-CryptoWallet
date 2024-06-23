import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import btcRoutes from "./src/routes/btcRoutes";
import { createWebSocketConnection } from "./src/services/socketService";
import mongoose from "mongoose";
import Client from "bitcoin-core";

dotenv.config();

const app: Application = express();

// rest package
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoString = process.env.DATABASE_URL;

const client = new Client({
  network: "mainnet",
  username: "athena",
  password: "supersecretpasswordgoeshere",
  host: "0.tcp.ap.ngrok.io",
  port: 11039,
});

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
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/btc", btcRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
