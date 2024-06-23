import { handleTx } from "./btcChainService";

import zmq from "zeromq";

enum TypeRequest {
  RAW_BLOCK = "rawblock",
  RAW_TX = "rawtx",
  HASH_BLOCK = "hashblock",
  HASH_TX = "hashtx",
}

export function createWebSocketConnection() {
  const sock = zmq.socket("sub");

  sock.connect("tcp://127.0.0.1:29000");
  sock.subscribe(TypeRequest.HASH_TX);

  console.log("Listening for new transaction...");

  sock.on("message", (topic: Buffer, message: Buffer) => {
    console.log("New transaction detected:");
    const txHex = message.toString("hex");
    handleTx(txHex);
  });
}
