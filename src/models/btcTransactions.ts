import mongoose, { Document, Schema } from "mongoose";
import {
  StatusTransaction,
  TypeTransaction,
} from "../common/enums/transactionEnum";

interface IBtcTransaction extends Document {
  confirmations?: number;
  fee: number;
  from: string;
  hash: string;
  inToken?: string;
  inValue?: number;
  outToken?: string;
  outValue?: number;
  status: StatusTransaction;
  to: string;
  token?: string;
  type: TypeTransaction;
  value: number;
}

const btcTransactionSchema: Schema = new Schema({
  confirmations: {
    type: Number,
    required: false,
  },
  fee: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  inToken: {
    type: String,
    required: false,
  },
  inValue: {
    type: Number,
    required: false,
  },
  outToken: {
    type: String,
    required: false,
  },
  outValue: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED"],
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ["SEND", "RECEIVE"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
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
