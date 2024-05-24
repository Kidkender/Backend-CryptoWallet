import dotenv from "dotenv";
dotenv.config();

const project_Id: string = process.env.PROJECT_ID || "";
const client_key: string = process.env.CLIENT_KEY || "";

export const httpsEndpointEVM = (chainId: number): string => {
  return `https://rpc.particle.network/evm-chain?chainId=${chainId}&projectUuid=${project_Id}&projectKey=${client_key}`;
};

export const wssEndpointEVM = (chainId: number): string => {
  return `wss://rpc.particle.network/evm-chain?chainId=${chainId}&projectUuid=${project_Id}&projectKey=${client_key}`;
};
