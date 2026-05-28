import {
  Bookmark,
  Bot,
  ChevronRight,
  Gift,
  Repeat2,
  Search,
  Sparkles,
} from "lucide-react";

const topics = [
  "All",
  "Research",
  "Code",
  "Design",
  "Automation",
  "Personas",
  "Private",
  "Enterprise",
  "OpenAI",
];

const markets = [
  {
    title: "Launch wallet-enabled onboarding by Friday?",
    avatar: "dot",
    accent: "from-[#ff8d77] to-[#ff6f5f]",
    rows: [
      { label: "Privy Agent", percent: "79%" },
      { label: "Wallet ops", percent: "57%" },
    ],
    volume: "$211K Vol.",
    status: "code",
    perk: true,
  },
  {
    title: "Should this workflow be automated?",
    avatar: "burst",
    accent: "from-[#54d2ff] via-[#6658ff] to-[#111827]",
    rows: [
      { label: "Strategy pass", percent: "51%" },
      { label: "Human review", percent: "49%" },
    ],
    volume: "$32K Vol.",
    status: "LIVE · productivity",
  },
  {
    title: "Design system audit for the next release?",
    avatar: "wisp",
    accent: "from-white to-zinc-50",
    rows: [
      { label: "Tokens", percent: "67%" },
      { label: "Components", percent: "34%" },
    ],
    volume: "$89K Vol.",
    status: "design",
    badge: "AT COST",
    perk: true,
  },
  {
    title: "Ship the prototype in one session?",
    avatar: "sun",
    accent: "from-white to-amber-50",
    rows: [
      { label: "jacob", percent: "97%" },
      { label: "Pair mode", percent: "4%" },
    ],
    volume: "$1M Vol.",
    status: "code",
  },
  {
    title: "Find the hidden assumption before launch?",
    avatar: "portrait",
    accent: "from-zinc-900 to-zinc-500",
    rows: [
      { label: "Prereq", percent: "61%" },
      { label: "Counterbrief", percent: "41%" },
    ],
    volume: "$353K Vol.",
    status: "analysis",
  },
  {
    title: "Turn messy notes into campaign copy?",
    avatar: "tiny",
    accent: "from-cyan-100 to-lime-100",
    rows: [
      { label: "Jack style", percent: "57%" },
      { label: "Plain edit", percent: "28%" },
    ],
    volume: "$401K Vol.",
    status: "persona",
    perk: true,
  },
];

function MarketAvatar({
  accent,
  avatar,
}: {
  accent: string;
  avatar: string;
}) {
  return (
    <div
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-gradient-to-br ${accent}`}
    >
      {avatar === "dot" ? <span className="h-5 w-5 rounded-full bg-[#090b18]" /> : null}
      {avatar === "burst" ? (
        <>
          <span className="absolute h-11 w-11 rounded-full border border-white/70" />
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

function MarketCard({ market }: { market: (typeof markets)[number] }) {
  return (
    <button className="flex min-h-[184px] w-full flex-col rounded-lg border border-zinc-200 bg-white p-4 text-left shadow-sm shadow-zinc-200/40 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/60">
      <div className="flex items-start gap-3">
        <MarketAvatar accent={market.accent} avatar={market.avatar} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="line-clamp-2 text-base font-semibold leading-6 text-zinc-950">{market.title}</h3>
            {market.badge ? (
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {market.badge}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {market.rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2">
            <span className="min-w-0 truncate text-base text-zinc-900">{row.label}</span>
            <span className="w-12 text-right text-base font-semibold text-zinc-950">{row.percent}</span>
            <span className="grid h-9 w-14 place-items-center rounded-md bg-emerald-50 text-sm font-semibold text-emerald-600">
              Yes
            </span>
            <span className="grid h-9 w-14 place-items-center rounded-md bg-rose-50 text-sm font-semibold text-rose-500">
              No
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-medium text-zinc-500">
        <div className="flex min-w-0 items-center gap-2">
          {market.status.includes("LIVE") ? (
            <span className="flex items-center gap-1 font-semibold text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              LIVE
            </span>
          ) : null}
          <span className="truncate">{market.volume}</span>
          <span className="text-zinc-300">·</span>
          <span className="truncate">{market.status.replace("LIVE · ", "")}</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          {market.perk ? <Gift className="h-4 w-4" /> : <Repeat2 className="h-4 w-4" />}
          <Bookmark className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 border-b border-transparent bg-[#fafafa]/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md border border-zinc-200 bg-white">
              <Bot className="h-4 w-4 text-zinc-700" />
            </div>
            <span className="text-sm font-semibold tracking-normal">palar</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Search markets"
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

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6">
        <div className="max-w-xl">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">The Intelligence Market</h1>
          <p className="mt-1 text-sm leading-6 text-zinc-500">AI for anything and everything</p>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base font-semibold leading-6 text-zinc-900">Markets</h2>
            <button
              aria-label="View more market topics"
              className="grid h-8 w-8 place-items-center rounded-md text-zinc-500 transition hover:bg-white hover:text-zinc-900"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
            <div className="flex min-w-max items-center gap-3">
              {topics.map((topic, index) => (
                <button
                  key={topic}
                  className={`h-10 rounded-lg px-4 text-base font-semibold transition ${
                    index === 0
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-zinc-500 hover:bg-white hover:text-zinc-900"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {markets.map((market) => (
              <MarketCard key={market.title} market={market} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
