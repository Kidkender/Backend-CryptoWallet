const zmq = require("zeromq");
const Client = require("bitcoin-core");
const { Buffer } = require("buffer");

const client = new Client({
  network: "mainnet",
  username: "athena",
  password: "supersecretpasswordgoeshere",
  host: "0.tcp.ap.ngrok.io",
  // host: '127.0.0.1',
  port: 11039,
});

const sock = zmq.socket("sub");

sock.connect("tcp://127.0.0.1:29000");

sock.subscribe("rawtx");

console.log("Listening for new transactions...");

sock.on("message", async (topic, message) => {
  console.log("New transaction detected:");
  const txHex = message.toString("hex");
  console.log(txHex);

  try {
    const decodedTransaction = await client.decodeRawTransaction(txHex);
    console.log("Decoded transaction:", decodedTransaction);
  } catch (err) {
    console.error("Error decoding transaction:", err);
  }
});
