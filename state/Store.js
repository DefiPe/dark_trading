import { create } from "zustand";

export const useNetworkStore = create((set, get) => ({
  networkId: 1,
  setNetworkId: (_val) => set(() => ({networkId: _val})),

  sellToken :"0x",
  setsellToken: (_val) => set(() => ({sellToken: _val})),

  receiveToken :"0x",
  setReceiveToken: (_val) => set(() => ({receiveToken: _val})),

  preferredFiat: "usd",
  setPreferredFiat: (_val) => set(() => ({preferredFiat: _val})),
  
  currentFiatPrice: null,
  setCurrentFiatPrice: (_val) => set(() => ({currentFiatPrice: _val})),


}));