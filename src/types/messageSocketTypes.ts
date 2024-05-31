export interface BlockRaw {
  op: string;
  x: X;
}
export interface X {
  txIndexes?: null[] | null;
  nTx: number;
  estimatedBTCSent: number;
  totalBTCSent: number;
  reward: number;
  size: number;
  weight: number;
  blockIndex: number;
  prevBlockIndex: number;
  height: number;
  hash: string;
  mrklRoot: string;
  difficulty: number;
  version: number;
  time: number;
  bits: number;
  nonce: number;
  foundBy: FoundBy;
}
export interface FoundBy {
  description: string;
  ip: string;
  link: string;
  time: number;
}
