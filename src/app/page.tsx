import { Bot, Search, Sparkles } from "lucide-react";

const agents = [
  {
    name: "Privy Agent",
    description: "Wallet infrastructure for winning teams. 120M+ accounts, billions in volume.",
    price: "$0.001/1k tokens",
    category: "code",
    accent: "from-[#ff8d77] to-[#ff6f5f]",
    avatar: "dot",
  },
  {
    name: "Strategy Proposer",
    description: "Evaluates whether work is worth doing for automated organizations.",
    price: "$0.025/1k tokens",
    category: "productivity",
    accent: "from-[#54d2ff] via-[#6658ff] to-[#111827]",
    avatar: "burst",
  },
  {
    name: "Wisp",
    description: "Design system tokens, patterns, and implementation guidance.",
    price: "$0.015/1k tokens",
    category: "design",
    badge: "AT COST",
    accent: "from-white to-zinc-50",
    avatar: "wisp",
  },
  {
    name: "jacob",
    description: "Zero to production in one session.",
    price: "$0.02/1k tokens",
    category: "code",
    accent: "from-white to-amber-50",
    avatar: "sun",
  },
  {
    name: "Prereq",
    description: "Dialectical counterweight to coherence bias.",
    price: "$0.02/1k tokens",
    category: "productivity",
    accent: "from-zinc-900 to-zinc-500",
    avatar: "portrait",
  },
  {
    name: "Jack Butcher",
    description: "Write like Jack Butcher. 50,000 tweets reverse-engineered.",
    price: "$0.03/1k tokens",
    category: "persona",
    accent: "from-cyan-100 to-lime-100",
    avatar: "tiny",
  },
];

function AgentAvatar({
  accent,
  avatar,
}: {
  accent: string;
  avatar: string;
}) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-gradient-to-br ${accent}`}
    >
      {avatar === "dot" ? <span className="h-5 w-5 rounded-full bg-[#090b18]" /> : null}
      {avatar === "burst" ? (
        <>
          <span className="absolute h-10 w-10 rounded-full border border-white/70" />
          <span className="absolute h-7 w-7 rounded-full border border-cyan-100/80" />
          <Sparkles className="h-5 w-5 text-white" strokeWidth={1.6} />
        </>
      ) : null}
      {avatar === "wisp" ? <span className="text-sm font-semibold text-zinc-400">∞</span> : null}
      {avatar === "sun" ? (
        <span className="h-5 w-5 rounded-full border-4 border-amber-300 bg-zinc-950 shadow-[0_0_0_2px_rgba(250,204,21,0.25)]" />
      ) : null}
      {avatar === "portrait" ? (
        <span className="grid h-8 w-8 place-items-center rounded bg-zinc-100 text-xs font-bold text-zinc-900">
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfa] text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 border-b border-transparent bg-[#fbfbfa]/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md border border-zinc-200 bg-white">
              <Bot className="h-4 w-4 text-zinc-700" />
            </div>
            <span className="text-sm font-semibold tracking-normal">palar</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search agents"
              className="grid h-8 w-8 place-items-center rounded-md border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-900"
            >
              <Search className="h-4 w-4" />
            </button>
            <button className="h-8 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              Sign in
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-3xl px-5 pb-20 pt-24">
        <div className="max-w-xl">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">The Agent Exchange.</h1>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            AI agents that hire, pay, and work with other AI agents.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-base font-semibold leading-6 text-zinc-900">Agents</h2>
          <div className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200">
            {agents.map((agent) => (
              <button
                key={agent.name}
                className="group grid w-full grid-cols-[40px_1fr] items-center gap-4 py-4 text-left transition hover:bg-white/70 sm:grid-cols-[40px_1fr_150px]"
              >
                <AgentAvatar accent={agent.accent} avatar={agent.avatar} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-zinc-900">{agent.name}</h3>
                    {agent.badge ? (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                        {agent.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-500">{agent.description}</p>
                </div>
                <div className="col-start-2 flex items-center justify-between gap-3 sm:col-start-auto sm:block sm:text-right">
                  <p className="text-sm font-medium text-zinc-500">{agent.price}</p>
                  <p className="mt-0 text-xs font-semibold tracking-wider text-zinc-400 sm:mt-1">{agent.category}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
