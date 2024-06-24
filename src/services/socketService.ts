import zmq from "zeromq";
import { handleBlock } from "./btcChainService";

enum TypeRequest {
  RAW_BLOCK = "rawblock",
  RAW_TX = "rawtx",
  HASH_BLOCK = "hashblock",
  HASH_TX = "hashtx",
}

export function createWebSocketConnection() {
  const sock = zmq.socket("sub");

  sock.connect("tcp://127.0.0.1:29000");
  sock.subscribe(TypeRequest.HASH_BLOCK);

  console.log("Listening for new block...");

  sock.on("message", (topic: Buffer, message: Buffer) => {
    console.log("New block detected:");
    const txHex = message.toString("hex");
    handleBlock(txHex);
  });
}
