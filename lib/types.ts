// Shapes mirror the Phase 2 Sanity schema. Keep in sync with lib/mock-data.ts.

export type NewsArticle = {
  title: string;
  slug: string;
  source: string;
  sourceLogo?: string;
  thumbnail: string;
  videoUrl: string;
  excerpt?: string;
  body?: string; // markdown / plain text stand-in for portable text
  publishedAt: string; // ISO date
  featured: boolean; // exactly one article should be true
};

export type CommunityItem = {
  title: string;
  tag: string;
  thumbnail: string; // portrait aspect
  videoUrl: string;
  order: number;
};

export type SiteSettings = {
  releaseDate: string;
  progressStartDate: string;
  mailingListEmbed: string;
  shopifyStoreUrl: string;
};

export type FeaturedProduct = {
  name: string;
  price: string;
  image: string;
};
