import mongoose, { Document, Schema } from "mongoose";

export interface IBTCBlock extends Document {
  hash: string;
  height: number;
  previousblockhash: string;
  time: number;
  mediantime: number;
  nonce: number;
  difficulty: string;
  sizeTx: number;
}
export interface IBTCBlockData {
  hash: string;
  height: number;
  previousblockhash: string;
  time: number;
  mediantime: number;
  nonce: number;
  difficulty: string;
  sizeTx: number;
}

const btcBlockSchema: Schema = new Schema({
  hash: { type: String, required: true },
  height: { type: Number, required: true },
  previousblockhash: { type: String, required: true },
  time: { type: Number, required: true },
  mediantime: { type: Number, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: String, required: true },
  sizeTx: { type: Number, required: true },
});
const BlockModel = mongoose.model<IBTCBlock>("BTCBlock", btcBlockSchema);
export default BlockModel;
