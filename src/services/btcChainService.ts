import axios from "axios";
import { PositionTransfer } from "../common/enums/btcEnum";
import { convertBTCtoValue } from "../common/utils/decimalToken";
import { bitcoinChainMainnet, blockChainInfor } from "../constants/urls";
import {
  BlockData,
  dataResponseTx,
  filterTxAddressDto,
  Transaction,
} from "../types/btcTypes";

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

export const handleNewBlock = async (hashBlock: string) => {
  const dataBlock = await getBlockData(hashBlock);
  console.log("new block data: ", dataBlock);

  if (!dataBlock) {
    return;
  }

  const transactionHashes = dataBlock.result.tx;
};
