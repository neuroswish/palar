import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Paperclip, Send } from "lucide-react";

import { AuthButton } from "@/components/auth-button";
import { MarketAvatar } from "@/components/market-avatar";
import { getMarketBySlug, markets } from "@/lib/markets";

type MarketPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return markets.map((market) => ({
    slug: market.slug,
  }));
}

const commentPreviews = [
  {
    author: "maya",
    text: "Would be useful if this could remember my preferences after the first run.",
    time: "2m",
  },
  {
    author: "rk",
    text: "I like this as a quick agent, especially if the output includes links and a confidence score.",
    time: "18m",
  },
  {
    author: "sam",
    text: "Would pay for this if it can compare the top options without making me open six tabs.",
    time: "1h",
  },
];

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    return {
      title: "Market not found | Ares",
    };
  }

  return {
    title: `${market.name} | Ares`,
    description: market.description,
  };
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 border-b border-transparent bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link className="flex items-center gap-2" href="/">
            <div className="grid h-8 w-8 place-items-center rounded-md border border-[#e9e8e3] bg-white">
              <span className="text-lg leading-none" aria-hidden="true">
                🧠
              </span>
            </div>
            <span className="text-base font-semibold tracking-normal">Ares</span>
          </Link>
          <div className="flex items-center gap-2">
            <AuthButton />
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6">
        <div className="max-w-4xl">
          <div className="flex items-start gap-4 sm:gap-5">
            <MarketAvatar
              accent={market.accent}
              avatar={market.avatar}
              image={market.image}
              imageAlt={market.imageAlt}
              emoji={market.emoji}
              size="lg"
            />
            <div className="flex min-h-16 min-w-0 flex-1 flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-base font-[500] leading-6 text-zinc-500">
                <span>{market.users}</span>
                <span className="text-zinc-300">·</span>
                <span>{market.category}</span>
              </div>
              <h1 className="mt-1 text-[34px] font-[680] leading-[1.08] tracking-normal text-zinc-950 sm:text-[44px]">
                {market.name}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base font-[440] leading-7 text-zinc-500 sm:text-lg">{market.description}</p>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-[#e2e7f4] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)]">
          <div className="border-b border-[#eef0f4] bg-[#fbfcff] px-5 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-[650] uppercase tracking-[0.08em] text-zinc-400">Agent workspace</p>
                <p className="mt-1 text-sm font-[500] text-zinc-500">{market.brief}</p>
              </div>
              <button className="h-10 rounded-lg bg-zinc-950 px-5 text-sm font-[650] text-white transition hover:bg-zinc-800">
                Start
              </button>
            </div>
          </div>

          <div className="grid min-h-[520px] grid-rows-[1fr_auto] bg-white">
            <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:px-8">
              <div className="max-w-2xl rounded-2xl border border-[#eef0f4] bg-[#fafafa] p-4">
                <p className="text-sm font-[650] text-zinc-950">Ares</p>
                <p className="mt-2 text-sm font-[440] leading-6 text-zinc-500">
                  Start this market and I will gather the right inputs, run the agent, and show the output here.
                </p>
              </div>

              <div className="ml-auto max-w-2xl rounded-2xl bg-zinc-950 p-4 text-white">
                <p className="text-sm font-[650]">You</p>
                <p className="mt-2 text-sm font-[440] leading-6 text-white/80">{market.examples[0]}</p>
              </div>

              <div className="max-w-3xl rounded-2xl border border-[#eef0f4] bg-white p-4 shadow-[0_1px_2px_rgba(17,24,39,0.03)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-[650] text-zinc-950">Draft output preview</p>
                  <span className="rounded-full bg-[#eef3ff] px-2.5 py-1 text-xs font-[650] text-[#5578e8]">
                    ready after start
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-sm font-[440] leading-6 text-zinc-500">
                  {market.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#eef0f4] bg-[#fbfcff] p-4 sm:p-5">
              <div className="flex items-end gap-3 rounded-xl border border-[#e7e9ef] bg-white p-2 shadow-[0_1px_2px_rgba(17,24,39,0.04)]">
                <button
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-[#fafafa] hover:text-zinc-700"
                  type="button"
                  aria-label="Attach context"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm font-[440] leading-6 text-zinc-700 outline-none placeholder:text-zinc-400"
                  placeholder={`Ask ${market.name} a follow-up...`}
                  rows={1}
                />
                <button
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-950 text-white transition hover:bg-zinc-800"
                  type="button"
                  aria-label="Send prompt"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between border-b border-[#ecece7] pb-3">
            <h2 className="text-xl font-[680] leading-8 text-zinc-950">Comments</h2>
            <span className="text-sm font-[500] text-zinc-400">Preview</span>
          </div>

          <div className="mt-5 rounded-xl border border-[#e9e8e3] bg-white p-3">
            <textarea
              className="min-h-20 w-full resize-none bg-transparent p-2 text-sm font-[440] leading-6 text-zinc-700 outline-none placeholder:text-zinc-400"
              placeholder="Share a thought or ask a question..."
            />
            <div className="mt-2 flex justify-end">
              <button className="h-9 rounded-lg bg-zinc-950 px-4 text-sm font-[650] text-white transition hover:bg-zinc-800">
                Comment
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            {commentPreviews.map((comment) => (
              <article key={comment.author} className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#d8dcff] via-[#b6e4d8] to-[#7b61ff] text-xs font-[700] text-white">
                  {comment.author[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-[650] text-zinc-950">{comment.author}</p>
                    <span className="text-xs font-[500] text-zinc-400">{comment.time}</span>
                  </div>
                  <p className="mt-1 text-sm font-[440] leading-6 text-zinc-500">{comment.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
