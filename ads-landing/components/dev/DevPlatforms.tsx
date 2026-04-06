import { CLUTCH_PROFILE_URL, UPWORK_PROFILE_URL } from "@/lib/platform-links";

const platformCardClass =
  "bg-dev-surface p-12 flex items-center gap-8 cursor-pointer no-underline text-inherit";

export function DevPlatforms() {
  return (
    <div className="grid grid-cols-1 border-t border-dev-border md:grid-cols-2 md:gap-px md:bg-dev-border">
      <a
        href={CLUTCH_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${platformCardClass} border-b border-dev-border md:border-b-0`}
      >
        <div className="font-[var(--font-dev-display)] text-[52px] text-dev-accent leading-none shrink-0">
          C
        </div>
        <div>
          <div className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.04em] mb-1">
            Clutch.co
          </div>
          <div className="font-[var(--font-dev-display)] text-4xl text-dev-text leading-none">
            4.7/5
          </div>
          <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase mt-1">
            3 Verified Reviews · 100% Recommend
          </div>
        </div>
      </a>
      <a
        href={UPWORK_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={platformCardClass}
      >
        <div className="font-[var(--font-dev-display)] text-[52px] text-dev-accent leading-none shrink-0">
          Up
        </div>
        <div>
          <div className="font-[var(--font-dev-mono)] text-[13px] text-dev-accent tracking-[0.04em] mb-1">
            Upwork
          </div>
          <div className="font-[var(--font-dev-display)] text-4xl text-dev-text leading-none">
            Top Rated
          </div>
          <div className="font-[var(--font-dev-mono)] text-[11px] text-dev-muted tracking-[0.06em] uppercase mt-1">
            Enterprise Partner · Verified Agency · 4,400+ hrs
          </div>
        </div>
      </a>
    </div>
  );
}
