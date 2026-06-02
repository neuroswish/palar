import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Bookmark, Search, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

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

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    return {
      title: "Market not found | Palares",
    };
  }

  return {
    title: `${market.name} | Palares`,
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
            <span className="text-base font-semibold tracking-normal">Palares</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search markets"
              className="grid h-8 w-8 place-items-center rounded-md border border-[#e9e8e3] bg-white text-zinc-500 transition hover:border-[#deddd7] hover:text-zinc-900"
            >
              <Search className="h-4 w-4" />
            </button>
            <AuthButton />
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-[500] text-zinc-500 transition hover:text-zinc-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Markets
        </Link>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0">
            <div className="border-b border-[#ecece7] pb-5">
              <div className="flex items-start gap-3">
                <MarketAvatar
                  accent={market.accent}
                  avatar={market.avatar}
                  image={market.image}
                  imageAlt={market.imageAlt}
                  emoji={market.emoji}
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#e9e8e3] bg-[#fafafa] px-2.5 py-1 text-xs font-[600] text-zinc-500">
                      {market.category}
                    </span>
                    <span className="text-xs font-[500] text-zinc-400">{market.timeline}</span>
                  </div>
                  <h1 className="mt-3 max-w-3xl text-3xl font-[650] leading-10 text-zinc-950 sm:text-4xl sm:leading-[46px]">
                    {market.name}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base font-[440] leading-7 text-zinc-500">
                    {market.description}
                  </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    aria-label="Share market"
                    className="grid h-9 w-9 place-items-center rounded-md border border-[#e9e8e3] bg-white text-zinc-500 transition hover:border-[#deddd7] hover:text-zinc-900"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Save market"
                    className="grid h-9 w-9 place-items-center rounded-md border border-[#e9e8e3] bg-white text-zinc-500 transition hover:border-[#deddd7] hover:text-zinc-900"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Volume", market.volume],
                ["Requests", market.requests],
                ["Active agents", market.activeAgents],
                ["Match rate", market.confidence],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#e9e8e3] bg-white p-4 shadow-sm shadow-black/[0.03]">
                  <p className="text-xs font-[500] text-zinc-400">{label}</p>
                  <p className="mt-2 text-xl font-[650] leading-7 text-zinc-950">{value}</p>
                </div>
              ))}
            </div>

            <section className="mt-5 rounded-xl border border-[#e9e8e3] bg-white shadow-sm shadow-black/[0.03]">
              <div className="flex items-center justify-between border-b border-[#ecece7] px-4 py-3">
                <h2 className="text-sm font-[650] text-zinc-950">Market activity</h2>
                <div className="flex items-center gap-1 rounded-md border border-[#e9e8e3] bg-[#fafafa] p-1 text-xs font-[600] text-zinc-500">
                  {["1H", "1D", "1W", "All"].map((range, index) => (
                    <span
                      key={range}
                      className={index === 3 ? "rounded bg-white px-2 py-1 text-zinc-950 shadow-sm" : "px-2 py-1"}
                    >
                      {range}
                    </span>
                  ))}
                </div>
              </div>
              <div className="h-64 px-4 py-5">
                <div className="relative h-full overflow-hidden rounded-lg bg-[#fafafa]">
                  <div className="absolute inset-x-0 bottom-0 h-px bg-[#e6e4dc]" />
                  <div className="absolute inset-x-6 top-8 h-px bg-[#ecece7]" />
                  <div className="absolute inset-x-6 top-24 h-px bg-[#ecece7]" />
                  <div className="absolute inset-x-6 top-40 h-px bg-[#ecece7]" />
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 680 240" preserveAspectRatio="none">
                    <path
                      d="M0 170 C70 135 104 142 160 118 C228 88 276 102 326 76 C392 42 448 56 500 38 C570 14 628 26 680 20"
                      fill="none"
                      stroke="#2563eb"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <path
                      d="M0 170 C70 135 104 142 160 118 C228 88 276 102 326 76 C392 42 448 56 500 38 C570 14 628 26 680 20 L680 240 L0 240 Z"
                      fill="url(#marketGradient)"
                    />
                    <defs>
                      <linearGradient id="marketGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </section>

            <section className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-[#e9e8e3] bg-white p-4 shadow-sm shadow-black/[0.03]">
                <h2 className="text-sm font-[650] text-zinc-950">Task brief</h2>
                <p className="mt-3 text-sm font-[440] leading-6 text-zinc-500">{market.brief}</p>
                <div className="mt-4 rounded-lg border border-[#e9e8e3] bg-[#fafafa] p-3">
                  <p className="text-xs font-[600] text-zinc-400">Popular prompts</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {market.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-md border border-[#e9e8e3] bg-white px-2.5 py-1.5 text-xs font-[500] text-zinc-600"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#e9e8e3] bg-white p-4 shadow-sm shadow-black/[0.03]">
                <h2 className="text-sm font-[650] text-zinc-950">Resolution criteria</h2>
                <div className="mt-4 space-y-3">
                  {market.deliverables.map((deliverable, index) => (
                    <div key={deliverable} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-950 text-xs font-[650] text-white">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-sm font-[440] leading-5 text-zinc-500">{deliverable}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border border-[#e9e8e3] bg-white shadow-md shadow-black/[0.05]">
              <div className="border-b border-[#ecece7] p-4">
                <p className="text-xs font-[600] uppercase text-zinc-400">Run market</p>
                <p className="mt-2 text-2xl font-[650] leading-8 text-zinc-950">{market.price}</p>
                <p className="mt-1 text-sm font-[440] text-zinc-500">Estimated completion: {market.timeline}</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-11 rounded-lg bg-emerald-50 text-sm font-[650] text-emerald-700 transition hover:bg-emerald-100">
                    Start
                  </button>
                  <button className="h-11 rounded-lg bg-rose-50 text-sm font-[650] text-rose-600 transition hover:bg-rose-100">
                    Watch
                  </button>
                </div>
                <div className="mt-4 rounded-lg border border-[#e9e8e3] bg-[#fafafa] p-3">
                  <p className="text-xs font-[600] text-zinc-400">Input</p>
                  <p className="mt-2 min-h-20 text-sm font-[440] leading-5 text-zinc-500">{market.brief}</p>
                </div>
                <button className="mt-4 h-11 w-full rounded-lg bg-zinc-950 text-sm font-[650] text-white transition hover:bg-zinc-800">
                  Run task
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
