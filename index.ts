import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import btcRoutes from "./src/routes/btcRoutes";
import bodyParser from "body-parser";
dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/btc", btcRoutes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
