"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { toBlob } from "html-to-image";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import TimezoneTabs from "@/components/ui/TimezoneTabs";
import Logo from "@/components/Logo";
import ShareModal from "@/components/ShareModal";
import { progressPercent, splitDuration, useNow } from "@/hooks/useCountdown";
import { assets, copy } from "@/lib/copy";
import { timezones } from "@/lib/timezones";
import type { SiteSettings } from "@/lib/types";

type Props = { settings: SiteSettings };

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero({ settings }: Props) {
  const { releaseDate, progressStartDate, shopifyStoreUrl } = settings;
  const [tzCode, setTzCode] = useState(timezones[0].code);
  const [shareOpen, setShareOpen] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const now = useNow();

  const tz = timezones.find((t) => t.code === tzCode) ?? timezones[0];

  // Fixed locale so server and client render identical text.
  const localRelease = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: tz.tz,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date(releaseDate)),
    [tz.tz, releaseDate],
  );

  const remaining =
    now === null ? null : splitDuration(Date.parse(releaseDate) - now);
  const percent =
    now === null ? 0 : progressPercent(now, progressStartDate, releaseDate);

  const units = [
    { label: "Days", value: remaining?.days },
    { label: "Hours", value: remaining?.hours },
    { label: "Minutes", value: remaining?.minutes },
    { label: "Seconds", value: remaining?.seconds },
  ];

  const capture = useCallback(async () => {
    if (!captureRef.current) return null;
    try {
      return await toBlob(captureRef.current, {
        backgroundColor: "#12081f",
        pixelRatio: 1.5,
        cacheBust: true,
      });
    } catch {
      return null;
    }
  }, []);

  const shareText = remaining
    ? `${remaining.days} days to go! Countdown to release day.`
    : "Countdown to release day.";

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Image
        src={assets.heroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <header className="flex items-center justify-between px-5 py-5 md:px-10">
        <Logo size="md" />
        <Button variant="solid" size="sm" href={shopifyStoreUrl}>
          {copy.hero.shop}
        </Button>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-5 pb-12">
        {/* Snapshot region: this is what SHARE captures as an image. */}
        <div
          ref={captureRef}
          className="w-full rounded-3xl bg-gradient-to-br from-[#12081f] to-[#3a0d3a] p-6 md:p-10"
        >
          <h1 className="text-center font-display text-4xl tracking-wide md:text-6xl">
            {copy.hero.heading}
          </h1>

          <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
            <TimezoneTabs
              options={timezones}
              value={tzCode}
              onChange={setTzCode}
            />

            <div className="flex flex-col items-center gap-3">
              <div
                className="flex gap-3 md:gap-5"
                role="timer"
                aria-label="Time remaining until release"
              >
                {units.map((u) => (
                  <div key={u.label} className="flex flex-col items-center">
                    <span className="grid min-w-16 place-items-center rounded-2xl bg-black/50 px-2 py-3 font-display text-4xl tabular-nums md:min-w-28 md:text-7xl">
                      {u.value === undefined ? "--" : pad(u.value)}
                    </span>
                    <span className="mt-2 text-[10px] uppercase tracking-widest text-cream/70 md:text-xs">
                      {u.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-cream/80 md:text-base">
                Release: <strong className="text-sun">{localRelease}</strong>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ProgressBar percent={percent} />
          </div>
        </div>

        <Button variant="outline" onClick={() => setShareOpen(true)}>
          {copy.hero.share}
        </Button>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareText={shareText}
        capture={capture}
      />
    </section>
  );
}
