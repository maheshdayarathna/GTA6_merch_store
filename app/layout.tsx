import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import { copy } from "@/lib/copy";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: copy.brand, template: `%s | ${copy.brand}` },
  description: "Fan-made news, countdown, and merch hub. Unofficial.",
  openGraph: {
    title: copy.brand,
    description: "Fan-made news, countdown, and merch hub. Unofficial.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${anton.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
