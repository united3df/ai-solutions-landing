import { Fragment } from "react";
import { CLUTCH_PROFILE_URL, UPWORK_PROFILE_URL } from "@/lib/platform-links";

const itemClass =
  "text-[0.75rem] font-bold uppercase tracking-[0.05em] text-[#080809]";

const ENTRIES: Array<
  | { kind: "link"; href: string; label: string }
  | { kind: "text"; label: string }
> = [
  {
    kind: "link",
    href: CLUTCH_PROFILE_URL,
    label: "★★★★★ Verified on Clutch",
  },
  {
    kind: "link",
    href: UPWORK_PROFILE_URL,
    label: "Top 2% Upwork · 100% JSS",
  },
  { kind: "text", label: "Y Combinator & Techstars clients" },
  { kind: "text", label: "$2M+ ARR scaled" },
  { kind: "text", label: "Ships in days, not months" },
  { kind: "text", label: "You own every line of code" },
];

export function DevProofBar() {
  return (
    <div
      className="relative z-[1] mt-[58px] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-dev-accent px-4 py-2.5 md:gap-x-10 md:px-10"
      aria-label="Trust indicators"
    >
      {ENTRIES.map((entry, i) => (
        <Fragment key={entry.kind === "link" ? entry.href : entry.label}>
          {i > 0 && (
            <span
              className="hidden h-1 w-1 shrink-0 rounded-full bg-[#080809]/25 sm:inline-block"
              aria-hidden
            />
          )}
          {entry.kind === "link" ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${itemClass} underline decoration-[#080809]/35 underline-offset-2 transition-opacity hover:opacity-80 hover:decoration-[#080809]/60`}
            >
              {entry.label}
            </a>
          ) : (
            <span className={itemClass}>{entry.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
