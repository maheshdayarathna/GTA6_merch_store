"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import MediaCard from "@/components/ui/MediaCard";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { orderForExplore } from "@/lib/articles";
import { copy } from "@/lib/copy";
import { getEmbedUrl } from "@/lib/youtube";
import type { NewsArticle } from "@/lib/types";

type Props = { articles: NewsArticle[] };

export default function Explore({ articles }: Props) {
  const list = orderForExplore(articles);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  // Both layouts are in the DOM; only the visible one may mount an iframe.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (list.length === 0) return null;

  const go = (i: number) => {
    setActive((i + list.length) % list.length);
    setPlaying(null);
  };

  const large = list[active];
  const small = [1, 2]
    .map((o) => list[(active + o) % list.length])
    .filter((a, i, arr) => a !== large && arr.indexOf(a) === i);

  const badge = (a: NewsArticle) => ({ name: a.source, logo: a.sourceLogo });
  const card = (a: NewsArticle, size: "lg" | "sm", visible: boolean) => (
    <MediaCard
      key={a.slug}
      size={size}
      thumbnail={a.thumbnail}
      sourceBadge={size === "lg" ? badge(a) : undefined}
      title={a.title}
      playing={visible && playing === a.slug}
      embedUrl={getEmbedUrl(a.videoUrl)}
      onClick={() => setPlaying(a.slug)}
    />
  );

  return (
    <section className="bg-ink px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl tracking-wide md:text-6xl">
              {copy.explore.heading}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-widest text-cream/70">
              {copy.explore.subheading}
            </p>
          </div>
          <Button variant="solid" size="sm" href="/news">
            {copy.explore.cta}
          </Button>
        </div>

        {/* Desktop: 1 large + 2 small, with a slider to change the large one */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 items-start gap-5">
            <div className="col-span-2">{card(large, "lg", isDesktop)}</div>
            <div className="flex flex-col gap-5">
              {small.map((a) => card(a, "sm", isDesktop))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous article"
              onClick={() => go(active - 1)}
              className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {list.map((a, i) => (
                <button
                  key={a.slug}
                  type="button"
                  aria-label={`Show ${a.title}`}
                  aria-current={i === active}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next article"
              onClick={() => go(active + 1)}
              className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile: swipeable carousel, all cards equal size */}
        <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:hidden">
          {list.map((a) => (
            <div key={a.slug} className="w-[82%] shrink-0 snap-center">
              {card(a, "sm", !isDesktop)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
