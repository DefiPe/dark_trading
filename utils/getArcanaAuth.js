// Set up Arcana Auth 

import { AuthProvider } from "@arcana/auth";

let auth = null;

export const getAuthProvider = () => {
  if (!auth) {
    auth = new AuthProvider(
      process.env.NEXT_PUBLIC_ARCANA_ID
    );
  }
  return auth;
};