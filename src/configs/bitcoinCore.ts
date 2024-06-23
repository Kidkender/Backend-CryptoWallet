const Client = require("bitcoin-core");

const config = {
  network: "mainnet",
  username: "athena",
  password: "supersecretpasswordgoeshere",
  host: "0.tcp.ap.ngrok.io",
  port: 11039,
};

export const client = new Client(config);
