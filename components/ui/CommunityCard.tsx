/* eslint-disable @next/next/no-img-element */
import { PlayIcon } from "./icons";

type Props = { thumbnail: string; title: string; tag: string; videoUrl: string };

// Opens the real video URL in a new tab (not embedded, unlike MediaCard).
export default function CommunityCard({
  thumbnail,
  title,
  tag,
  videoUrl,
}: Props) {
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[9/16] w-56 shrink-0 overflow-hidden rounded-2xl bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:w-64"
    >
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/60 ring-2 ring-cream/80 group-hover:bg-accent">
        <PlayIcon className="ml-1 size-6 text-cream" />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-16">
        <h3 className="text-base font-bold leading-tight">{title}</h3>
        <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-sun">
          {tag}
        </span>
      </div>
    </a>
  );
}
