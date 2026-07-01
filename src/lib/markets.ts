import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/types";

export type Market = {
  name: string;
  slug: string;
  description: string;
  price: string;
  users: string;
  category: string;
  accent: string;
  avatar: "image" | "emoji" | "dot" | "burst" | "wisp" | "sun" | "portrait" | "tiny";
  badge?: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
  volume: string;
  requests: string;
  activeAis: string;
  confidence: string;
  brief: string;
  timeline: string;
  examples: string[];
  deliverables: string[];
};

const seedMarkets: Market[] = [
  {
    name: "Hot Table Tonight",
    slug: "hot-table-tonight",
    description: "Score a table tonight at the best NYC restaurant you can actually get into",
    price: "$0.025/1k tokens",
    users: "18.4K uses",
    category: "Food",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🍽️",
    volume: "$842K",
    requests: "18,432",
    activeAis: "41",
    confidence: "93%",
    brief: "Tell us your party size, time window, neighborhood, budget, and how hard you want to flex.",
    timeline: "2-8 min",
    examples: ["2 people after 8 in Manhattan", "best birthday dinner tonight", "walk-in friendly but impressive"],
    deliverables: ["Ranked table options", "Reservation or walk-in strategy", "Backup picks with the same vibe"],
  },
  {
    name: "Fix My Dating Profile",
    slug: "fix-my-dating-profile",
    description: "Get a photo ranking, bio rewrite, and openers that sound like you",
    price: "$0.02/1k tokens",
    users: "22.7K uses",
    category: "Dating",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "💘",
    volume: "$1.1M",
    requests: "22,731",
    activeAis: "52",
    confidence: "95%",
    brief: "Upload your profile screenshots or paste your prompts, then tell us the kind of people you want to attract.",
    timeline: "3-6 min",
    examples: ["rank my photos", "make my Hinge less boring", "write 5 openers for my type"],
    deliverables: ["Photo order and cut list", "Profile rewrite", "Message openers and red flags to avoid"],
  },
  {
    name: "Who's Wrong?",
    slug: "whos-wrong",
    description: "Paste the argument and get a verdict, scorecard, and comeback options",
    price: "$0.015/1k tokens",
    users: "31.2K uses",
    category: "Social",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "⚖️",
    volume: "$1.4M",
    requests: "31,208",
    activeAis: "64",
    confidence: "92%",
    brief: "Paste the text fight, group chat, or situation and choose whether you want fair judge, best friend, or ruthless mode.",
    timeline: "1-2 min",
    examples: ["who's wrong in this breakup text", "settle this roommate fight", "write my response"],
    deliverables: ["Verdict and blame split", "Argument scorecard", "Best reply options"],
  },
  {
    name: "Last-Minute Date Plan",
    slug: "last-minute-date-plan",
    description: "Build a full plan for tonight around your budget, neighborhood, and vibe",
    price: "$0.02/1k tokens",
    users: "16.9K uses",
    category: "Dating",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🌙",
    volume: "$704K",
    requests: "16,941",
    activeAis: "37",
    confidence: "91%",
    brief: "Tell us where you are, when you can meet, budget, chemistry level, and whether this should feel casual or cinematic.",
    timeline: "3-7 min",
    examples: ["first date in West Village", "cheap but thoughtful tonight", "make this feel spontaneous"],
    deliverables: ["Step-by-step date plan", "Reservation and walk-in strategy", "Texts to send before and after"],
  },
  {
    name: "Outfit Check",
    slug: "outfit-check",
    description: "Upload a fit and get a score, fixes, and where you should wear it",
    price: "$0.015/1k tokens",
    users: "19.6K uses",
    category: "Style",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🪞",
    volume: "$812K",
    requests: "19,604",
    activeAis: "44",
    confidence: "94%",
    brief: "Upload the outfit, occasion, weather, and the impression you want to make.",
    timeline: "1-3 min",
    examples: ["date night fit check", "wedding guest outfit", "make this look less basic"],
    deliverables: ["Fit score", "Specific upgrade suggestions", "Occasion and confidence read"],
  },
  {
    name: "Apartment Deal Checker",
    slug: "apartment-deal-checker",
    description: "Paste a listing and find out if it's a steal, scam, or overpriced",
    price: "$0.025/1k tokens",
    users: "13.8K uses",
    category: "Real Estate",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🏠",
    volume: "$638K",
    requests: "13,846",
    activeAis: "28",
    confidence: "89%",
    brief: "Paste the listing, neighborhood, rent, fees, commute needs, and what you care about most.",
    timeline: "2-5 min",
    examples: ["is this Williamsburg studio worth it", "spot broker fee traps", "rank these 3 listings"],
    deliverables: ["Deal verdict", "Hidden-cost checklist", "Questions to ask before touring"],
  },
  {
    name: "Fantasy Trade Judge",
    slug: "fantasy-trade-judge",
    description: "Settle the trade with a verdict your league can argue about",
    price: "$0.015/1k tokens",
    users: "24.5K uses",
    category: "Sports",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🏈",
    volume: "$923K",
    requests: "24,517",
    activeAis: "57",
    confidence: "90%",
    brief: "Enter the trade, league format, rosters, standings, and whether you want fair, ruthless, or chaos mode.",
    timeline: "1-3 min",
    examples: ["CMC for two WR2s", "is this collusion", "write the group chat verdict"],
    deliverables: ["Trade winner", "Risk and upside breakdown", "League-ready verdict card"],
  },
  {
    name: "Build My Comeback Body",
    slug: "build-my-comeback-body",
    description: "Get a realistic 30-day training and nutrition plan for your next era",
    price: "$0.02/1k tokens",
    users: "27.3K uses",
    category: "Health & Fitness",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "💪",
    volume: "$1.2M",
    requests: "27,312",
    activeAis: "61",
    confidence: "95%",
    brief: "Tell us your goal, body stats, schedule, equipment, diet constraints, injuries, and what usually makes you quit.",
    timeline: "4-8 min",
    examples: ["look better in 30 days", "3-day gym plan", "fat loss without cooking"],
    deliverables: ["30-day training plan", "Simple nutrition rules", "Weekly checkpoints and adjustments"],
  },
  {
    name: "Roast My Landing Page",
    slug: "roast-my-landing-page",
    description: "Get brutally useful feedback that tells you why people aren't converting",
    price: "$0.02/1k tokens",
    users: "15.1K uses",
    category: "Design",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🔥",
    volume: "$703K",
    requests: "15,098",
    activeAis: "33",
    confidence: "94%",
    brief: "Share your URL, screenshot, target customer, conversion goal, and how direct you want the critique to be.",
    timeline: "3-8 min",
    examples: ["why isn't this converting", "make my hero sharper", "rewrite this SaaS page"],
    deliverables: ["Conversion roast", "Prioritized fixes", "Sharper copy and layout recommendations"],
  },
  {
    name: "Find 50 Buyers",
    slug: "find-50-buyers",
    description: "Turn an idea into a list of people most likely to pay for it",
    price: "$0.04/1k tokens",
    users: "11.4K uses",
    category: "Business",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🎯",
    volume: "$566K",
    requests: "11,402",
    activeAis: "30",
    confidence: "90%",
    brief: "Describe what you're building, who it's for, price point, and where your buyers spend time.",
    timeline: "5-12 min",
    examples: ["buyers for my AI tool", "people who'd pay for this newsletter", "first 50 restaurant owners"],
    deliverables: ["Buyer persona map", "50 lead archetypes and search paths", "First-message angles"],
  },
  {
    name: "Find Customers",
    slug: "find-customers",
    description: "Lead gen for your highest leverage spenders",
    price: "$0.04/1k tokens",
    users: "3.1K uses",
    category: "Enterprise",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🎯",
    volume: "$469K",
    requests: "3,018",
    activeAis: "26",
    confidence: "90%",
    brief: "Share your ICP, current offer, average contract value, and regions you want to target.",
    timeline: "4-8 hrs",
    examples: ["Series B fintech buyers", "NYC hospitality operators", "enterprise AI budget owners"],
    deliverables: ["Prioritized account list", "Buyer signals and contact paths", "Personalized outreach angles"],
  },
  {
    name: "Election Campaign Setup",
    slug: "election-campaign-setup",
    description: "Create assets, a marketing plan, and a website for your election campaign",
    price: "$0.03/1k tokens",
    users: "920 uses",
    category: "Politics",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/presidential-seal.svg",
    imageAlt: "Presidential Seal",
    volume: "$211K",
    requests: "824",
    activeAis: "12",
    confidence: "86%",
    brief: "Tell us the office, district, candidate positioning, key issues, and launch date.",
    timeline: "1-3 days",
    examples: ["city council launch kit", "donor landing page", "canvassing message map"],
    deliverables: ["Campaign brand starter kit", "Website and donation funnel outline", "30-day marketing plan"],
  },
  {
    name: "Fantasy Football Betting Pool",
    slug: "fantasy-football-betting-pool",
    description: "Create a secure portal for your friends to put money and bet on fantasy football",
    price: "$0.02/1k tokens",
    users: "640 uses",
    category: "Fun & Games",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/nfl-facebook.jpg",
    imageAlt: "NFL logo",
    volume: "$76K",
    requests: "514",
    activeAis: "7",
    confidence: "81%",
    brief: "Describe your league rules, payout structure, number of friends, and preferred payment rails.",
    timeline: "2-4 hrs",
    examples: ["12-team weekly side pool", "survivor bracket", "private friends-only ledger"],
    deliverables: ["Portal structure and rules", "Payment and ledger workflow", "Launch checklist for your group"],
  },
  {
    name: "Design Review",
    slug: "design-review",
    description: "Professional design feedback and implementation for your website or deck",
    price: "$0.02/1k tokens",
    users: "1.8K uses",
    category: "Design",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "👀",
    volume: "$188K",
    requests: "1,782",
    activeAis: "18",
    confidence: "94%",
    brief: "Upload a URL, deck, or screenshot and tell us the audience, conversion goal, and deadline.",
    timeline: "30-90 min",
    examples: ["SaaS landing page audit", "seed deck visual cleanup", "mobile checkout review"],
    deliverables: ["Prioritized critique", "Annotated screenshots", "Implementation-ready copy and layout fixes"],
  },
  {
    name: "Sell my Watch",
    slug: "sell-my-watch",
    description: "List your watch or jewelry across all marketplaces and find the best offers",
    price: "$0.015/1k tokens",
    users: "780 uses",
    category: "Fashion",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/rolex-facebook.jpg",
    imageAlt: "Rolex logo",
    volume: "$97K",
    requests: "641",
    activeAis: "9",
    confidence: "84%",
    brief: "Share the brand, reference number, condition, box/papers status, and target sale window.",
    timeline: "1-2 hrs",
    examples: ["Rolex Datejust 126334", "sell in NYC this week", "compare dealer vs marketplace offers"],
    deliverables: ["Listing copy and photo checklist", "Marketplace posting plan", "Offer tracker and negotiation notes"],
  },
  {
    name: "Cheapest Knicks tickets",
    slug: "cheapest-knicks-tickets",
    description: "Instantly get the cheapest Knicks tickets for a particular section across all platforms",
    price: "$0.025/1k tokens",
    users: "2.4K uses",
    category: "Sports",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/knicks-facebook.jpg",
    imageAlt: "New York Knicks logo",
    volume: "$342K",
    requests: "2,019",
    activeAis: "21",
    confidence: "88%",
    brief: "Choose the game, section range, seat count, and whether fees should be included.",
    timeline: "2-5 min",
    examples: ["Section 108 vs Celtics", "2 seats under $400 all-in", "avoid obstructed view"],
    deliverables: ["Cross-platform ticket scan", "All-in price comparison", "Best value recommendation with checkout links"],
  },
  {
    name: "Find new Kith sneakers",
    slug: "find-new-kith-sneakers",
    description: "Search stores across NYC for new Kith inventory",
    price: "$0.001/1k tokens",
    users: "1.2K uses",
    category: "Shopping",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/kith-app-icon.jpg",
    imageAlt: "Kith logo",
    volume: "$128K",
    requests: "1,248",
    activeAis: "14",
    confidence: "92%",
    brief: "Tell us the model, size, colorway, budget, and neighborhoods you want checked.",
    timeline: "15-30 min",
    examples: ["Kith Soho size 10.5", "new ASICS collabs", "same-day pickup under $260"],
    deliverables: ["Store-by-store inventory sweep", "Best available pickup options", "Direct links, phone numbers, and hold notes"],
  },
  {
    name: "Personal Trainer",
    slug: "personal-trainer",
    description: "Get personalized guidance to meet your health and fitness goals",
    price: "$0.02/1k tokens",
    users: "12.5K uses",
    category: "Health & Fitness",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🏋️",
    volume: "$612K",
    requests: "12,504",
    activeAis: "34",
    confidence: "95%",
    brief: "Tell us your goal, current routine, equipment access, injuries, schedule, and nutrition constraints.",
    timeline: "5-10 min",
    examples: ["build muscle with 3 gym days", "fat loss plan at home", "mobility routine for tight hips"],
    deliverables: ["Personalized weekly training plan", "Progression targets and recovery notes", "Nutrition and habit recommendations"],
  },
];

type MarketRow = Database["public"]["Tables"]["markets"]["Row"];

const retiredSampleMarketSlugs = new Set([
  "game-day-group-chat",
  "concert-night-planner",
  "stream-clip-finder",
  "viral-moment-briefing",
  "world-cup-scenario-lab",
  "setlist-fantasy-draft",
  "debate-arena",
  "storyworld-generator",
]);

function normalizeUsageLabel(value: string) {
  return value.replace(/\bplays\b/gi, "uses");
}

function appendMissingSeedMarkets(markets: Market[]) {
  const activeMarkets = markets.filter((market) => !retiredSampleMarketSlugs.has(market.slug));
  const existingSlugs = new Set(activeMarkets.map((market) => market.slug));
  const missingSeedMarkets = seedMarkets.filter((market) => !existingSlugs.has(market.slug));

  return [...activeMarkets, ...missingSeedMarkets];
}

function mapMarketRow(row: MarketRow): Market {
  return {
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: row.price,
    users: normalizeUsageLabel(row.plays),
    category: row.category,
    accent: row.accent,
    avatar: row.avatar,
    badge: row.badge ?? undefined,
    image: row.image ?? undefined,
    imageAlt: row.image_alt ?? undefined,
    emoji: row.emoji ?? undefined,
    volume: row.volume,
    requests: row.requests,
    activeAis: row.active_agents,
    confidence: row.confidence,
    brief: row.brief,
    timeline: row.timeline,
    examples: row.examples,
    deliverables: row.deliverables,
  };
}

export async function getMarkets() {
  if (!isSupabaseConfigured()) {
    return seedMarkets;
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load markets: ${error.message}`);
  }

  return appendMissingSeedMarkets(data.map(mapMarketRow));
}

export async function getMarketBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    return seedMarkets.find((market) => market.slug === slug) ?? null;
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load market: ${error.message}`);
  }

  return data ? mapMarketRow(data) : seedMarkets.find((market) => market.slug === slug) ?? null;
}

export async function getMarketSlugs() {
  if (!isSupabaseConfigured()) {
    return seedMarkets.map((market) => market.slug);
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("markets").select("slug").eq("status", "published");

  if (error) {
    throw new Error(`Failed to load market slugs: ${error.message}`);
  }

  return Array.from(new Set([...data.map((market) => market.slug), ...seedMarkets.map((market) => market.slug)]));
}
