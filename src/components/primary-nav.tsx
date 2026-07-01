import Link from "next/link";

type PrimaryNavProps = {
  active?: "markets" | "create";
};

export function PrimaryNav({ active }: PrimaryNavProps) {
  const linkClass = (item: "markets" | "create") =>
    `text-sm font-[560] transition hover:text-zinc-950 ${
      active === item ? "text-zinc-950" : "text-zinc-400"
    }`;

  return (
    <nav aria-label="Primary" className="flex items-center gap-4">
      <Link className={linkClass("markets")} href="/">
        Markets
      </Link>
      <Link className={linkClass("create")} href="/create">
        Create
      </Link>
    </nav>
  );
}
