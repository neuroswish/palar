"use client";

import Link from "next/link";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Info, LogOut, Settings } from "lucide-react";

import { isPrivyConfigured } from "@/components/app-providers";

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

type AuthButtonProps = {
  showCreateLink?: boolean;
};

function PrivyAuthButton({ showCreateLink = true }: AuthButtonProps) {
  const { authenticated, login, logout, ready, user } = usePrivy();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  if (authenticated) {
    const displayName = user?.email?.address ?? "Ares profile";
    const profileColor = profileColors[getProfileSeed(displayName) % profileColors.length];

    return (
      <div className="flex items-center gap-3">
        {showCreateLink ? (
          <Link
            className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-[600] text-white shadow-sm shadow-blue-600/10 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            href="/create"
          >
            Create
          </Link>
        ) : null}
        <div
          className="relative"
          onBlurCapture={(event) => {
            if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
              setIsProfileMenuOpen(false);
            }
          }}
          onFocusCapture={() => setIsProfileMenuOpen(true)}
          onMouseEnter={() => setIsProfileMenuOpen(true)}
          onMouseLeave={() => setIsProfileMenuOpen(false)}
          onPointerEnter={() => setIsProfileMenuOpen(true)}
          onPointerLeave={() => setIsProfileMenuOpen(false)}
        >
          <Link
            aria-label="Open profile"
            className={`grid h-8 w-8 place-items-center rounded-full text-sm font-[650] text-white shadow-sm shadow-black/[0.08] ring-1 ring-black/[0.06] transition hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-zinc-300 ${profileColor}`}
            href="/profile"
            title={displayName}
          >
            {getProfileInitial(displayName)}
          </Link>
          {isProfileMenuOpen ? (
            <div className="absolute right-0 top-full z-30 w-44 pt-2">
              <div className="overflow-hidden rounded-xl border border-[#e9e8e3] bg-white py-1 shadow-xl shadow-black/[0.08] ring-1 ring-black/[0.03]">
                <button
                  className="flex h-10 w-full items-center gap-3 px-3 text-left text-sm font-[500] text-zinc-700 transition hover:bg-[#fafafa] hover:text-zinc-950"
                  type="button"
                >
                  <Settings className="h-4 w-4 text-zinc-400" />
                  Settings
                </button>
                <Link
                  className="flex h-10 w-full items-center gap-3 px-3 text-left text-sm font-[500] text-zinc-700 transition hover:bg-[#fafafa] hover:text-zinc-950"
                  href="/about"
                >
                  <Info className="h-4 w-4 text-zinc-400" />
                  About
                </Link>
                <div className="my-1 h-px bg-[#ecece7]" />
                <button
                  className="flex h-10 w-full items-center gap-3 px-3 text-left text-sm font-[500] text-red-500 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-70"
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
                  <LogOut className="h-4 w-4" />
                  {isSigningOut ? "Logging out" : "Logout"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
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

export function AuthButton({ showCreateLink = true }: AuthButtonProps) {
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

  return <PrivyAuthButton showCreateLink={showCreateLink} />;
}
