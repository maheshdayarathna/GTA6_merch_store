"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import TextInput from "@/components/ui/TextInput";
import Logo from "@/components/Logo";
import { copy } from "@/lib/copy";
import { footerLinks, socialLinks } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/types";

type Props = { settings: SiteSettings };

export default function Footer({ settings }: Props) {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-white/10 bg-black px-5 py-14 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Logo size="lg" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-cream/80 hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-cream/50">{copy.disclaimer}</p>
        </div>

        <div className="flex flex-col gap-4">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextInput
              type="email"
              placeholder="youremail@xyz.com"
              value={email}
              onChange={setEmail}
            />
            <Button variant="solid" type="submit">
              Join
            </Button>
          </form>
          {/* Phase 2: swap for the real provider embed */}
          <p className="text-xs text-cream/50">{settings.mailingListEmbed}</p>
          <ul className="mt-2 flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <li key={s.icon}>
                <SocialIcon icon={s.icon} href={s.href} label={s.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
