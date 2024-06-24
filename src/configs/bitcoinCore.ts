// const Client = require("bitcoin-core");
import Client from "bitcoin-core";
import dotenv from "dotenv";
dotenv.config();

const USERNAME_RPC = process.env.RPC_USER;
const PASSWORD_RPC = process.env.RPC_PASSWORD;
const PORT_RPC = process.env.RPC_PORT;

const config = {
  network: "mainnet",
  username: USERNAME_RPC as string,
  password: PASSWORD_RPC as string,
  host: "0.tcp.ap.ngrok.io",
  port: Number(PORT_RPC),
};

export const client = new Client(config);
