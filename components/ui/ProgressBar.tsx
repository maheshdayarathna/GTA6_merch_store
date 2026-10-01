type Props = { percent: number };

export default function ProgressBar({ percent }: Props) {
  const pct = Math.min(100, Math.max(0, percent));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="relative h-8 w-full overflow-hidden rounded-full bg-white/15"
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet via-accent to-sun transition-[width] duration-700"
        style={{ width: `${pct}%` }}
      >
        {/* Label centered on the fill itself */}
        <span className="absolute inset-0 grid place-items-center text-xs font-bold text-white drop-shadow">
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}
