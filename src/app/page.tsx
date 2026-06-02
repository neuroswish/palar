import Link from "next/link";
import { Search } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { MarketAvatar } from "@/components/market-avatar";
import { markets, type Market } from "@/lib/markets";

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
        <p className="text-sm font-[440] text-zinc-500">{market.price}</p>
        <p className="text-xs font-[500] text-zinc-400">{market.category}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 border-b border-transparent bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md border border-[#e9e8e3] bg-white">
              <span className="text-lg leading-none" aria-hidden="true">🧠</span>
            </div>
            <span className="text-base font-semibold tracking-normal">Palares</span>
          </div>
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
        <div className="mx-auto max-w-2xl py-8 text-center sm:py-10">
          <h1 className="text-3xl font-[600] leading-10 text-zinc-900 sm:text-4xl sm:leading-[44px]">
            The Intelligence Market
          </h1>
          <p className="mt-3 text-lg font-[440] leading-7 text-zinc-500">AI for anything and everything</p>
        </div>

        <section className="mt-14">
          <h2 className="text-base font-semibold leading-6 text-zinc-900">Markets</h2>
          <div className="mt-4 grid h-auto grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {markets.map((market) => (
              <MarketCard key={market.name} market={market} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
