import CommunityCard from "@/components/ui/CommunityCard";
import { copy } from "@/lib/copy";
import type { CommunityItem } from "@/lib/types";

type Props = { items: CommunityItem[] };

export default function Community({ items }: Props) {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  // Each group must be wider than the viewport, otherwise the -50% loop leaves
  // an empty gap on wide screens. Repeat the cards to cover ~2600px (card + gap = 272px).
  const repeats = sorted.length
    ? Math.max(1, Math.ceil(2600 / (sorted.length * 272)))
    : 1;

  const group = (hidden: boolean) => (
    <ul
      className="flex shrink-0 gap-4 pr-4"
      aria-hidden={hidden || undefined}
    >
      {Array.from({ length: repeats }, (_, copy) =>
        sorted.map((item) => (
          <li
            key={`${copy}-${item.title}`}
            aria-hidden={copy > 0 || undefined}
          >
            <CommunityCard
              thumbnail={item.thumbnail}
              title={item.title}
              tag={item.tag}
              videoUrl={item.videoUrl}
            />
          </li>
        )),
      )}
    </ul>
  );

  return (
    <section className="overflow-hidden bg-ink py-16 md:py-24">
      <div className="mx-auto mb-8 max-w-6xl px-5 md:px-10">
        <h2 className="font-display text-4xl tracking-wide md:text-6xl">
          {copy.community.heading}
        </h2>
        <p className="mt-2 text-sm uppercase tracking-widest text-cream/70">
          {copy.community.subheading}
        </p>
      </div>

      {/* Two identical groups + translateX(-50%) = seamless loop. Pauses on hover/focus. */}
      <div className="group/marquee">
        <div className="marquee-track flex w-max animate-marquee [--marquee-duration:70s] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}
