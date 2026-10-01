import {
  getCommunityItems,
  getNewsArticles,
  getSiteSettings,
} from "@/sanity/lib/queries";
import type {
  CommunityItem,
  FeaturedProduct,
  NewsArticle,
  SiteSettings,
} from "./types";

// Content now comes from Sanity; these keep the old export shapes, but async.

export async function newsArticles(): Promise<NewsArticle[]> {
  return getNewsArticles();
}

export async function communityItems(): Promise<CommunityItem[]> {
  return getCommunityItems();
}

// Used until the singleton document is filled in or if a field is empty.
const settingsDefaults: SiteSettings = {
  releaseDate: "2026-11-19T00:00:00Z",
  progressStartDate: "2026-08-21T00:00:00Z",
  mailingListEmbed: "",
  shopifyStoreUrl:
    process.env.SHOPIFY_STORE_URL ?? "https://shop.yourdomain.com",
};

export async function siteSettings(): Promise<SiteSettings> {
  const s = await getSiteSettings();
  return {
    releaseDate: s?.releaseDate || settingsDefaults.releaseDate,
    progressStartDate:
      s?.progressStartDate || settingsDefaults.progressStartDate,
    mailingListEmbed: s?.mailingListEmbed ?? settingsDefaults.mailingListEmbed,
    shopifyStoreUrl: s?.shopifyStoreUrl || settingsDefaults.shopifyStoreUrl,
  };
}

// Not in the Sanity schema (shop is disabled); stays static.
export const featuredProducts: FeaturedProduct[] = [
  { name: "Vanta Jersey - Violet", price: "$59.00", image: "/placeholders/product-1.svg" },
  { name: "Vanta Jersey - Teal", price: "$59.00", image: "/placeholders/product-2.svg" },
  { name: "Vanta Jersey - Crimson", price: "$59.00", image: "/placeholders/product-3.svg" },
];
