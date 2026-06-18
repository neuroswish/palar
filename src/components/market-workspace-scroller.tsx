"use client";

import type { ReactNode, WheelEvent } from "react";
import { useRef } from "react";

type MarketWorkspaceScrollerProps = {
  children: ReactNode;
  className?: string;
};

const scrollEdgeTolerance = 2;

export function MarketWorkspaceScroller({ children, className }: MarketWorkspaceScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;

    if (!scroller || event.deltaY === 0) {
      return;
    }

    const isScrollingDown = event.deltaY > 0;
    const isAtTop = scroller.scrollTop <= scrollEdgeTolerance;
    const isAtBottom =
      scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - scrollEdgeTolerance;

    if ((isScrollingDown && isAtBottom) || (!isScrollingDown && isAtTop)) {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY,
        left: event.deltaX,
        behavior: "auto",
      });
      return;
    }

    event.stopPropagation();
  }

  return (
    <div className={className} onWheel={handleWheel} ref={scrollerRef}>
      {children}
    </div>
  );
}
