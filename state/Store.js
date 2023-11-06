import { create } from "zustand";

export const useNetworkStore = create((set, get) => ({
  networkId: 1,
  setNetworkId: (_val) => set(() => ({networkId: _val})),

  sellToken :null,
  setsellToken: (_val) => set(() => ({sellToken: _val})),

  receiveToken :null,
  setReceiveToken: (_val) => set(() => ({receiveToken: _val})),

  preferredFiat: "usd",
  setPreferredFiat: (_val) => set(() => ({preferredFiat: _val})),
  
  buyTokenFiatPrice: null,
  setBuyTokenFiatPrice: (_val) => set(() => ({buyTokenFiatPrice: _val})),


}));