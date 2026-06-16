"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AuthButton } from "@/components/auth-button";
import { MarketAvatar } from "@/components/market-avatar";
import { markets, type Market } from "@/lib/markets";

const marketCategories = Array.from(new Set(markets.map((market) => market.category)));
const testCategories = [
  "Travel",
  "Food",
  "Concerts",
  "Crypto",
  "Dating",
  "Jobs",
  "Real Estate",
  "Local",
  "AI",
  "Tickets",
  "Collectibles",
  "Wellness",
];
const categories = ["All", ...marketCategories, ...testCategories];

function MarketCard({ market }: { market: Market }) {
  return (
    <Link
      href={`/market/${market.slug}`}
      className="group/card relative flex h-full min-h-[180px] w-full flex-col justify-between overflow-hidden rounded-xl border border-[#e9e8e3] bg-white pt-3 text-left shadow-md shadow-black/[0.04] transition hover:-translate-y-px hover:border-[#deddd7] hover:shadow-md hover:shadow-black/[0.08]"
    >
      <div className="relative flex w-full items-start gap-2 px-3">
        <MarketAvatar
          accent={market.accent}
          avatar={market.avatar}
          image={market.image}
          imageAlt={market.imageAlt}
          emoji={market.emoji}
        />
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="flex min-h-[38px] min-w-0 flex-1 flex-col justify-center">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="line-clamp-2 text-[15px] font-[600] leading-[18px] text-zinc-950">
                {market.name}
              </h3>
              {market.badge ? (
                <span className="shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  {market.badge}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <p className="px-3 pt-4 text-sm font-[440] leading-5 text-zinc-500">{market.description}</p>

      <div className="mt-auto flex items-end justify-between gap-3 px-3 pb-3 pt-5">
        <p className="text-xs font-[500] text-zinc-400">{market.users}</p>
        <p className="text-xs font-[500] text-zinc-400">{market.category}</p>
      </div>
    </Link>
  );
}

function MarketSearch({
  className = "",
  query,
  setQuery,
}: {
  className?: string;
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">Search markets</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
      <input
        className="h-[44px] w-full rounded-xl border border-transparent bg-[#f5f5f5] px-12 text-base font-[440] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#deddd7] focus:bg-white focus:shadow-md focus:shadow-black/[0.04]"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search markets..."
        type="search"
        value={query}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-lg font-[440] text-zinc-300 sm:block">
        /
      </span>
    </label>
  );
}

export function MarketBrowser() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredMarkets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return markets.filter((market) => {
      const categoryMatches = activeCategory === "All" || market.category === activeCategory;
      const queryMatches =
        !normalizedQuery ||
        [market.name, market.description, market.category].some((value) => value.toLowerCase().includes(normalizedQuery));

      return categoryMatches && queryMatches;
    });
  }, [activeCategory, query]);

  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-5">
            <Link className="flex shrink-0 items-center gap-2" href="/">
              <div className="grid h-8 w-8 place-items-center rounded-md border border-[#e9e8e3] bg-white">
                <span className="text-lg leading-none" aria-hidden="true">
                  🧠
                </span>
              </div>
              <span className="text-base font-semibold tracking-normal">Ares</span>
            </Link>
            <MarketSearch className="hidden w-full max-w-[620px] md:block" query={query} setQuery={setQuery} />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <AuthButton />
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-3 md:hidden">
          <MarketSearch query={query} setQuery={setQuery} />
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-[112px] sm:px-6 md:pt-16">
        <div className="relative -mx-4 border-b border-[#ecece7] sm:-mx-6">
          <div className="overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-1">
              {categories.map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    className={`h-9 rounded-lg px-3 text-sm font-[600] transition ${
                      isActive
                        ? "bg-[#eef1ff] text-[#3157e8]"
                        : "text-zinc-500 hover:bg-[#fafafa] hover:text-zinc-900"
                    }`}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent" />
        </div>

        <div className="mt-6 grid h-auto grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.name} market={market} />
          ))}
        </div>

        {filteredMarkets.length === 0 ? (
          <div className="mt-16 text-center text-sm font-[500] text-zinc-400">No markets found</div>
        ) : null}
      </section>
    </main>
  );
}
