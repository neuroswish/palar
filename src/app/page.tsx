import { AuthButton } from "@/components/auth-button";
import { MarketBrowser } from "@/components/market-browser";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#262626]">
      <header className="fixed inset-x-0 top-0 z-10 border-b border-transparent bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md border border-[#e9e8e3] bg-white">
              <span className="text-lg leading-none" aria-hidden="true">🧠</span>
            </div>
            <span className="text-base font-semibold tracking-normal">Ares</span>
          </div>
          <div className="flex items-center gap-2">
            <AuthButton />
          </div>
        </div>
      </header>

      <MarketBrowser />
    </main>
  );
}
