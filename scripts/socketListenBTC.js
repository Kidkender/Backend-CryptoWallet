const zmq = require("zeromq");
const Client = require("bitcoin-core");
const { Buffer } = require("buffer");

// Cấu hình kết nối đến Bitcoin Core qua RPC
const client = new Client({
  network: "mainnet",
  username: "athena",
  password: "supersecretpasswordgoeshere",
  host: "0.tcp.ap.ngrok.io",
  // host: '127.0.0.1',
  port: 11039,
});

// Tạo một socket kiểu "subscriber"
const sock = zmq.socket("sub");

// Kết nối đến địa chỉ ZMQ được cấu hình trong bitcoin.conf
sock.connect("tcp://127.0.0.1:29000");

// Đăng ký để nhận thông báo về các giao dịch mới (rawtx)
sock.subscribe("rawtx");

console.log("Listening for new transactions...");

sock.on("message", async (topic, message) => {
  console.log("New transaction detected:");
  const txHex = message.toString("hex");
  console.log(txHex); // In ra dữ liệu giao dịch dưới dạng hex

  // Giải mã giao dịch
  try {
    const decodedTransaction = await client.decodeRawTransaction(txHex);
    console.log("Decoded transaction:", decodedTransaction);
  } catch (err) {
    console.error("Error decoding transaction:", err);
  }
});
