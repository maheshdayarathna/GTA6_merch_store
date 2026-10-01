/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import SiteHeader from "@/components/SiteHeader";
import { formatDate, sortNewestFirst } from "@/lib/articles";
import { copy } from "@/lib/copy";
import { newsArticles, siteSettings } from "@/lib/mock-data";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  const articles = sortNewestFirst(newsArticles);
  return (
    <>
      <SiteHeader shopUrl={siteSettings.shopifyStoreUrl} />
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-10">
        <h1 className="font-display text-4xl tracking-wide md:text-6xl">
          {copy.newsPage.heading}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-widest text-cream/70">
          {copy.newsPage.subheading}
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/news/${a.slug}`} className="group block">
                <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-900">
                  <img
                    src={a.thumbnail}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-widest text-sun">
                  {a.source} · {formatDate(a.publishedAt)}
                </p>
                <h2 className="mt-1 text-lg font-bold leading-snug group-hover:text-accent">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-1 text-sm text-cream/70">{a.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer settings={siteSettings} />
    </>
  );
}
