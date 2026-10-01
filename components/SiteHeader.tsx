import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import { copy } from "@/lib/copy";

export default function SiteHeader({ shopUrl }: { shopUrl: string }) {
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-10">
      <Link href="/" className="flex items-center gap-3 font-display tracking-wide">
        <Logo size="sm" />
        <span className="hidden sm:inline">{copy.brand}</span>
      </Link>
      <Button variant="solid" size="sm" href={shopUrl}>
        {copy.hero.shop}
      </Button>
    </header>
  );
}
