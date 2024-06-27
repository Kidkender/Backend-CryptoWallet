import { StatusCodes } from "http-status-codes";

import { Request, Response } from "express";
import { createWallet, getAllWallets } from "../services/walletService";
import {
  syncTxUserWalletFromChain,
  findTransactionsByAddress,
} from "./../services/btcChainService";

export const getTxByAddress = async (req: Request, res: Response) => {
  const reqData = req.params;
  const txData = await findTransactionsByAddress(reqData.address);
  res.status(StatusCodes.OK).json(txData);
};

export const createWalletBTC = async (req: Request, res: Response) => {
  const reqData = req.body;
  await createWallet(reqData);

  res.sendStatus(StatusCodes.OK);
};

export const getWalletsBTC = async (req: Request, res: Response) => {
  const wallets = await getAllWallets();
  res.status(StatusCodes.OK).json(wallets);
};

export const getTxFiltered = async (req: Request, res: Response) => {
  const txFilterd = await syncTxUserWalletFromChain();
  res.status(StatusCodes.OK).json(txFilterd);
};
