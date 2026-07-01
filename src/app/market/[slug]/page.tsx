import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUp, ImageIcon, Paperclip, Smile } from "lucide-react";

import { AuthButton } from "@/components/auth-button";
import { MarketAvatar } from "@/components/market-avatar";
import { MarketWorkspaceScroller } from "@/components/market-workspace-scroller";
import { getMarketBySlug, getMarketSlugs } from "@/lib/markets";

type MarketPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getMarketSlugs();

  return slugs.map((slug) => ({
    slug,
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
    text: "I like this as a quick AI, especially if the output includes links and a confidence score.",
    time: "18m",
  },
  {
    author: "sam",
    text: "Would pay for this if it can compare the top options without making me open six tabs.",
    time: "1h",
  },
  {
    author: "nina",
    text: "Would be cool if people could share the exact prompt that got a good result.",
    time: "2h",
  },
  {
    author: "eli",
    text: "I want this for limited merch drops too. Half the work is just knowing which store has inventory.",
    time: "3h",
  },
  {
    author: "ari",
    text: "If it can remember sizing preferences and brands, this becomes a really useful repeat-use AI.",
    time: "5h",
  },
  {
    author: "dev",
    text: "The local pickup angle is strong. I do not want another generic shopping search result.",
    time: "6h",
  },
  {
    author: "lee",
    text: "A confidence score would help a lot, especially when inventory APIs are stale.",
    time: "9h",
  },
  {
    author: "kim",
    text: "This would be useful around gift shopping too. Search is weirdly bad for in-store availability.",
    time: "12h",
  },
];

const dummyChatMessages = [
  {
    side: "ai",
    text: "I can check Kith Soho, Williamsburg, and nearby retailers that tend to carry Kith collaborations. Share your size and any colorways you care about.",
  },
  {
    side: "user",
    text: "Size 10.5 or 11. Mainly looking for ASICS, New Balance, or Adidas collabs.",
  },
  {
    side: "ai",
    text: "Got it. I would prioritize stores with same-day pickup first, then widen to online inventory with NYC delivery windows under 48 hours.",
  },
  {
    side: "user",
    text: "Budget is under $280 if possible. I can pick up in Manhattan after 5pm.",
  },
  {
    side: "ai",
    text: "I found three likely search paths: direct Kith product pages, nearby boutique inventory, and resale listings filtered for local pickup. Once started, I would return the strongest matches with links and pickup notes.",
  },
];

const personalTrainerChatMessages = [
  {
    side: "ai",
    text: "I can build a plan around your goal, schedule, equipment, training history, and any injuries. Tell me what you want to change first.",
  },
  {
    side: "user",
    text: "I want to gain muscle, train 4 days per week, and avoid aggravating my lower back.",
  },
  {
    side: "ai",
    text: "Got it. I would bias toward upper/lower strength days, controlled hinge volume, core stability work, and a simple protein target before adding extra complexity.",
  },
  {
    side: "user",
    text: "I have a full gym and about 60 minutes per session. I also want two short cardio days.",
  },
  {
    side: "ai",
    text: "Once started, I would return a weekly plan with exercise selection, sets, reps, progression targets, recovery notes, and nutrition habits matched to your goal.",
  },
];

function getChatMessages(market: { slug: string }) {
  return market.slug === "personal-trainer" ? personalTrainerChatMessages : dummyChatMessages;
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = await getMarketBySlug(slug);

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
  const market = await getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  const chatMessages = getChatMessages(market);

  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 border-b border-transparent bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link className="flex items-center gap-2" href="/">
            <span className="text-lg font-semibold tracking-normal">ares</span>
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
            <div className="flex min-h-20 min-w-0 flex-1 flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-base font-[500] leading-6 text-zinc-500">
                <span>{market.users}</span>
                <span className="text-zinc-300">·</span>
                <span>{market.category}</span>
              </div>
              <h1 className="mt-1 text-[34px] font-[680] leading-[1.08] tracking-normal text-zinc-950 sm:text-[40px]">
                {market.name}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base font-[440] leading-7 text-zinc-500 sm:text-lg">{market.description}</p>
        </div>

        <section className="mt-10 overflow-hidden rounded-[18px] border border-[#e2e7f4] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)]">
          <div className="relative min-h-[560px] bg-white">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-7 bg-gradient-to-b from-white via-white/75 to-transparent backdrop-blur-[1px]" />

            <MarketWorkspaceScroller className="absolute inset-0 flex flex-col gap-5 overflow-y-auto overscroll-y-contain px-5 pb-32 pt-8 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden">
              <div className="ml-1 max-w-2xl rounded-full border border-[#eef0f4] bg-[#fafafa] px-5 py-3">
                <p className="text-sm font-[440] leading-6 text-zinc-500">
                  Start this market and I will gather the right inputs, run the AI, and show the output here.
                </p>
              </div>

              <div className="ml-auto mr-1 max-w-2xl rounded-full bg-zinc-950 px-5 py-3 text-white">
                <p className="text-sm font-[440] leading-6 text-white/80">{market.examples[0]}</p>
              </div>

              {chatMessages.slice(0, 2).map((message) => (
                <div
                  className={
                    message.side === "user"
                      ? "ml-auto mr-1 max-w-2xl rounded-full bg-zinc-950 px-5 py-3 text-white"
                      : "ml-1 max-w-2xl rounded-full border border-[#eef0f4] bg-[#fafafa] px-5 py-3"
                  }
                  key={message.text}
                >
                  <p
                    className={
                      message.side === "user"
                        ? "text-sm font-[440] leading-6 text-white/80"
                        : "text-sm font-[440] leading-6 text-zinc-500"
                    }
                  >
                    {message.text}
                  </p>
                </div>
              ))}

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

              {chatMessages.slice(2).map((message) => (
                <div
                  className={
                    message.side === "user"
                      ? "ml-auto mr-1 max-w-2xl rounded-full bg-zinc-950 px-5 py-3 text-white"
                      : "ml-1 max-w-2xl rounded-full border border-[#eef0f4] bg-[#fafafa] px-5 py-3"
                  }
                  key={message.text}
                >
                  <p
                    className={
                      message.side === "user"
                        ? "text-sm font-[440] leading-6 text-white/80"
                        : "text-sm font-[440] leading-6 text-zinc-500"
                    }
                  >
                    {message.text}
                  </p>
                </div>
              ))}
            </MarketWorkspaceScroller>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
            <div className="absolute inset-x-5 bottom-4 z-30 sm:inset-x-6 lg:inset-x-8">
              <div className="flex items-end gap-3 rounded-full border border-[#e7e9ef] bg-white p-2 shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
                <button
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-400 transition hover:bg-[#fafafa] hover:text-zinc-700"
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
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-zinc-950 text-white transition hover:bg-zinc-800"
                  type="button"
                  aria-label="Send prompt"
                >
                  <ArrowUp className="h-5 w-5" strokeWidth={2.4} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xl font-[560] leading-8">
            <button className="text-zinc-950" type="button">
              Comments ({commentPreviews.length})
            </button>
            <button className="text-zinc-400 transition hover:text-zinc-700" type="button">
              Activity
            </button>
          </div>

          <div className="mt-6 flex h-14 items-center gap-3 rounded-full border border-[#e2e5eb] bg-white px-4 shadow-[0_1px_2px_rgba(17,24,39,0.03)]">
            <input
              className="min-w-0 flex-1 bg-transparent text-base font-[440] text-zinc-700 outline-none placeholder:text-zinc-400"
              placeholder="Add a comment..."
              type="text"
            />
            <button
              aria-label="Add emoji"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-[#fafafa] hover:text-zinc-800"
              type="button"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              aria-label="Attach image"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-[#fafafa] hover:text-zinc-800"
              type="button"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button className="h-10 shrink-0 rounded-xl bg-[#91a7ff] px-5 text-sm font-[680] text-white transition hover:bg-[#7f98ff]" type="button">
              Post
            </button>
          </div>

          <div className="mt-6 space-y-5">
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
