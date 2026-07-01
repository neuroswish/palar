"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Plus } from "lucide-react";

import { AuthButton } from "@/components/auth-button";
import { isPrivyConfigured } from "@/components/app-providers";
import { PrimaryNav } from "@/components/primary-nav";

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
          <PrimaryNav active="create" />
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
          Log in to create an AI market on ares.
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
          Privy is not configured yet. Add `NEXT_PUBLIC_PRIVY_APP_ID` to enable AI market creation.
        </p>
      </section>
    </main>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <span className="text-sm font-[620] text-zinc-950">{children}</span>;
}

function CreateForm() {
  const router = useRouter();
  const { getAccessToken, user } = usePrivy();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [price, setPrice] = useState("");
  const [brief, setBrief] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        throw new Error("You need to be signed in to create a market.");
      }

      const response = await fetch("/api/markets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category,
          price,
          brief,
          creatorEmail: user?.email?.address,
        }),
      });
      const result = (await response.json()) as { slug?: string; error?: string };

      if (!response.ok || !result.slug) {
        throw new Error(result.error ?? "Unable to create market.");
      }

      router.push(`/market/${result.slug}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to create market.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <CreateHeader />
      <section className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[34px] font-[680] leading-[1.08] tracking-normal text-zinc-950 sm:text-[42px]">
            Create your AI
          </h1>
          <p className="mt-4 max-w-xl text-base font-[440] leading-7 text-zinc-500">
            Define what the AI does, what inputs it needs, and what a good result should include. Published AIs become
            available to everyone immediately.
          </p>
        </div>

        <form
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#e6e8ee] bg-white p-4 shadow-[0_1px_2px_rgba(17,24,39,0.04)] sm:p-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
            <label className="block">
              <FieldLabel>AI title</FieldLabel>
              <input
                className="mt-2 h-11 w-full rounded-xl border border-[#e3e5eb] bg-white px-3 text-sm font-[440] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                maxLength={90}
                minLength={3}
                onChange={(event) => setName(event.target.value)}
                placeholder="Find limited edition sneakers"
                required
                type="text"
                value={name}
              />
            </label>

            <label className="block">
              <FieldLabel>Description</FieldLabel>
              <textarea
                className="mt-2 min-h-24 w-full resize-none rounded-xl border border-[#e3e5eb] bg-white px-3 py-3 text-sm font-[440] leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                maxLength={280}
                minLength={10}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the outcome a user should get from this AI."
                required
                value={description}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
              <label className="block">
                <FieldLabel>Category</FieldLabel>
                <select
                  className="mt-2 h-11 w-full rounded-xl border border-[#e3e5eb] bg-white px-3 text-sm font-[440] text-zinc-950 outline-none transition focus:border-zinc-400"
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}
                >
                  {categoryOptions.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <FieldLabel>Starting price</FieldLabel>
                <input
                  className="mt-2 h-11 w-full rounded-xl border border-[#e3e5eb] bg-white px-3 text-sm font-[440] text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="$5.00"
                  type="text"
                  value={price}
                />
              </label>
            </div>

            <label className="block">
              <FieldLabel>First prompt</FieldLabel>
              <textarea
                className="mt-2 min-h-28 w-full resize-none rounded-xl border border-[#e3e5eb] bg-white px-3 py-3 text-sm font-[440] leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                onChange={(event) => setBrief(event.target.value)}
                placeholder="What should this AI ask for when someone starts this market?"
                value={brief}
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
            <p className="text-xs font-[500] text-zinc-400">{error ?? "Publishes immediately"}</p>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-[560] text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-70"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Publishing..." : "Publish AI"}
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

export function CreateAiPage() {
  if (!isPrivyConfigured) {
    return <DisabledLoginRequired />;
  }

  return <AuthenticatedCreatePage />;
}
