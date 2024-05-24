import * as ethers from "ethers";
import { httpsEndpointEVM } from "../../configs/connectionUrl";

enum EvmChainId {
  ETH = 1,
  BSC = 56,
  Polygon = 137,
  Avalanche = 43114,
  Fantom = 250,
  Cronos = 25,
}

const evmProvider = new ethers.JsonRpcProvider(
  httpsEndpointEVM(EvmChainId.ETH)
);
