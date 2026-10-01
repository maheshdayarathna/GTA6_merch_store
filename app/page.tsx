import Community from "@/components/sections/Community";
import Explore from "@/components/sections/Explore";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import ShopGrid from "@/components/sections/ShopGrid";
import VantaPromo from "@/components/sections/VantaPromo";
import {
  communityItems,
  featuredProducts,
  newsArticles,
  siteSettings,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <main>
      <Hero settings={siteSettings} />
      <Explore articles={newsArticles} />
      <VantaPromo shopUrl={siteSettings.shopifyStoreUrl} />
      <ShopGrid
        products={featuredProducts}
        shopUrl={siteSettings.shopifyStoreUrl}
      />
      <Community items={communityItems} />
      <Footer settings={siteSettings} />
    </main>
  );
}
