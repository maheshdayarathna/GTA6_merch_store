"use client";
import { useEffect, useState } from "react";

export function useNow(intervalMs = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function progressPercent(now: number, start: string, end: string) {
  const s = Date.parse(start);
  const e = Date.parse(end);
  if (e <= s) return 100;
  return Math.min(100, Math.max(0, ((now - s) / (e - s)) * 100));
}
