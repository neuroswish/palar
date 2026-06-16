"use client";

import type { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const privyClientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;

export const isPrivyConfigured = Boolean(privyAppId);

export function AppProviders({ children }: { children: ReactNode }) {
  if (!privyAppId) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      clientId={privyClientId || undefined}
      config={{
        loginMethods: ["email"],
        appearance: {
          theme: "light",
          accentColor: "#09090b",
          landingHeader: "Sign in to Ares",
          loginMessage: "Enter your email to continue.",
          walletChainType: "solana-only",
        },
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
