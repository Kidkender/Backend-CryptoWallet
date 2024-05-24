export interface Weather {
  op: string;
  x: X;
}
export interface X {
  txIndexes?: number[] | null;
  nTx: number;
  totalBTCSent: number;
  estimatedBTCSent: number;
  reward: number;
  size: number;
  blockIndex: number;
  prevBlockIndex: number;
  height: number;
  hash: string;
  mrklRoot: string;
  version: number;
  time: number;
  bits: number;
  nonce: number;
}
