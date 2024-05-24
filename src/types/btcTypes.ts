// export interface BlockData {
//   hash: string;
//   ver: number;
//   prev_block: string;
//   mrkl_root: string;
//   time: number;
//   bits: number;
//   nonce: number;
//   n_tx: number;
//   size: number;
//   block_index: number;
//   main_chain: boolean;
//   height: number;
//   received_time: number;
//   relayed_by: string;
//   tx: Transaction[];
// }

export interface Transaction {
  hash: string;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  size: number;
  weight: number;
  fee: number;
  relayed_by: string;
  lock_time: number;
  tx_index: number;
  double_spend: boolean;
  time: number;
  block_index: number;
  block_height: number;
  inputs: InputsEntity[];
  out: OutEntity[];
}
export interface InputsEntity {
  sequence: number;
  witness: string;
  script: string;
  index: number;
  prev_out: PrevOut;
}
export interface PrevOut {
  addr: string;
  n: number;
  script: string;
  spending_outpoints?: SpendingOutpointsEntity[] | null;
  spent: boolean;
  tx_index: number;
  type: number;
  value: number;
}
export interface SpendingOutpointsEntity {
  n: number;
  tx_index: number;
}
export interface OutEntity {
  type: number;
  spent: boolean;
  value: number;
  spending_outpoints?: null[] | null;
  n: number;
  tx_index: number;
  script: string;
  addr: string;
}

export interface BlockData {
  result: Result;
  error: any;
  id: number;
}

export interface Result {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string;
  strippedsize: number;
  size: number;
  weight: number;
  tx: string[];
}

export interface filterTxAddressDto {
  address: string;
  txHash: string;
}

export interface dataResponseTx {
  typeParam: string;
  address: string;
  value: string;
}
