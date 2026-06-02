import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
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

      <section className="mx-auto w-full max-w-2xl px-4 pb-20 pt-24 sm:px-6">
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
            <h1 className="text-3xl font-[650] leading-10 text-zinc-950">{market.name}</h1>
            <p className="mt-2 text-base font-[440] leading-7 text-zinc-500">{market.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-[500] text-zinc-500">
              <span>{market.price}</span>
              <span className="text-zinc-300">·</span>
              <span>{market.category.toLowerCase()}</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button className="h-11 w-full rounded-lg bg-zinc-950 px-8 text-sm font-[650] text-white transition hover:bg-zinc-800">
            Start
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-lg border border-[#e9e8e3] bg-white sm:grid-cols-4">
          {[
            [market.volume, "Total earned"],
            [market.requests, "Requests"],
            [market.activeAgents, "Active agents"],
            [market.price.replace("/1k tokens", ""), "Avg $/req"],
          ].map(([value, label]) => (
            <div key={label} className="border-b border-r border-[#ecece7] px-4 py-3 last:border-r-0 sm:border-b-0">
              <p className="text-lg font-[650] leading-7 text-zinc-950">{value}</p>
              <p className="text-xs font-[500] text-zinc-400">{label}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-base font-[440] leading-7 text-zinc-500">{market.brief}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[market.category, ...market.examples].map((tag) => (
            <span key={tag} className="rounded-full bg-[#fafafa] px-2.5 py-1 text-xs font-[600] text-zinc-500">
              {tag.toLowerCase()}
            </span>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-[650] leading-7 text-zinc-950">Deliverables</h2>
          <ul className="mt-4 space-y-2">
            {market.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex gap-3 text-sm font-[440] leading-6 text-zinc-500">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                {deliverable}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-[650] leading-7 text-zinc-950">Example prompts</h2>
          <ul className="mt-4 space-y-2">
            {market.examples.map((example) => (
              <li key={example} className="flex gap-3 text-sm font-[440] leading-6 text-zinc-500">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                {example}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="overflow-hidden rounded-lg border border-[#e9e8e3]">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#fafafa] text-xs font-[600] text-zinc-400">
                <tr>
                  <th className="px-3 py-2">Tokens</th>
                  <th className="px-3 py-2">Cost</th>
                  <th className="px-3 py-2">Latency</th>
                  <th className="px-3 py-2">Tx</th>
                  <th className="px-3 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-8 text-center text-zinc-400" colSpan={5}>
                    No transactions yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
