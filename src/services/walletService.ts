import BTCWalletModel, { IBTCWallet } from "../models/btcWallet";

export const getAllWallets = async (): Promise<IBTCWallet[]> => {
  try {
    const wallets = await BTCWalletModel.find().exec();

    return wallets;
  } catch (error: any) {
    throw new Error(`Error retrieving wallets: ${error.message}`);
  }
};

export const getAddressWallets = async (): Promise<String[]> => {
  const wallets = await BTCWalletModel.find().select("address -_id");
  return wallets.map((wallet) => wallet.address);
};

export const createWallet = async (data: IBTCWallet) => {
  try {
    const newWallet = new BTCWalletModel(data);
    const savedWallet = await newWallet.save();
    console.log("Wallet BTC saved successfully: ", savedWallet.address);
  } catch (error: any) {
    throw new Error(`Error creating Wallet: ${error.message}`);
  }
};
