import { LevelRetrieveBlock, VERBORSITY } from "../common/enums/btcEnum";
import {
  StatusTransaction,
  TypeTransaction,
} from "../common/enums/transactionEnum";
import { client } from "../configs/bitcoinCore";
import {
  Block,
  BTCBlock,
  Transaction,
  TxReadable,
  VoutTx,
} from "../types/btcTypes";
import { createBlock, getLatestBlock } from "./blockService";
import { insertMutiTransaction } from "./transactionService";
import { getAllWallets } from "./walletService";

export const syncTxUserWalletFromChain = async () => {
  const latestBlock = await getLatestBlock();
  if (!latestBlock) return [];

  const block: Block = await client.getBlock(
    latestBlock.hash,
    LevelRetrieveBlock.WITH_PREVOUT
  );
  const wallets = await getAllWallets();
  const addressWallets = wallets.map((wallet) => wallet.address);
  const txReadable: TxReadable[] = [];

  for (const tx of block.tx) {
    for (const wallet of addressWallets) {
      const data = await handleReadableTransaction(
        tx,
        block.confirmations,
        wallet
      );
      if (data.length) txReadable.push(...data);
    }
  }

  await insertMutiTransaction(txReadable);
};

export const handleReadableTransaction = async (
  transaction: Transaction,
  confirmations: number,
  address: string
): Promise<TxReadable[]> => {
  if (!transaction) return [];

  const { hash, fee, vin, vout } = transaction;
  const statusTx = StatusTransaction.SUCCESS;

  const inputContainsAddress = vin.some(
    (input) => input?.prevout?.scriptPubKey?.address === address
  );

  const outputContainsAddress = vout.some(
    (output) => output?.scriptPubKey?.address === address
  );

  if (!inputContainsAddress && !outputContainsAddress) return [];

  const vinTxs = vin.filter((input) => input?.prevout?.scriptPubKey?.address);
  if (vinTxs.length == 0) {
    return [];
  }

  let addressFrom = vinTxs[0].prevout.scriptPubKey.address;
  let type = TypeTransaction.SEND;

  const voutTxs: VoutTx[] = vout
    .filter((output) => output?.scriptPubKey?.address)
    .map((output) => ({
      to: output?.scriptPubKey?.address,
      value: output?.value || 0,
    }));

  let dataVout: VoutTx[] = [];

  if (outputContainsAddress && inputContainsAddress) {
    addressFrom = address;
    dataVout = voutTxs.filter((output) => output.to !== address);
  } else if (inputContainsAddress) {
    addressFrom = address;
    dataVout = voutTxs;
  } else if (outputContainsAddress) {
    dataVout = voutTxs.filter((output) => output.to === address);
    type = TypeTransaction.RECEIVE;
  }

  const outTxReadable: TxReadable[] = dataVout.map((item) => ({
    confirmations,
    hash,
    from: addressFrom,
    to: item.to,
    value: item.value,
    fee,
    status: statusTx,
    type,
  }));
  return outTxReadable;
};

export const findTransactionsByAddress = async (
  address: string
): Promise<Transaction[]> => {
  const transactionsWithAddress: Transaction[] = [];
  const latestBlock = await getLatestBlock();
  if (!latestBlock) return [];

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
  await syncTxUserWalletFromChain();
  return block.tx;
};

export const getLatestHeight = async () => {
  const data: BTCBlock = await client.getblockchaininfo();
  return data.blocks;
};
