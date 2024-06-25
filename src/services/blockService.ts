import BlockModel, { IBTCBlock, IBTCBlockData } from "./../models/btcBlock";

export const createBlock = async (blockData: IBTCBlockData) => {
  try {
    const newBlock = new BlockModel(blockData);
    const savedBlock = await newBlock.save();
    console.log("New block saved successfully: ", savedBlock.height);

    return newBlock;
  } catch (error: any) {
    throw new Error(`Error creating block: ${error.message}`);
  }
};

export const getLatestBlock = async (): Promise<IBTCBlock | null> => {
  const latestBlock = await BlockModel.findOne().sort({ time: -1 }).exec();
  if (!latestBlock) {
    console.log("No blocks found in the database.");
    return null;
  }
  return latestBlock;
};
