declare module "bitcoin-core" {
  export interface ClientOptions {
    network?: string;
    username?: string;
    password?: string;
    host?: string;
    port?: number;
    ssl?: {
      enabled: boolean;
      strict: boolean;
    };
    timeout?: number;
  }

  export class Client {
    constructor(options: ClientOptions);

    getBlock(blockHash: string, verbosity: number): Promise<any>;
    getRawTransaction(
      txid: string,
      verbose?: number,
      blockHash?: string
    ): Promise<any>;
    getBlockchainInfo(): Promise<any>;
    decodeRawTransaction(rawTransaction: string): Promise<any>;
    getblockchaininfo(): Promise<any>;
    getblockhash(height: number): Promise<String>;
  }

  export default Client;
}
