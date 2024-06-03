import BTCWalletModel from "../models/btcWallet";

export const getAllWalets = async () => {
  return await BTCWalletModel.find();
};

export const getAddressWallets = async (): Promise<String[]> => {
  const wallets = await BTCWalletModel.find().select("address -_id");
  return wallets.map((wallet) => wallet.address);
};
