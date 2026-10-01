import Community from "@/components/sections/Community";
import Explore from "@/components/sections/Explore";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import ShopGrid from "@/components/sections/ShopGrid";
import VantaPromo from "@/components/sections/VantaPromo";
import { SHOP_ENABLED } from "@/lib/config";
import {
  communityItems,
  featuredProducts,
  newsArticles,
  siteSettings,
} from "@/lib/mock-data";

export default async function Home() {
  const [articles, community, settings] = await Promise.all([
    newsArticles(),
    communityItems(),
    siteSettings(),
  ]);
  return (
    <main>
      <Hero settings={settings} />
      <Explore articles={articles} />
      <VantaPromo shopUrl={settings.shopifyStoreUrl} />
      {SHOP_ENABLED && (
        <ShopGrid
          products={featuredProducts}
          shopUrl={settings.shopifyStoreUrl}
        />
      )}
      <Community items={community} />
      <Footer settings={settings} />
    </main>
  );
}
