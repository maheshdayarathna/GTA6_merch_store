import type { NewsArticle } from "./types";

export function sortNewestFirst(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

// Featured article first, then the rest newest first.
export function orderForExplore(articles: NewsArticle[]): NewsArticle[] {
  const sorted = sortNewestFirst(articles);
  const featured = sorted.find((a) => a.featured);
  return featured ? [featured, ...sorted.filter((a) => a !== featured)] : sorted;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(iso));
}
