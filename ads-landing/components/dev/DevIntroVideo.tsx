import { ExternalLink } from "lucide-react";

const YOUTUBE_VIDEO_ID = "S4KDBAZNuwo";
const YOUTUBE_WATCH_URL = "https://youtu.be/S4KDBAZNuwo";

export function DevIntroVideo() {
  return (
    <section className="relative z-[1] bg-dev-bg px-6 pb-2 pt-6">
      <div className="mx-auto max-w-[min(100%,56rem)]">
        <div className="aspect-video w-full overflow-hidden rounded-[var(--radius-dev-lg)] border border-[color:var(--color-dev-border-strong)] bg-dev-s2">
          <iframe
            title="AI4B2B intro video"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <a
            href={YOUTUBE_WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--radius-dev)] border border-[color:var(--color-dev-border-strong)] bg-dev-s1 px-4 py-2.5 text-sm font-medium text-dev-text transition-colors hover:border-dev-accent hover:text-dev-accent"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="size-4 shrink-0 opacity-80" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
