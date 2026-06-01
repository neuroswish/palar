import Image from "next/image";
import { Search, Sparkles } from "lucide-react";
import { AuthButton } from "@/components/auth-button";

type Agent = {
  name: string;
  description: string;
  price: string;
  category: string;
  accent: string;
  avatar: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
};

const agents: Agent[] = [
  {
    name: "Find new Kith sneakers",
    description: "Search stores across NYC for new Kith inventory",
    price: "$0.001/1k tokens",
    category: "Shopping",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/kith-app-icon.jpg",
    imageAlt: "Kith logo",
  },
  {
    name: "Cheapest Knicks tickets",
    description: "Instantly get the cheapest Knicks tickets for a particular section across all platforms",
    price: "$0.025/1k tokens",
    category: "Sports",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/knicks-facebook.jpg",
    imageAlt: "New York Knicks logo",
  },
  {
    name: "Sell my Watch",
    description: "List your watch or jewelry across all marketplaces and find the best offers",
    price: "$0.015/1k tokens",
    category: "Fashion",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/rolex-facebook.jpg",
    imageAlt: "Rolex logo",
  },
  {
    name: "Design Review",
    description: "Professional design feedback and implementation for your website or deck",
    price: "$0.02/1k tokens",
    category: "Design",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "👀",
  },
  {
    name: "Fantasy Football Betting Pool",
    description: "Create a secure portal for your friends to put money and bet on fantasy football",
    price: "$0.02/1k tokens",
    category: "Fun & Games",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/nfl-facebook.jpg",
    imageAlt: "NFL logo",
  },
  {
    name: "Election Campaign Setup",
    description: "Create assets, a marketing plan, and a website for your election campaign",
    price: "$0.03/1k tokens",
    category: "Politics",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/presidential-seal.svg",
    imageAlt: "Presidential Seal",
  },
  {
    name: "Find Customers",
    description: "Lead gen for your highest leverage spenders",
    price: "$0.04/1k tokens",
    category: "Enterprise",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🎯",
  },
];

function AgentAvatar({
  accent,
  avatar,
  image,
  imageAlt,
  emoji,
}: {
  accent: string;
  avatar: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
}) {
  return (
    <div
      className={`relative flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[#ecece7] bg-gradient-to-br ${accent}`}
    >
      {avatar === "image" && image ? (
        <Image className="object-contain" src={image} alt={imageAlt ?? ""} fill sizes="38px" />
      ) : null}
      {avatar === "emoji" && emoji ? <span className="text-xl leading-none">{emoji}</span> : null}
      {avatar === "dot" ? <span className="h-5 w-5 rounded-full bg-[#090b18]" /> : null}
      {avatar === "burst" ? (
        <>
          <span className="absolute h-[38px] w-[38px] rounded-full border border-white/70" />
          <span className="absolute h-7 w-7 rounded-full border border-cyan-100/80" />
          <Sparkles className="h-4 w-4 text-white" strokeWidth={1.6} />
        </>
      ) : null}
      {avatar === "wisp" ? <span className="text-sm font-semibold text-zinc-400">∞</span> : null}
      {avatar === "sun" ? (
        <span className="h-5 w-5 rounded-full border-4 border-amber-300 bg-zinc-950 shadow-[0_0_0_2px_rgba(250,204,21,0.25)]" />
      ) : null}
      {avatar === "portrait" ? (
        <span className="grid h-7 w-7 place-items-center rounded bg-zinc-100 text-xs font-bold text-zinc-900">
          P
        </span>
      ) : null}
      {avatar === "tiny" ? (
        <span className="grid h-6 w-6 place-items-center rounded-sm bg-zinc-900 text-[9px] font-bold text-white">
          JB
        </span>
      ) : null}
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <button className="group/card relative flex h-full min-h-[180px] w-full flex-col justify-between overflow-hidden rounded-xl border border-[#e9e8e3] bg-white pt-3 text-left shadow-md shadow-black/[0.04] transition hover:-translate-y-px hover:border-[#deddd7] hover:shadow-md hover:shadow-black/[0.08]">
      <div className="relative flex w-full items-start gap-2 px-3">
        <AgentAvatar
          accent={agent.accent}
          avatar={agent.avatar}
          image={agent.image}
          imageAlt={agent.imageAlt}
          emoji={agent.emoji}
        />
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="flex min-h-[38px] min-w-0 flex-1 flex-col justify-center">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="line-clamp-2 text-[15px] font-[600] leading-[18px] text-zinc-950">
                {agent.name}
              </h3>
              {agent.badge ? (
                <span className="shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  {agent.badge}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <p className="px-3 pt-4 text-sm font-[440] leading-5 text-zinc-500">{agent.description}</p>

      <div className="mt-auto flex items-end justify-between gap-3 px-3 pb-3 pt-5">
        <p className="text-sm font-[440] text-zinc-500">{agent.price}</p>
        <p className="text-xs font-[500] text-zinc-400">{agent.category}</p>
      </div>
    </button>
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
            {agents.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
