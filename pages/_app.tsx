import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react";
import "@rainbow-me/rainbowkit/styles.css";
// import '@radix-ui/themes/styles.css';
// import { Theme } from '@radix-ui/themes';
// import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, bsc } from "wagmi/chains";
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
//import { getAuthProvider } from "./getArcanaAuth";
import { getAuthProvider } from "@/utils/getArcanaAuth";
import { ArcanaConnector } from "@arcana/auth-wagmi";

import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }), publicProvider()]
);

const projectId = "3378220eb8273a149445af8bf0c5ed8e";

export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "DefiPe Wallet",
    iconUrl: "/white-logo.svg",
    iconBackground: "#FFFFFF",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          auth: getAuthProvider()
        }
      });
      return {
        connector
      };
    }
  };
};

// const { wallets } = getDefaultWallets({
//   appName: "DefiPe Wallets",
//   projectId,
//   chains,
// });

const demoAppInfo = {
  appName: "DefiPe",
};

const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: "Recomended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      ArcanaRainbowConnector({ projectId, chains }),
      trustWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider theme={darkTheme()} appInfo={demoAppInfo} chains={chains}>
          <NextUIProvider>
            <div id="root">
              <NextUIProvider>
                <Component {...pageProps} />
              </NextUIProvider>
            </div>
          </NextUIProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}
