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

      <section className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
        <div className="max-w-none">
          <h1 className="max-w-[1220px] text-[38px] font-[300] leading-[1.12] tracking-normal text-zinc-950 sm:text-[50px] lg:text-[62px]">
            Ares is a marketplace to <span className="whitespace-nowrap">democratize superintelligence.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg font-[430] leading-8 text-zinc-500">
            Ares is an AI marketplace. Create your own custom AIs and share them with the world.
          </p>
        </div>
      </section>
    </main>
  );
}
