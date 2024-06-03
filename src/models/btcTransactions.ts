import mongoose, { Document, Schema } from "mongoose";

interface IBtcTransaction extends Document {
  transactionHash: string;
  addressFrom: string;
  addressTo: string;
  value: string;
}

const btcTransactionSchema: Schema = new Schema({
  transactionHash: String,
  addressFrom: String,
  addressTo: String,
  value: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BTCTransactionModel = mongoose.model<IBtcTransaction>(
  "BtcTransaction",
  btcTransactionSchema
);
export default BTCTransactionModel;
