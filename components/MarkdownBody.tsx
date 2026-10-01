import type { ReactNode } from "react";

// Minimal renderer for the markdown-ish `body` stand-in: ## headings,
// "- " lists, paragraphs, **bold**. Phase 2 swaps this for Portable Text.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

export default function MarkdownBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  return (
    <div className="space-y-5 text-base leading-relaxed text-cream/85">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-6">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-2 font-display text-2xl tracking-wide text-cream">
              {block.slice(3)}
            </h2>
          );
        }
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}
