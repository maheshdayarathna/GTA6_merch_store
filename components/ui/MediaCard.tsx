/* eslint-disable @next/next/no-img-element */
import { PlayIcon } from "./icons";

type Props = {
  size: "lg" | "sm";
  thumbnail: string;
  sourceBadge?: { name: string; logo?: string };
  title: string;
  onClick: () => void;
  // YouTube facade: when playing, the iframe replaces the thumbnail.
  playing?: boolean;
  embedUrl?: string | null;
};

export default function MediaCard({
  size,
  thumbnail,
  sourceBadge,
  title,
  onClick,
  playing = false,
  embedUrl,
}: Props) {
  const lg = size === "lg";

  if (playing && embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Play: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

      {lg && sourceBadge && (
        <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 py-1 pl-1 pr-3 text-xs font-semibold">
          {sourceBadge.logo ? (
            <img src={sourceBadge.logo} alt="" className="size-6 rounded-full" />
          ) : (
            <span className="grid size-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-black">
              {sourceBadge.name.charAt(0)}
            </span>
          )}
          {sourceBadge.name}
        </span>
      )}

      {lg ? (
        <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/60 ring-2 ring-cream/80 transition group-hover:scale-110 group-hover:bg-accent md:size-20">
          <PlayIcon className="ml-1 size-7 text-cream md:size-9" />
        </span>
      ) : null}

      <div
        className={`absolute inset-x-0 bottom-0 flex items-end gap-3 ${lg ? "p-4 pr-40 md:p-6 md:pr-48" : "p-3"}`}
      >
        {!lg && (
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-black/60 ring-1 ring-cream/70 group-hover:bg-accent">
            <PlayIcon className="ml-0.5 size-4 text-cream" />
          </span>
        )}
        <span
          className={`font-bold leading-tight text-cream ${lg ? "text-lg md:text-2xl" : "line-clamp-2 text-sm"}`}
        >
          {title}
        </span>
      </div>

      {lg && (
        <span className="absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold sm:flex md:bottom-6 md:right-6">
          <PlayIcon className="size-3 text-red-500" />
          Watch on YouTube
        </span>
      )}
    </button>
  );
}
