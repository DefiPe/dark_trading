import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet, polygon } from "viem/chains";
import { useNetworkStore } from "@/state/Store";
import { useWalletClient } from "wagmi";
import { erc20ABI, getNetwork } from "@wagmi/core";

export default function publicClientViem() {
  const { data: walletClient } = useWalletClient();
  const { chain } = getNetwork(); 
 //const networkID = useNetworkStore((state) => state.networkId);
  let network;
  let rpcURL;
  if (chain?.id == 137) {
    network = polygon;
    rpcURL = `https://polygon-mainnet.g.alchemy.com/v2/hrklqhljM4Bb8H8IfqmziZIXJZWbBVK4`;
  } else {
    network = mainnet;
    rpcURL = `https://eth-mainnet.g.alchemy.com/v2/hrklqhljM4Bb8H8IfqmziZIXJZWbBVK4`;
  }


     let publicClient = createPublicClient({
      chain: network,
      transport: http(rpcURL),
    });
   


    let privateClient;
    walletClient && (privateClient = createWalletClient({
      account: walletClient?.account?.address,
      chain: network,
      transport: custom(walletClient),
    }))


  return [publicClient, privateClient];
}