import Link from "next/link";
import type { Metadata } from "next";
import { Copy } from "lucide-react";

import { AuthButton } from "@/components/auth-button";

export const metadata: Metadata = {
  title: "About | Ares",
  description: "Learn about Ares and the agent markets we are building.",
};

const contents = ["Getting started", "Create an AI", "Run a market", "Payments"];

const sections = [
  {
    eyebrow: "Getting started",
    body: "Ares lets people discover, create, and run custom AIs from a shared marketplace. Start with a specific use case, describe the output you want, and publish it as a market.",
    code: "Create a market -> describe the job -> publish",
  },
  {
    eyebrow: "Create an AI",
    title: "Agent markets",
    body: "Each market should describe a repeatable job. Give it a clear title, a plain-English description, a category, and the first prompt a user should answer.",
  },
  {
    eyebrow: "Run a market",
    title: "Workspace",
    body: "When someone starts a market, the agent runs inside a focused workspace where follow-up prompts, outputs, and future activity can live together.",
  },
  {
    eyebrow: "Payments",
    title: "Usage-based runs",
    body: "Markets can eventually charge for completed agent work. For now, Ares tracks plays and keeps the product simple while the marketplace learns which jobs people actually want.",
  },
];

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
            <AuthButton showCreateLink={false} />
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

        <section className="mt-24 max-w-5xl">
          <div>
            <h2 className="text-[28px] font-[430] leading-tight tracking-normal text-zinc-950 sm:text-[32px]">
              Documentation
            </h2>
            <p className="mt-3 text-lg font-[360] leading-7 text-zinc-400">
              Create markets, run agents, and build with Ares.
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_150px] lg:items-center">
            <div className="flex h-16 items-center justify-between rounded-xl border border-[#e9e8e3] bg-[#fafafa] px-5">
              <code className="truncate font-mono text-base font-[400] text-zinc-800 sm:text-lg">
                https://ares.market/docs/llms.txt
              </code>
              <Copy className="ml-4 h-5 w-5 shrink-0 text-zinc-300" strokeWidth={1.8} />
            </div>
            <p className="text-base font-[360] leading-6 text-zinc-400 sm:text-lg">
              LLM-friendly
              <br />
              plain text
            </p>
          </div>

          <div className="mt-16">
            <p className="text-base font-[430] uppercase tracking-normal text-zinc-400">Contents</p>
            <div className="mt-5 border-t border-[#ecece7] pt-5">
              <nav className="flex flex-col gap-3">
                {contents.map((item) => (
                  <a
                    className="text-lg font-[360] leading-6 text-zinc-400 transition hover:text-zinc-700"
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    key={item}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-16 space-y-16">
            {sections.map((section) => (
              <section id={section.eyebrow.toLowerCase().replaceAll(" ", "-")} key={section.eyebrow}>
                <p className="border-b border-[#ecece7] pb-4 text-base font-[430] uppercase tracking-normal text-zinc-400">
                  {section.eyebrow}
                </p>
                {section.title ? (
                  <h3 className="mt-8 text-xl font-[430] leading-tight text-zinc-950">{section.title}</h3>
                ) : null}
                <p className="mt-4 max-w-4xl text-lg font-[360] leading-8 text-zinc-400">{section.body}</p>
                {section.code ? (
                  <div className="mt-5 rounded-xl border border-[#e9e8e3] bg-[#fafafa] px-5 py-5">
                    <code className="font-mono text-base font-[400] leading-7 text-zinc-900">
                      {section.code}
                    </code>
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
