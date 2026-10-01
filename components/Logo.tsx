import Image from "next/image";
import { assets } from "@/lib/copy";

// Single source of truth for the logo image.
const sizes = {
  sm: "size-9", // header
  md: "size-10", // hero top bar
  lg: "size-14", // footer
  xl: "size-20 md:size-28", // Vanta promo
};

export default function Logo({ size = "sm" }: { size?: keyof typeof sizes }) {
  return (
    <Image
      src={assets.logo}
      alt="Site logo"
      width={2000}
      height={2000}
      sizes="112px"
      className={`${sizes[size]} object-contain`}
    />
  );
}
