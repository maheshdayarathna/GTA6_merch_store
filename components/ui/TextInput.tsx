type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export default function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-full bg-cream px-5 py-3 text-sm text-ink placeholder:text-ink/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    />
  );
}
