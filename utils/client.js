import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet, polygon } from "viem/chains";
import { useNetworkStore } from "@/state/Store";
import { useWalletClient } from "wagmi";

export default function publicClientViem() {
  const { data: walletClient } = useWalletClient();
  const networkID = useNetworkStore((state) => state.networkId);
  let network;
  let rpcURL;
  if (networkID == 137) {
    network = polygon;
    rpcURL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;
  } else {
    network = mainnet;
    rpcURL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;
  }


     let publicClient = createPublicClient({
      chain: network,
      transport: http(rpcURL),
    });
   


    let privateClient;
    walletClient && (privateClient = createWalletClient({
      account: walletClient?.account.address,
      chain: network,
      transport: custom(walletClient),
    }))


  return [publicClient, privateClient];
}