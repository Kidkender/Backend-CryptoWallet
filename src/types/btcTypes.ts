export interface Block {
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
  tx: Transaction[];
}

export interface Transaction {
  in_active_chain: boolean;
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: Vin[];
  vout: Vout[];
  fee: number;
  hex: string;
}

export interface Vin {
  txid: string;
  vout: number;
  scriptSig: ScriptSig;
  txinwitness: string[];
  prevout: Prevout;
  sequence: number;
}

export interface Prevout {
  generated: boolean;
  height: number;
  value: number;
  scriptPubKey: ScriptPubKey;
}

export interface ScriptPubKey {
  asm: string;
  desc: string;
  hex: string;
  address: string;
  type: string;
}

export interface ScriptSig {
  asm: string;
  hex: string;
}

export interface Vout {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
}

export interface RawTransaction {
  in_active_chain: boolean;
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: Vin[];
  vout: Vout[];
  fee: number;
  hex: string;
  blockhash: string;
  confirmations: number;
  time: number;
  blocktime: number;
}

export interface filterTxAddressDto {
  address: string;
  txHash: string;
}

export interface dataResponseTx {
  typeTx: string;
  address: string;
  value: number;
}

export interface TxReadable {
  confirmations?: number;
  fee: string;
  from: string;
  hash: string;
  inToken?: string;
  inValue?: number;
  outToken?: string;
  outValue?: number;
  status: string;
  to: string;
  token?: string;
  type: TypeTransaction;
  value: string;
}
export interface TypeTransaction {
  SEND: "send";
  RECEIVE: "receive";
}
