"use client";

import { useEffect, useMemo, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";

import { isPrivyConfigured } from "@/components/app-providers";

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

type TokenAccountResponse = {
  result?: {
    value?: Array<{
      account?: {
        data?: {
          parsed?: {
            info?: {
              tokenAmount?: {
                uiAmountString?: string;
              };
            };
          };
        };
      };
    }>;
  };
};

function formatAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function formatUsdcBalance(balance: number | null) {
  if (balance === null) {
    return "USDC --";
  }

  return `${balance.toLocaleString("en-US", {
    maximumFractionDigits: balance > 0 && balance < 0.01 ? 6 : 2,
    minimumFractionDigits: 2,
  })} USDC`;
}

async function fetchUsdcBalance(address: string) {
  const response = await fetch(SOLANA_RPC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "palares-usdc-balance",
      method: "getTokenAccountsByOwner",
      params: [address, { mint: USDC_MINT }, { encoding: "jsonParsed" }],
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to fetch USDC balance.");
  }

  const data = (await response.json()) as TokenAccountResponse;
  const accounts = data.result?.value ?? [];

  return accounts.reduce((total, account) => {
    const amount = account.account?.data?.parsed?.info?.tokenAmount?.uiAmountString;
    return total + (amount ? Number(amount) : 0);
  }, 0);
}

function PrivyAuthButton() {
  const { authenticated, login, logout, ready, user } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [balance, setBalance] = useState<{ address: string; value: number } | null>(null);

  const walletAddress = useMemo(() => {
    const embeddedWallet = wallets.find((wallet) => wallet.standardWallet.name === "Privy");
    return embeddedWallet?.address ?? wallets[0]?.address;
  }, [wallets]);

  useEffect(() => {
    if (!authenticated || !walletsReady || !walletAddress) {
      return;
    }

    let isMounted = true;

    fetchUsdcBalance(walletAddress)
      .then((nextBalance) => {
        if (isMounted) {
          setBalance({ address: walletAddress, value: nextBalance });
        }
      })
      .catch(() => {
        if (isMounted) {
          setBalance(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authenticated, walletAddress, walletsReady]);

  if (authenticated) {
    const displayName = user?.email?.address ?? (walletAddress ? formatAddress(walletAddress) : "Signed in");
    const displayedBalance = balance?.address === walletAddress ? balance.value : null;

    return (
      <div className="flex items-center gap-2">
        <span className="hidden h-8 items-center rounded-md border border-[#e9e8e3] bg-white px-2 text-sm font-medium text-zinc-600 sm:flex">
          {formatUsdcBalance(displayedBalance)}
        </span>
        <button
          className="flex h-8 items-center gap-2 rounded-md border border-[#e9e8e3] bg-white px-2 text-sm font-medium text-zinc-700 transition hover:border-[#deddd7] hover:text-zinc-950 disabled:cursor-wait disabled:opacity-70"
          disabled={isSigningOut}
          onClick={async () => {
            setIsSigningOut(true);
            try {
              await logout();
              setBalance(null);
            } finally {
              setIsSigningOut(false);
            }
          }}
        >
          <span className="hidden max-w-32 truncate sm:inline">{displayName}</span>
          <span>{isSigningOut ? "Signing out" : "Sign out"}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      className="h-8 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
      disabled={!ready}
      onClick={() => login({ loginMethods: ["email"] })}
    >
      Sign in
    </button>
  );
}

export function AuthButton() {
  if (!isPrivyConfigured) {
    return (
      <button
        className="h-8 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white opacity-70"
        disabled
        title="Set NEXT_PUBLIC_PRIVY_APP_ID to enable Privy sign in."
      >
        Sign in
      </button>
    );
  }

  return <PrivyAuthButton />;
}
