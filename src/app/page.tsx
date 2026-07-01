import { MarketBrowser } from "@/components/market-browser";
import { getMarkets } from "@/lib/markets";

export const revalidate = 60;

export default async function Home() {
  const markets = await getMarkets();

  return <MarketBrowser markets={markets} />;
}
