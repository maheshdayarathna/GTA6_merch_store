// Real IANA identifiers so Intl.DateTimeFormat handles DST. No hardcoded offsets.
export type TimezoneOption = { code: string; label: string; tz: string };

export const timezones: TimezoneOption[] = [
  { code: "UK", label: "UK", tz: "Europe/London" },
  { code: "US", label: "US", tz: "America/New_York" },
  { code: "JP", label: "JP", tz: "Asia/Tokyo" },
  { code: "AU", label: "AU", tz: "Australia/Sydney" },
];
