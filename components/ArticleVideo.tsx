"use client";
import { useState } from "react";
import MediaCard from "@/components/ui/MediaCard";
import { getEmbedUrl } from "@/lib/youtube";
import type { NewsArticle } from "@/lib/types";

export default function ArticleVideo({ article }: { article: NewsArticle }) {
  const [playing, setPlaying] = useState(false);
  return (
    <MediaCard
      size="lg"
      thumbnail={article.thumbnail}
      sourceBadge={{ name: article.source, logo: article.sourceLogo }}
      title={article.title}
      playing={playing}
      embedUrl={getEmbedUrl(article.videoUrl)}
      onClick={() => setPlaying(true)}
    />
  );
}
