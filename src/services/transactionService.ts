import BTCTransactionModel from "../models/btcTransactions";
import { TxReadable } from "../types/btcTypes";

export const inserTransaction = async (tx: TxReadable) => {
  try {
    const newTx = new BTCTransactionModel(tx);
    const savedTx = await newTx.save();
    console.log("Transaction with %s saved", savedTx.hash);
  } catch (error: any) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
};

export const insertMutiTransaction = async (txs: TxReadable[]) => {
  if (txs.length == 0) {
    return;
  }
  try {
    await BTCTransactionModel.insertMany(txs);
    console.log(`${txs.length} Transactions inserted successfully`);
  } catch (error: any) {
    console.error(error.message);
  }
};
