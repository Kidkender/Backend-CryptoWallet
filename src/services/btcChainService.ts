import {
  LevelRetrieveBlock,
  PositionTransfer,
  VERBORSITY,
} from "../common/enums/btcEnum";
import { convertBTCtoValue } from "../common/utils/decimalToken";
import { client } from "../configs/bitcoinCore";
import { Block, dataResponseTx, Transaction } from "../types/btcTypes";
import { createBlock, getLatestBlock } from "./blockService";
import { getAllWallets } from "./walletService";

export const filterTransactionsByAddress = async (): Promise<Transaction[]> => {
  const transactionsWithAddress: Transaction[] = [];

  const latestBlock = await getLatestBlock();
  if (!latestBlock) {
    return [];
  }
  const block: Block = await client.getBlock(
    latestBlock.hash,
    LevelRetrieveBlock.WITH_PREVOUT
  );
  const wallets = await getAllWallets();
  const addressWallets = wallets.map((wallet) => wallet.address);

  for (const tx of block.tx) {
    const inputContainsAddress = tx.vin.some((input) =>
      addressWallets.includes(input?.prevout?.scriptPubKey?.address)
    );

    const outputContainsAddress = tx.vout.some((output) =>
      addressWallets.includes(output?.scriptPubKey?.address)
    );

    if (inputContainsAddress || outputContainsAddress) {
      transactionsWithAddress.push(tx);
    }

    return transactionsWithAddress;

    // for (const input of tx.vin) {
    //   if (addressWallets.includes(input?.prevout?.scriptPubKey?.address)) {
    //     transactionsWithAddress.push({
    //       typeTx: "Sender",
    //       address: input.prevout.scriptPubKey.address,
    //       value: input.prevout.value,
    //     });
    //   }
    // }

    // for (const output of tx.vout) {
    //   if (addressWallets.includes(output?.scriptPubKey?.address)) {
    //     transactionsWithAddress.push({
    //       typeTx: "Receiver",
    //       address: output.scriptPubKey.address,
    //       value: output.value,
    //     });
    //   }
    // }
  }

  return transactionsWithAddress;
};

export const handleReadableTransaction = async (
  tx: string,
  blockHash: string,
  address: string
) => {
  const transaction: Transaction = await client.getRawTransaction(
    tx,
    VERBORSITY.WITH_PREVOUT,
    blockHash
  );
  const listTxInput: Transaction[] = [];

  const inputContainsAddress = transaction.vin.some(
    (input) => input?.prevout?.scriptPubKey?.address === address
  );

  const outputContainsAddress = transaction.vout.some(
    (output) => output?.scriptPubKey?.address === address
  );

  if (
    (inputContainsAddress && outputContainsAddress) ||
    outputContainsAddress
  ) {
  }
};

export const findTransactionsByAddress = async (
  address: string
): Promise<Transaction[]> => {
  const transactionsWithAddress: Transaction[] = [];
  const latestBlock = await getLatestBlock();
  if (!latestBlock) {
    return [];
  }
  const block: Block = await client.getBlock(
    latestBlock.hash,
    LevelRetrieveBlock.WITH_PREVOUT
  );

  for (const tx of block.tx) {
    const inputContainsAddress = tx.vin.some(
      (input) => input?.prevout?.scriptPubKey?.address === address
    );

    const outputContainsAddress = tx.vout.some(
      (output) => output?.scriptPubKey?.address === address
    );

    if (inputContainsAddress || outputContainsAddress) {
      transactionsWithAddress.push(tx);
    }
  }

  return transactionsWithAddress;
};

export const handleBlock = async (
  hashBlock: string
): Promise<Transaction[]> => {
  const block: Block = await client.getBlock(
    hashBlock,
    LevelRetrieveBlock.BLOCK_HASH
  );
  const {
    hash,
    height,
    previousblockhash,
    time,
    mediantime,
    nonce,
    difficulty,
    nTx,
  } = block;
  const difficultyStr = difficulty.toString();
  await createBlock({
    hash,
    height,
    previousblockhash,
    time,
    mediantime,
    nonce,
    difficulty: difficultyStr,
    sizeTx: nTx,
  });
  return block.tx;
};
