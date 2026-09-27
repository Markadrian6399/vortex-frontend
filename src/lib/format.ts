import { format as formatDecimal, type Decimal } from "@/lib/decimal";

const DEFAULT_LOCALE = "en-US";

function resolveLocale(locale?: string): string {
  if (locale) return locale;

  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }

  return DEFAULT_LOCALE;
}

export function formatCurrency(
  value: number,
  locale?: string,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat(resolveLocale(locale), {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
}

/**
 * Formats a token amount. Pass a `Decimal` (or decimal string) for money
 * values: it is handed to Intl as an exact numeric string, so 18-decimal
 * amounts are never rounded through a float.
 */
export function formatTokenAmount(
  value: number | string | Decimal,
  locale?: string,
  options: Intl.NumberFormatOptions = {},
) {
  const input = typeof value === "object" ? formatDecimal(value) : value;
  // Intl.NumberFormat.format accepts exact numeric strings (ES2023).
  return new Intl.NumberFormat(resolveLocale(locale), options).format(input as number);
}
