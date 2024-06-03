import mongoose, { Document, Schema } from "mongoose";

interface IBTCWallet extends Document {
  address: string;
  createdAt: Date;
}

export const btcWalletSchema: Schema = new Schema({
  address: {
    require: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BTCWalletModel = mongoose.model<IBTCWallet>("BTCWallet", btcWalletSchema);
export default BTCWalletModel;
