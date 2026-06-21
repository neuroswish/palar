"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { ArrowRight, Plus, Sparkles } from "lucide-react";

import { AuthButton } from "@/components/auth-button";
import { isPrivyConfigured } from "@/components/app-providers";

const categoryOptions = ["Shopping", "Sports", "Fashion", "Design", "Fun & Games", "Politics", "Enterprise"];
const suggestedTags = ["runs on demand", "human review", "USDC-ready", "public market"];

function CreateHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="text-lg font-semibold tracking-normal text-zinc-950" href="/">
          ares
        </Link>
        <div className="flex items-center gap-4">
          <Link className="hidden text-sm font-[520] text-zinc-500 transition hover:text-zinc-950 sm:inline" href="/">
            Markets
          </Link>
          <span className="hidden rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-[560] text-white sm:inline">
            Create
          </span>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

function LoginRequired() {
  const { login, ready } = usePrivy();

  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <CreateHeader />
      <section className="mx-auto flex min-h-screen w-full max-w-[36.375rem] flex-col items-center justify-center px-4 pb-16 pt-24 text-center">
        <p className="text-sm font-[460] leading-5 tracking-normal text-zinc-500">
          Log in to create an agent market on ares.
        </p>
        <button
          className="mt-4 h-9 rounded-md bg-zinc-950 px-5 text-sm font-[560] text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
          disabled={!ready}
          onClick={() => login({ loginMethods: ["email"] })}
          type="button"
        >
          Log in
        </button>
      </section>
    </main>
  );
}

function DisabledLoginRequired() {
  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <CreateHeader />
      <section className="mx-auto flex min-h-screen w-full max-w-[36.375rem] flex-col items-center justify-center px-4 pb-16 pt-24 text-center">
        <p className="text-sm font-[460] leading-5 tracking-normal text-zinc-500">
          Privy is not configured yet. Add `NEXT_PUBLIC_PRIVY_APP_ID` to enable agent market creation.
        </p>
      </section>
    </main>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <span className="text-sm font-[620] text-zinc-950">{children}</span>;
}

function CreateForm() {
  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <CreateHeader />
      <section className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-[520] text-zinc-500">
            <Sparkles className="h-4 w-4 text-zinc-400" />
            <span>List a new agent market</span>
          </div>
          <h1 className="mt-4 text-[34px] font-[680] leading-[1.08] tracking-normal text-zinc-950 sm:text-[42px]">
            Create a market people can hire.
          </h1>
          <p className="mt-4 max-w-xl text-base font-[440] leading-7 text-zinc-500">
            Define what the agent does, what inputs it needs, and what a good result should include. This is a draft UI for
            now; publishing will be wired up later.
          </p>
        </div>

        <form className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#e6e8ee] bg-white p-4 shadow-[0_1px_2px_rgba(17,24,39,0.04)] sm:p-5">
          <div className="space-y-5">
            <label className="block">
              <FieldLabel>Market title</FieldLabel>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-[#e3e5eb] bg-white px-3 text-sm font-[440] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                placeholder="Find limited edition sneakers"
                type="text"
              />
            </label>

            <label className="block">
              <FieldLabel>Description</FieldLabel>
              <textarea
                className="mt-2 min-h-24 w-full resize-none rounded-xl border border-[#e3e5eb] bg-white px-3 py-3 text-sm font-[440] leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                placeholder="Describe the outcome a user should get from this agent."
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
              <label className="block">
                <FieldLabel>Category</FieldLabel>
                <select className="mt-2 h-11 w-full rounded-xl border border-[#e3e5eb] bg-white px-3 text-sm font-[440] text-zinc-950 outline-none transition focus:border-zinc-400">
                  {categoryOptions.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <FieldLabel>Starting price</FieldLabel>
                <input
                  className="mt-2 h-11 w-full rounded-xl border border-[#e3e5eb] bg-white px-3 text-sm font-[440] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                  placeholder="$5.00"
                  type="text"
                />
              </label>
            </div>

            <label className="block">
              <FieldLabel>First prompt</FieldLabel>
              <textarea
                className="mt-2 min-h-28 w-full resize-none rounded-xl border border-[#e3e5eb] bg-white px-3 py-3 text-sm font-[440] leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                placeholder="What should the agent ask for when someone starts this market?"
              />
            </label>

            <div>
              <FieldLabel>Output requirements</FieldLabel>
              <div className="mt-2 rounded-xl border border-[#e3e5eb] bg-[#fafafa] p-3">
                {["Clear recommendation", "Source links or proof", "Next action for the user"].map((item) => (
                  <div className="flex items-center gap-2 border-b border-[#eceef3] py-2 last:border-b-0" key={item}>
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-zinc-300 text-xs text-zinc-400">
                      <Plus className="h-3 w-3" />
                    </span>
                    <span className="text-sm font-[440] text-zinc-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <span className="rounded-full bg-[#f4f5f7] px-3 py-1 text-xs font-[560] text-zinc-500" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#eceef3] pt-4">
            <p className="text-xs font-[500] text-zinc-400">Draft only</p>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-[560] text-white transition hover:bg-zinc-800"
              type="button"
            >
              Preview market
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function AuthenticatedCreatePage() {
  const { authenticated, ready } = usePrivy();

  if (!ready) {
    return (
      <main className="min-h-screen bg-white text-[#262626]">
        <CreateHeader />
        <section className="mx-auto flex min-h-screen w-full max-w-[36.375rem] flex-col items-center justify-center px-4 pb-16 pt-24 text-center">
          <p className="text-sm font-[460] leading-5 tracking-normal text-zinc-500">Checking your session...</p>
        </section>
      </main>
    );
  }

  return authenticated ? <CreateForm /> : <LoginRequired />;
}

export function CreateAgentPage() {
  if (!isPrivyConfigured) {
    return <DisabledLoginRequired />;
  }

  return <AuthenticatedCreatePage />;
}
