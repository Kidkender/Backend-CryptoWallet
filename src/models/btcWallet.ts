import mongoose, { Document, Schema } from "mongoose";

export interface IBTCWallet extends Document {
  address: string;
  balance: number;
  createdAt: Date;
}

const btcWalletSchema: Schema = new Schema({
  address: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface IBTCWalletRequest {
  address: string;
  balance: number;
}
const BTCWalletModel = mongoose.model<IBTCWallet>("BTCWallet", btcWalletSchema);
export default BTCWalletModel;
