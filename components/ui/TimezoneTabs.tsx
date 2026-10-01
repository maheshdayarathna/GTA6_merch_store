type Option = { code: string; label: string; tz: string };
type Props = {
  options: Option[];
  value: string; // active option code
  onChange: (code: string) => void;
};

export default function TimezoneTabs({ options, value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Release time zone"
      className="flex flex-row items-center gap-2 md:flex-col md:items-stretch"
    >
      {options.map((o) => {
        const active = o.code === value;
        return (
          <button
            key={o.code}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(o.code)}
            className={`rounded-full px-5 py-2 text-center font-display tracking-widest transition ${
              active
                ? "bg-cream text-ink text-2xl md:py-3 md:text-3xl"
                : "bg-white/10 text-cream/50 text-lg hover:text-cream/80"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
