import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleVideo from "@/components/ArticleVideo";
import MarkdownBody from "@/components/MarkdownBody";
import Footer from "@/components/sections/Footer";
import SiteHeader from "@/components/SiteHeader";
import { formatDate } from "@/lib/articles";
import { newsArticles, siteSettings } from "@/lib/mock-data";

type Params = { slug: string };

export async function generateStaticParams() {
  return (await newsArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = (await newsArticles()).find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = (await newsArticles()).find((a) => a.slug === slug);
  if (!article) notFound();
  const settings = await siteSettings();

  return (
    <>
      <SiteHeader shopUrl={settings.shopifyStoreUrl} />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <Link href="/news" className="text-sm text-cream/60 hover:text-accent">
          &larr; All news
        </Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-sun">
          {article.source} · {formatDate(article.publishedAt)}
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-wide md:text-5xl">
          {article.title}
        </h1>
        <div className="mt-8">
          <ArticleVideo article={article} />
        </div>
        {article.body && (
          <div className="mt-8">
            <MarkdownBody body={article.body} />
          </div>
        )}
      </main>
      <Footer settings={settings} />
    </>
  );
}
