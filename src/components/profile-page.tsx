"use client";

import Link from "next/link";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";

import { AuthButton } from "@/components/auth-button";

function formatAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function ProfilePage() {
  const { authenticated, login, logout, ready, user } = usePrivy();
  const { wallets } = useWallets();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const walletAddress = wallets[0]?.address;
  const emailAddress = user?.email?.address;

  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link className="flex shrink-0 items-center gap-2" href="/">
            <span className="text-base font-semibold tracking-normal">ares</span>
          </Link>
          <AuthButton />
        </div>
      </header>

      <section className="mx-auto w-full max-w-2xl px-4 pb-20 pt-28 sm:px-6">
        <h1 className="text-3xl font-[650] leading-10 text-zinc-950">Profile</h1>

        <div className="mt-8 rounded-xl border border-[#e9e8e3] bg-white p-5 shadow-md shadow-black/[0.04]">
          {authenticated ? (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-[600] uppercase tracking-wide text-zinc-400">Email</p>
                <p className="mt-1 text-base font-[500] text-zinc-900">{emailAddress ?? "No email connected"}</p>
              </div>
              <div>
                <p className="text-xs font-[600] uppercase tracking-wide text-zinc-400">Wallet</p>
                <p className="mt-1 text-base font-[500] text-zinc-900">
                  {walletAddress ? formatAddress(walletAddress) : "Wallet pending"}
                </p>
              </div>
              <button
                className="h-10 rounded-lg bg-zinc-950 px-4 text-sm font-[650] text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
                disabled={isSigningOut}
                onClick={async () => {
                  setIsSigningOut(true);
                  try {
                    await logout();
                  } finally {
                    setIsSigningOut(false);
                  }
                }}
                type="button"
              >
                {isSigningOut ? "Signing out" : "Sign out"}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-base font-[440] leading-7 text-zinc-500">Sign in to view your profile.</p>
              <button
                className="mt-5 h-10 rounded-lg bg-zinc-950 px-4 text-sm font-[650] text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
                disabled={!ready}
                onClick={() => login({ loginMethods: ["email"] })}
                type="button"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
