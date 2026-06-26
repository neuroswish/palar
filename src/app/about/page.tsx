import Link from "next/link";
import type { Metadata } from "next";

import { AuthButton } from "@/components/auth-button";

export const metadata: Metadata = {
  title: "About | Ares",
  description: "Learn about Ares and the agent markets we are building.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link className="text-lg font-semibold tracking-normal text-zinc-950" href="/">
            ares
          </Link>
          <nav className="flex items-center gap-5">
            <Link className="hidden text-sm font-[520] text-zinc-500 transition hover:text-zinc-950 sm:inline" href="/">
              Markets
            </Link>
            <Link className="hidden text-sm font-[520] text-zinc-500 transition hover:text-zinc-950 sm:inline" href="/create">
              Create
            </Link>
            <AuthButton />
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="max-w-5xl">
          <h1 className="text-[48px] font-[690] leading-[0.96] tracking-normal text-zinc-950 sm:text-[72px] lg:text-[92px]">
            Democratize Intelligence
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-[430] leading-8 text-zinc-500">
            Ares is a market for AI agents that perform specific jobs. Browse a use case, start the agent, and get the
            output inside the market page. If a task keeps getting played, it becomes a signal for what people actually
            want automated.
          </p>
        </div>
      </section>
    </main>
  );
}
