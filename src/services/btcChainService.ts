import { LevelRetrieveBlock, PositionTransfer } from "../common/enums/btcEnum";
import { convertBTCtoValue } from "../common/utils/decimalToken";
import { client } from "../configs/bitcoinCore";
import {
  Block,
  dataResponseTx,
  filterTxAddressDto,
  Transaction,
} from "../types/btcTypes";
import { createBlock, getLatestBlock } from "./blockService";

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
    LevelRetrieveBlock.BLOCK_HASH
  );

  for (const tx of block.tx) {
    const inputContainsAddress = tx.vin.some(
      (input) => input.prevout.scriptPubKey.address === address
    );

    const outputContainsAddress = tx.vout.some(
      (output) => output.scriptPubKey.address === address
    );

    if (inputContainsAddress || outputContainsAddress) {
      transactionsWithAddress.push(tx);
    }
  }

  return transactionsWithAddress;
};

// export const filterTransactionByAddress = async (
//   requestDto: filterTxAddressDto
// ): Promise<dataResponseTx[] | null> => {
//   const latestBlock = await getLatestBlock();
//   if (!latestBlock) { return null; }
//   const block: Block = await client.getBlock(
//     latestBlock.hash,
//     LevelRetrieveBlock.BLOCK_HASH
//   );

//   const { } = block.tx;
//   const resultInput = filterAndMapData(block.tx, requestDto.address, true);
//   const resultOutput = filterAndMapData(out, requestDto.address, false);

//   return [...resultInput, ...resultOutput];
// };

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
