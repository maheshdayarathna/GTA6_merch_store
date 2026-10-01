/* eslint-disable @next/next/no-img-element */
type Props = { image: string; title: string; price: string };

export default function ProductCard({ image, title, price }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white text-ink shadow-lg">
      <div className="aspect-square bg-zinc-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="text-sm font-semibold">{price}</span>
      </div>
    </article>
  );
}
