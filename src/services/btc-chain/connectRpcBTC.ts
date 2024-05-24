import axios from "axios";
import { PositionTransfer } from "../../common/enums/btcEnum";
import { bitcoinChainMainnet, blockChainInfor } from "./../../constants/urls";
import {
  BlockData,
  dataResponseTx,
  filterTxAddressDto,
  InputsEntity,
  OutEntity,
  Transaction,
} from "./../../types/btcTypes";
import { convertBTCtoValue } from "../../common/utils/decimalToken";

// const wssBTCUrl: string = "wss://ws.blockchain.info/inv";
// const ws = new WebSocket(wssBTCUrl);

// ws.on("open", function open() {
//   console.log("Websocket connection opened");

//   const subscribeMessage = JSON.stringify({ op: "blocks_sub" });
//   ws.send(subscribeMessage);
//   console.log("Subscribed to new block");
// });

// ws.on("message", function incoming(data) {
//   const message = JSON.parse(data.toString());
//   console.log("Received data:", message);
// });

// ws.on("close", function close() {
//   console.log("WebSocket connection closed");
// });

// ws.on("error", function error(err) {
//   console.error("WebSocket error:", err);
// });

const header = {
  "Content-Type": "application/json",
};

export const getBlockData = async (blockHash: string): Promise<BlockData> => {
  const url = bitcoinChainMainnet;
  const data = {
    jsonrpc: "1.0",
    id: 0,
    method: "getblock",
    params: [blockHash],
  };

  try {
    const response = await axios.post<BlockData>(url, data, {
      headers: header,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error making request:", error.message);
    throw new Error("Error fetching block data");
  }
};

export const getTransactionData = async (
  txHash: string
): Promise<Transaction> => {
  const url = `${blockChainInfor}/rawtx/${txHash}`;

  try {
    const response = await axios.get<Transaction>(url);
    return response.data;
  } catch (error: any) {
    console.error("Error making request:", error.message);
    throw new Error("Error fetching block data");
  }
};

const filterAndMapData = <T>(
  data: T[],
  addressFilter: string,
  isInput: boolean
): dataResponseTx[] => {
  return data
    .filter(
      (entity: any) =>
        (isInput ? entity.prev_out.addr : entity.addr) === addressFilter
    )
    .map((entity: any) => ({
      typeParam: isInput ? PositionTransfer.SENDER : PositionTransfer.RECEIVER,
      address: isInput ? entity.prev_out.addr : entity.addr,
      value: convertBTCtoValue(
        isInput ? entity.prev_out.value : entity.value
      ).toString(),
    }));
};

export const filterTransactionByAddress = async (
  requestDto: filterTxAddressDto
): Promise<dataResponseTx[]> => {
  const { inputs, out } = await getTransactionData(requestDto.txHash);
  const resultInput = filterAndMapData(inputs, requestDto.address, true);
  const resultOutput = filterAndMapData(out, requestDto.address, false);

  return [...resultInput, ...resultOutput];
};
