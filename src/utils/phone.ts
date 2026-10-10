import { cleanPhone } from "../../supabase/functions/_shared/quote-validation";
export { cleanPhone, isValidPhone } from "../../supabase/functions/_shared/quote-validation";

/** Accept local and +90/0090 numbers, then display 05XX XXX XXXX. */
export const formatPhone = (val: string): string => {
  const digits = cleanPhone(val);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
};
