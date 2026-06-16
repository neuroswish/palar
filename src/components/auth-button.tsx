"use client";

import Link from "next/link";
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

function formatUsdcBalance(balance: number | null) {
  const normalizedBalance = balance ?? 0;
  return `$${normalizedBalance.toLocaleString("en-US", {
    maximumFractionDigits: normalizedBalance > 0 && normalizedBalance < 0.01 ? 6 : 2,
    minimumFractionDigits: 2,
  })}`;
}

const profileColors = [
  "bg-[#3157e8]",
  "bg-[#22a06b]",
  "bg-[#d9466f]",
  "bg-[#f59e0b]",
  "bg-[#7c3aed]",
  "bg-[#0891b2]",
];

function getProfileSeed(userIdentifier: string) {
  return userIdentifier.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
}

function getProfileInitial(userIdentifier: string) {
  const trimmedIdentifier = userIdentifier.trim();
  return (trimmedIdentifier[0] ?? "A").toUpperCase();
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
  const { authenticated, login, ready, user } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();
  const [balance, setBalance] = useState<{ address: string; value: number } | null>(null);

  const walletAddress = useMemo(() => {
    const embeddedWallet = wallets.find((wallet) => wallet.standardWallet?.name === "Privy");
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
    const displayName = user?.email?.address ?? walletAddress ?? "Ares profile";
    const displayedBalance = balance && walletAddress && balance.address === walletAddress ? balance.value : null;
    const profileColor = profileColors[getProfileSeed(displayName) % profileColors.length];

    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-[600] text-zinc-700" title="USDC balance">
          {formatUsdcBalance(displayedBalance)}
        </span>
        <Link
          aria-label="Open profile"
          className={`grid h-8 w-8 place-items-center rounded-full text-sm font-[650] text-white shadow-sm shadow-black/[0.08] ring-1 ring-black/[0.06] transition hover:scale-[1.03] ${profileColor}`}
          href="/profile"
          title={displayName}
        >
          {getProfileInitial(displayName)}
        </Link>
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
