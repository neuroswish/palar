"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { MarketAvatar } from "@/components/market-avatar";
import { markets, type Market } from "@/lib/markets";

const categories = ["All", ...Array.from(new Set(markets.map((market) => market.category)))];

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
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <label className="relative block">
          <span className="sr-only">Search markets</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
          <input
            className="h-13 w-full rounded-xl border border-transparent bg-[#f5f5f5] px-12 text-base font-[440] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#deddd7] focus:bg-white focus:shadow-md focus:shadow-black/[0.04]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search markets..."
            type="search"
            value={query}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-lg font-[440] text-zinc-300 sm:block">
            /
          </span>
        </label>
      </div>

      <div className="-mx-4 mt-6 overflow-x-auto border-y border-[#ecece7] px-4 py-3 sm:-mx-6 sm:px-6">
        <div className="flex min-w-max items-center gap-2">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                className={`h-9 rounded-lg px-4 text-sm font-[600] transition ${
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

      <div className="mt-6 grid h-auto grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMarkets.map((market) => (
          <MarketCard key={market.name} market={market} />
        ))}
      </div>

      {filteredMarkets.length === 0 ? (
        <div className="mt-16 text-center text-sm font-[500] text-zinc-400">No markets found</div>
      ) : null}
    </section>
  );
}
