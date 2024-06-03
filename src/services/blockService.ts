import BlockModel, { IBTCBlock } from "./../models/btcBlock";

export const createBlock = async (
  index: number,
  previousBlock: number,
  hash: string,
  time: string,
  sizeTx: number,
  reward: string
): Promise<IBTCBlock> => {
  try {
    const newBlock = new BlockModel({
      index,
      previousBlock,
      hash,
      time,
      sizeTx,
      reward,
    });
    await newBlock.save();
    return newBlock;
  } catch (error: any) {
    throw new Error(`Error creating block: ${error.message}`);
  }
};
