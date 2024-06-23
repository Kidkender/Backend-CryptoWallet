import zmq from "zeromq";

export function createWebSocketConnection() {
  const sock = new zmq.Subscriber();

  sock.connect("tcp://127.0.0.1:28332");
  sock.subscribe("rawblock");

  console.log("Listening for new blocks...");

  sock.on("message", (topic: Buffer, message: Buffer) => {
    console.log("New block detected:");
    console.log(message.toString("hex"));
  });
}
