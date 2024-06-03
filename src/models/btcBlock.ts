import mongoose, { Document, Schema } from "mongoose";

export interface IBTCBlock extends Document {
  index: number;
  previousBlock: number;
  hash: string;
  time: string;
  sizeTx: number;
  reward: string;
}

const btcBlockSchema: Schema = new Schema({
  index: Number,
  previousBlock: Number,
  hash: String,
  time: String,
  sizeTx: Number,
  reward: String,
});

const BlockModel = mongoose.model<IBTCBlock>("BTCBlock", btcBlockSchema);
export default BlockModel;
