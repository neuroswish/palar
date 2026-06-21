import { MarketBrowser } from "@/components/market-browser";
import { getMarkets } from "@/lib/markets";

export const dynamic = "force-dynamic";

export default async function Home() {
  const markets = await getMarkets();

  return <MarketBrowser markets={markets} />;
}
