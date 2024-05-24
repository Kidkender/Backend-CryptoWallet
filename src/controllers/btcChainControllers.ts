import { StatusCodes } from "http-status-codes";
import {
  filterTransactionByAddress,
  getBlockData,
  getTransactionData,
} from "../services/btc-chain/connectRpcBTC";
import { Request, Response } from "express";
import { filterTxAddressDto } from "../types/btcTypes";

export const getBlock = async (req: Request, res: Response) => {
  const blockHash = req.params.hash;
  if (!blockHash) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Block hash is required" });
    return;
  }
  const BlockData = await getBlockData(blockHash);
  res.status(StatusCodes.OK).json(BlockData);
};

export const getTransaction = async (req: Request, res: Response) => {
  const txHash = req.params.hash;
  if (!txHash) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Transaction hash is required" });
  }
  const transactionData = await getTransactionData(txHash);
  res.status(StatusCodes.OK).json(transactionData);
};

export const getTxByAddress = async (req: Request, res: Response) => {
  const reqData: filterTxAddressDto = req.body;
  const txData = await filterTransactionByAddress(reqData);
  res.status(StatusCodes.OK).json(txData);
};
