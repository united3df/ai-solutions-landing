import { Fragment } from "react";

const ITEMS = [
  "★★★★★ Verified on Clutch",
  "Y Combinator & Techstars clients",
  "$2M+ ARR scaled",
  "Ships in days, not months",
  "You own every line of code",
];

export function DevProofBar() {
  return (
    <div
      className="relative z-[1] mt-[58px] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-dev-accent px-4 py-2.5 md:gap-x-10 md:px-10"
      aria-label="Trust indicators"
    >
      {ITEMS.map((label, i) => (
        <Fragment key={label}>
          {i > 0 && (
            <span
              className="hidden h-1 w-1 shrink-0 rounded-full bg-[#080809]/25 sm:inline-block"
              aria-hidden
            />
          )}
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.05em] text-[#080809]">
            {label}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
