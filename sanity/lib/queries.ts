import { toPlainText, type PortableTextBlock } from "next-sanity";
import type { CommunityItem, NewsArticle, SiteSettings } from "@/lib/types";
import { client } from "./client";
import { urlFor } from "./image";

type Img = Parameters<typeof urlFor>[0];

const imgUrl = (img?: Img | null) => (img ? urlFor(img).url() : undefined);

type RawArticle = {
  title: string;
  slug: string;
  source?: string;
  sourceLogo?: Img;
  thumbnail?: Img;
  videoUrl?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
  featured?: boolean;
};

const articleFields = `title, "slug": slug.current, source, sourceLogo, thumbnail, videoUrl, excerpt, body, publishedAt, featured`;

const toArticle = (a: RawArticle): NewsArticle => ({
  title: a.title,
  slug: a.slug,
  source: a.source ?? "",
  sourceLogo: imgUrl(a.sourceLogo),
  thumbnail: imgUrl(a.thumbnail) ?? "",
  videoUrl: a.videoUrl ?? "",
  excerpt: a.excerpt,
  body: a.body?.length ? toPlainText(a.body) : undefined,
  publishedAt: a.publishedAt ?? "",
  featured: a.featured ?? false,
});

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const rows = await client.fetch<RawArticle[]>(
    `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc){${articleFields}}`,
  );
  return rows.map(toArticle);
}

export async function getFeaturedArticle(): Promise<NewsArticle | null> {
  const row = await client.fetch<RawArticle | null>(
    `*[_type == "newsArticle" && featured == true] | order(publishedAt desc)[0]{${articleFields}}`,
  );
  return row ? toArticle(row) : null;
}

export async function getCommunityItems(): Promise<CommunityItem[]> {
  const rows = await client.fetch<
    {
      title: string;
      tag?: string;
      thumbnail?: Img;
      videoUrl?: string;
      order?: number;
    }[]
  >(
    `*[_type == "communityItem"] | order(order asc){title, tag, thumbnail, videoUrl, order}`,
  );
  return rows.map((r, i) => ({
    title: r.title,
    tag: r.tag ?? "",
    thumbnail: imgUrl(r.thumbnail) ?? "",
    videoUrl: r.videoUrl ?? "",
    order: r.order ?? i + 1,
  }));
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{releaseDate, progressStartDate, mailingListEmbed, shopifyStoreUrl}`,
  );
}
