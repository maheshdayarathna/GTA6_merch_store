import Image from "next/image";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import { assets, copy } from "@/lib/copy";

type Props = { shopUrl: string };

export default function VantaPromo({ shopUrl }: Props) {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center justify-center overflow-hidden px-5 py-20">
      <Image
        src={assets.vantaBackground}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <Logo size="xl" />
        <h2 className="font-display text-4xl tracking-wide md:text-6xl">
          {copy.vanta.heading}
        </h2>
        <Button variant="solid" href={shopUrl}>
          {copy.vanta.cta}
        </Button>
      </div>
    </section>
  );
}
