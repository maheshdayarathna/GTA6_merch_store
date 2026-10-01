import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  variant: "solid" | "outline";
  size?: "sm" | "md";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
};

const variants = {
  solid: "bg-black text-cream ring-1 ring-white/20 hover:ring-white/50",
  outline: "bg-black text-cream border-2 border-accent hover:bg-accent/20",
};
const sizes = {
  sm: "px-5 py-2 text-xs",
  md: "px-8 py-3 text-sm",
};

export default function Button({
  variant,
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
  children,
}: Props) {
  const cls = `inline-flex items-center justify-center rounded-full font-bold uppercase tracking-widest transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} className={cls} rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
