import type { SocialIconName } from "@/lib/site-config";
import {
  InstagramIcon,
  LinktreeIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "./icons";

const map = {
  youtube: YouTubeIcon,
  x: XIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  linktree: LinktreeIcon,
};

type Props = { icon: SocialIconName; href: string; label?: string };

export default function SocialIcon({ icon, href, label }: Props) {
  const Icon = map[icon];
  return (
    <a
      href={href}
      aria-label={label ?? icon}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="grid size-11 place-items-center rounded-full bg-white/10 text-cream transition hover:bg-accent hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Icon className="size-5" />
    </a>
  );
}
