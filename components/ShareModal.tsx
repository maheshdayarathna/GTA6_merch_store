"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChatIcon,
  CloseIcon,
  CodeIcon,
  FacebookIcon,
  LinkIcon,
  MessageIcon,
  XIcon,
} from "./ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  shareText: string;
  // Returns a PNG of the countdown section (html-to-image), or null on failure.
  capture: () => Promise<Blob | null>;
};

type Target = {
  key: string;
  label: string;
  icon: ReactNode;
  color: string;
  run: () => void | Promise<void>;
};

export default function ShareModal({ open, onClose, shareText, capture }: Props) {
  const [image, setImage] = useState<{ blob: Blob; url: string } | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [notice, setNotice] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const captureRef = useRef(capture);
  captureRef.current = capture;

  // Capture the countdown snapshot each time the modal opens.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let objectUrl: string | null = null;
    setCapturing(true);
    setNotice("");
    captureRef
      .current()
      .then((blob) => {
        if (cancelled || !blob) return;
        objectUrl = URL.createObjectURL(blob);
        setImage({ blob, url: objectUrl });
      })
      .catch(() => {})
      .finally(() => !cancelled && setCapturing(false));
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setImage(null);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const pageUrl = window.location.origin + "/";
  const text = `${shareText} ${pageUrl}`;
  const enc = encodeURIComponent;

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  };

  const copy = async (value: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(value);
      flash(msg);
    } catch {
      flash("Copy failed. Please copy manually.");
    }
  };

  // Native share sheet with the snapshot attached, when the platform supports
  // files. Returns false when we should fall back to a plain link.
  const shareWithImage = async (): Promise<boolean> => {
    if (!image || !navigator.share || !navigator.canShare) return false;
    const file = new File([image.blob], "countdown.png", { type: "image/png" });
    if (!navigator.canShare({ files: [file] })) return false;
    try {
      await navigator.share({ files: [file], text });
    } catch {
      /* user cancelled */
    }
    return true;
  };

  const openUrl = (u: string) => {
    window.open(u, "_blank", "noopener,noreferrer");
  };

  const targets: Target[] = [
    {
      key: "embed",
      label: "Embed",
      icon: <CodeIcon className="size-6" />,
      color: "bg-zinc-700",
      run: () =>
        copy(
          `<iframe src="${pageUrl}" width="800" height="600" style="border:0" title="Countdown"></iframe>`,
          "Embed code copied",
        ),
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: <ChatIcon className="size-6" />,
      color: "bg-green-600",
      run: async () => {
        if (!(await shareWithImage())) openUrl(`https://wa.me/?text=${enc(text)}`);
      },
    },
    {
      key: "messages",
      label: "Messages",
      icon: <MessageIcon className="size-6" />,
      color: "bg-emerald-500",
      run: async () => {
        if (!(await shareWithImage())) window.location.href = `sms:?&body=${enc(text)}`;
      },
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: <FacebookIcon className="size-6" />,
      color: "bg-blue-600",
      // Link only: Facebook builds the preview from the page's Open Graph image.
      run: () =>
        openUrl(`https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`),
    },
    {
      key: "x",
      label: "X",
      icon: <XIcon className="size-5" />,
      color: "bg-black ring-1 ring-white/30",
      run: () =>
        openUrl(
          `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(pageUrl)}`,
        ),
    },
    {
      key: "copy",
      label: "Copy Link",
      icon: <LinkIcon className="size-6" />,
      color: "bg-zinc-700",
      run: () => copy(pageUrl, "Link copied"),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-0 sm:place-items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl bg-zinc-900 p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-wide">SHARE</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-black/50">
          {image ? (
            <img src={image.url} alt="Countdown snapshot" className="h-full w-full object-contain" />
          ) : (
            <div className="grid h-full place-items-center text-xs text-cream/60">
              {capturing ? "Capturing countdown..." : "Preview unavailable. Link will be shared instead."}
            </div>
          )}
        </div>

        <ul className="grid grid-cols-3 gap-4">
          {targets.map((t) => (
            <li key={t.key}>
              <button
                type="button"
                onClick={() => void t.run()}
                className="flex w-full flex-col items-center gap-2 text-xs font-semibold"
              >
                <span className={`grid size-14 place-items-center rounded-full text-white ${t.color}`}>
                  {t.icon}
                </span>
                {t.label}
              </button>
            </li>
          ))}
        </ul>

        <p role="status" className="mt-4 h-4 text-center text-xs text-sun">
          {notice}
        </p>
      </div>
    </div>
  );
}
