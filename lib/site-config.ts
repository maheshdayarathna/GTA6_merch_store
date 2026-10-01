export const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "License", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Media Kit", href: "#" },
  { label: "Contact Us", href: "#" },
];

export type SocialIconName =
  | "youtube"
  | "x"
  | "instagram"
  | "tiktok"
  | "linktree";

export const socialLinks: {
  icon: SocialIconName;
  href: string;
  label: string;
}[] = [
  { icon: "youtube", href: "#", label: "YouTube" },
  { icon: "x", href: "#", label: "X" },
  { icon: "instagram", href: "#", label: "Instagram" },
  { icon: "tiktok", href: "#", label: "TikTok" },
  { icon: "linktree", href: "#", label: "Linktree" }, // placeholder href
];
