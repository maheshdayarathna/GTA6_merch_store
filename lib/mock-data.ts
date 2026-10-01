import type {
  CommunityItem,
  FeaturedProduct,
  NewsArticle,
  SiteSettings,
} from "./types";

// Phase 1: static mock data. Phase 2 replaces these exports with Sanity
// fetches returning the same shapes.

const PLACEHOLDER_VIDEO = "https://www.youtube.com/watch?v=jNQXAC9IVRw";

export const newsArticles: NewsArticle[] = [
  {
    title: "Grand Theft Auto VI: An Extended Look",
    slug: "gta-vi-extended-look",
    source: "Rockstar Games",
    thumbnail: "https://i.ytimg.com/vi/tJbzMqJGH4k/hqdefault.jpg",
    videoUrl: "https://youtu.be/tJbzMqJGH4k",
    excerpt: "Rockstar's deepest look yet at Leonida and the world of GTA VI.",
    publishedAt: "2025-08-01T00:00:00Z",
    featured: true,
  },
  {
    title: "Grand Theft Auto VI: Trailer 2",
    slug: "gta-vi-trailer-2",
    source: "Rockstar Games",
    thumbnail: "https://i.ytimg.com/vi/VQRLujxTm3c/hqdefault.jpg",
    videoUrl: "https://youtu.be/VQRLujxTm3c",
    excerpt: "The second official trailer, revealing more of Vice City.",
    publishedAt: "2025-05-06T00:00:00Z",
    featured: false,
  },
  {
    title: "Grand Theft Auto VI: Trailer 1",
    slug: "gta-vi-trailer-1",
    source: "Rockstar Games",
    thumbnail: "https://i.ytimg.com/vi/QdBZY2fkU-0/hqdefault.jpg",
    videoUrl: "https://youtu.be/QdBZY2fkU-0",
    excerpt: "The original reveal that started it all.",
    publishedAt: "2023-12-05T00:00:00Z",
    featured: false,
  },
];

export const communityItems: CommunityItem[] = [
  { title: "London Fan Meetup Recap", tag: "Meetup", thumbnail: "/placeholders/community-1.svg", videoUrl: PLACEHOLDER_VIDEO, order: 1 },
  { title: "Countdown Watch Party", tag: "Event", thumbnail: "/placeholders/community-2.svg", videoUrl: PLACEHOLDER_VIDEO, order: 2 },
  { title: "Member Spotlight: Cosplay Crew", tag: "Membership", thumbnail: "/placeholders/community-3.svg", videoUrl: PLACEHOLDER_VIDEO, order: 3 },
  { title: "Tokyo Community Night", tag: "Meetup", thumbnail: "/placeholders/community-4.svg", videoUrl: PLACEHOLDER_VIDEO, order: 4 },
  { title: "Fan Art Showcase Live", tag: "Event", thumbnail: "/placeholders/community-5.svg", videoUrl: PLACEHOLDER_VIDEO, order: 5 },
  { title: "Founding Member Perks", tag: "Membership", thumbnail: "/placeholders/community-6.svg", videoUrl: PLACEHOLDER_VIDEO, order: 6 },
  { title: "Sydney Launch Party Plans", tag: "Meetup", thumbnail: "/placeholders/community-7.svg", videoUrl: PLACEHOLDER_VIDEO, order: 7 },
  { title: "New York Trivia Night", tag: "Event", thumbnail: "/placeholders/community-8.svg", videoUrl: PLACEHOLDER_VIDEO, order: 8 },
];

export const siteSettings: SiteSettings = {
  releaseDate: "2026-11-19T00:00:00Z", // confirm year later
  progressStartDate: "2026-08-21T00:00:00Z", // placeholder: 90 days before release
  mailingListEmbed: "Mailing list provider not connected yet (placeholder).",
  shopifyStoreUrl:
    process.env.SHOPIFY_STORE_URL ?? "https://shop.yourdomain.com",
};

export const featuredProducts: FeaturedProduct[] = [
  { name: "Vanta Jersey - Violet", price: "$59.00", image: "/placeholders/product-1.svg" },
  { name: "Vanta Jersey - Teal", price: "$59.00", image: "/placeholders/product-2.svg" },
  { name: "Vanta Jersey - Crimson", price: "$59.00", image: "/placeholders/product-3.svg" },
];
