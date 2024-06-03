import WebSocket from "ws";
import { handleNewBlock } from "./btcChainService";
import { BlockRaw } from "../types/messageSocketTypes";
import { createBlock } from "./blockService";

export function createWebSocketConnection() {
  const socket = new WebSocket("wss://ws.blockchain.info/inv");

  socket.on("open", function open() {
    console.log("Connected to WebSocket");

    const subscribeMessage = {
      op: "blocks_sub",
    };

    socket.send(JSON.stringify(subscribeMessage));
    console.log("Subscribed to new blocks");
  });

  socket.on("message", async function incoming(data: WebSocket.RawData) {
    const message: BlockRaw = JSON.parse(data.toString());

    if (message.x.hash) {
      const { hash, blockIndex, prevBlockIndex, nTx, time, reward } = message.x;
      await createBlock(
        blockIndex,
        prevBlockIndex,
        hash,
        time.toString(),
        nTx,
        reward.toString()
      );
      await handleNewBlock(hash);
    }
  });

  socket.on("close", function close() {
    console.log("Disconnected from WebSocket");

    setTimeout(createWebSocketConnection, 5000);
  });

  socket.on("error", function error(err) {
    console.error("WebSocket error:", err);
  });
}
