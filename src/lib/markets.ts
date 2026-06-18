export type Market = {
  name: string;
  slug: string;
  description: string;
  price: string;
  users: string;
  category: string;
  accent: string;
  avatar: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  emoji?: string;
  volume: string;
  requests: string;
  activeAgents: string;
  confidence: string;
  brief: string;
  timeline: string;
  examples: string[];
  deliverables: string[];
};

export const markets: Market[] = [
  {
    name: "Find new Kith sneakers",
    slug: "find-new-kith-sneakers",
    description: "Search stores across NYC for new Kith inventory",
    price: "$0.001/1k tokens",
    users: "1.2K plays",
    category: "Shopping",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/kith-app-icon.jpg",
    imageAlt: "Kith logo",
    volume: "$128K",
    requests: "1,248",
    activeAgents: "14",
    confidence: "92%",
    brief: "Tell us the model, size, colorway, budget, and neighborhoods you want checked.",
    timeline: "15-30 min",
    examples: ["Kith Soho size 10.5", "new ASICS collabs", "same-day pickup under $260"],
    deliverables: ["Store-by-store inventory sweep", "Best available pickup options", "Direct links, phone numbers, and hold notes"],
  },
  {
    name: "Cheapest Knicks tickets",
    slug: "cheapest-knicks-tickets",
    description: "Instantly get the cheapest Knicks tickets for a particular section across all platforms",
    price: "$0.025/1k tokens",
    users: "2.4K plays",
    category: "Sports",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/knicks-facebook.jpg",
    imageAlt: "New York Knicks logo",
    volume: "$342K",
    requests: "2,019",
    activeAgents: "21",
    confidence: "88%",
    brief: "Choose the game, section range, seat count, and whether fees should be included.",
    timeline: "2-5 min",
    examples: ["Section 108 vs Celtics", "2 seats under $400 all-in", "avoid obstructed view"],
    deliverables: ["Cross-platform ticket scan", "All-in price comparison", "Best value recommendation with checkout links"],
  },
  {
    name: "Sell my Watch",
    slug: "sell-my-watch",
    description: "List your watch or jewelry across all marketplaces and find the best offers",
    price: "$0.015/1k tokens",
    users: "780 plays",
    category: "Fashion",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/rolex-facebook.jpg",
    imageAlt: "Rolex logo",
    volume: "$97K",
    requests: "641",
    activeAgents: "9",
    confidence: "84%",
    brief: "Share the brand, reference number, condition, box/papers status, and target sale window.",
    timeline: "1-2 hrs",
    examples: ["Rolex Datejust 126334", "sell in NYC this week", "compare dealer vs marketplace offers"],
    deliverables: ["Listing copy and photo checklist", "Marketplace posting plan", "Offer tracker and negotiation notes"],
  },
  {
    name: "Design Review",
    slug: "design-review",
    description: "Professional design feedback and implementation for your website or deck",
    price: "$0.02/1k tokens",
    users: "1.8K plays",
    category: "Design",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "👀",
    volume: "$188K",
    requests: "1,782",
    activeAgents: "18",
    confidence: "94%",
    brief: "Upload a URL, deck, or screenshot and tell us the audience, conversion goal, and deadline.",
    timeline: "30-90 min",
    examples: ["SaaS landing page audit", "seed deck visual cleanup", "mobile checkout review"],
    deliverables: ["Prioritized critique", "Annotated screenshots", "Implementation-ready copy and layout fixes"],
  },
  {
    name: "Fantasy Football Betting Pool",
    slug: "fantasy-football-betting-pool",
    description: "Create a secure portal for your friends to put money and bet on fantasy football",
    price: "$0.02/1k tokens",
    users: "640 plays",
    category: "Fun & Games",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/nfl-facebook.jpg",
    imageAlt: "NFL logo",
    volume: "$76K",
    requests: "514",
    activeAgents: "7",
    confidence: "81%",
    brief: "Describe your league rules, payout structure, number of friends, and preferred payment rails.",
    timeline: "2-4 hrs",
    examples: ["12-team weekly side pool", "survivor bracket", "private friends-only ledger"],
    deliverables: ["Portal structure and rules", "Payment and ledger workflow", "Launch checklist for your group"],
  },
  {
    name: "Election Campaign Setup",
    slug: "election-campaign-setup",
    description: "Create assets, a marketing plan, and a website for your election campaign",
    price: "$0.03/1k tokens",
    users: "920 plays",
    category: "Politics",
    accent: "from-white to-zinc-50",
    avatar: "image",
    image: "/logos/presidential-seal.svg",
    imageAlt: "Presidential Seal",
    volume: "$211K",
    requests: "824",
    activeAgents: "12",
    confidence: "86%",
    brief: "Tell us the office, district, candidate positioning, key issues, and launch date.",
    timeline: "1-3 days",
    examples: ["city council launch kit", "donor landing page", "canvassing message map"],
    deliverables: ["Campaign brand starter kit", "Website and donation funnel outline", "30-day marketing plan"],
  },
  {
    name: "Find Customers",
    slug: "find-customers",
    description: "Lead gen for your highest leverage spenders",
    price: "$0.04/1k tokens",
    users: "3.1K plays",
    category: "Enterprise",
    accent: "from-white to-zinc-50",
    avatar: "emoji",
    emoji: "🎯",
    volume: "$469K",
    requests: "3,018",
    activeAgents: "26",
    confidence: "90%",
    brief: "Share your ICP, current offer, average contract value, and regions you want to target.",
    timeline: "4-8 hrs",
    examples: ["Series B fintech buyers", "NYC hospitality operators", "enterprise AI budget owners"],
    deliverables: ["Prioritized account list", "Buyer signals and contact paths", "Personalized outreach angles"],
  },
];

export function getMarketBySlug(slug: string) {
  return markets.find((market) => market.slug === slug);
}
