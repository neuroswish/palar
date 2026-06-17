import Image from "next/image";
import { Sparkles } from "lucide-react";

import type { Market } from "@/lib/markets";

type MarketAvatarProps = Pick<Market, "accent" | "avatar" | "image" | "imageAlt" | "emoji"> & {
  size?: "sm" | "lg";
};

export function MarketAvatar({ accent, avatar, image, imageAlt, emoji, size = "sm" }: MarketAvatarProps) {
  const shellSize = size === "lg" ? "h-20 w-20 rounded-md" : "h-[38px] w-[38px] rounded-sm";
  const imageSize = size === "lg" ? "80px" : "38px";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-[#ecece7] bg-gradient-to-br ${shellSize} ${accent}`}
    >
      {avatar === "image" && image ? (
        <Image className="object-contain" src={image} alt={imageAlt ?? ""} fill sizes={imageSize} />
      ) : null}
      {avatar === "emoji" && emoji ? (
        <span className={size === "lg" ? "text-4xl leading-none" : "text-xl leading-none"}>{emoji}</span>
      ) : null}
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
