import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { copy } from "@/lib/copy";
import type { FeaturedProduct } from "@/lib/types";

type Props = { products: FeaturedProduct[]; shopUrl: string };

export default function ShopGrid({ products, shopUrl }: Props) {
  return (
    <section className="bg-ink px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl tracking-wide md:text-6xl">
              {copy.shop.heading}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-widest text-cream/70">
              {copy.shop.subheading}
            </p>
          </div>
          <Button variant="solid" size="sm" href={shopUrl}>
            {copy.shop.cta}
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.name}
              image={p.image}
              title={p.name}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
