"use client";

import { useEffect, useState } from "react";

type SessionUser = {
  email: string;
  name: string;
  picture?: string;
};

type SessionResponse = {
  user: SessionUser | null;
};

function getInitial(user: SessionUser) {
  return (user.name || user.email).trim().charAt(0).toUpperCase();
}

export function AuthButton() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/auth/session")
      .then((response) => response.json() as Promise<SessionResponse>)
      .then((session) => {
        if (isMounted) {
          setUser(session.user);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (user) {
    return (
      <button
        className="flex h-8 items-center gap-2 rounded-md border border-[#e9e8e3] bg-white px-2 text-sm font-medium text-zinc-700 transition hover:border-[#deddd7] hover:text-zinc-950"
        onClick={async () => {
          await fetch("/api/auth/signout", { method: "POST" });
          setUser(null);
        }}
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-700">
          {getInitial(user)}
        </span>
        <span className="hidden max-w-28 truncate sm:inline">{user.name || user.email}</span>
        <span>Sign out</span>
      </button>
    );
  }

  return (
    <button
      className="h-8 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
      disabled={isLoading}
      onClick={() => {
        window.location.href = "/api/auth/google/start";
      }}
    >
      Sign in
    </button>
  );
}
