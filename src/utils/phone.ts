/**
 * Formats a phone number as 05XX XXX XXXX
 */
export const formatPhone = (val: string): string => {
  const digits = val.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
};

/**
 * Validates that the phone number matches 05XXXXXXXXX (11 digits starting with 05)
 */
export const isValidPhone = (val: string): boolean =>
  /^05\d{9}$/.test(val.replace(/\D/g, ""));

/**
 * Returns only digits from a phone string
 */
export const cleanPhone = (val: string): string => val.replace(/\D/g, "");
