const WebSocket = require("ws");

function createWebSocketConnection() {
  const socket = new WebSocket("wss://ws.blockchain.info/inv");

  socket.on("open", function open() {
    console.log("Connected to WebSocket");

    const subscribeMessage = {
      op: "blocks_sub",
    };

    socket.send(JSON.stringify(subscribeMessage));
    console.log("Subscribed to new blocks");
  });

  socket.on("message", function incoming(data) {
    const message = JSON.parse(data);
    console.log("New message:", message);
  });

  socket.on("close", function close() {
    console.log("Disconnected from WebSocket");

    setTimeout(createWebSocketConnection, 5000);
  });

  socket.on("error", function error(err) {
    console.error("WebSocket error:", err);
  });
}

createWebSocketConnection();

// If unsubscribes   "op": "blocks_unsub"
