export function getPhoneDigits(value: string): string {
  return (value || '').replace(/\D/g, '');
}

export function formatPhoneInput(value: string): string {
  const digits = getPhoneDigits(value);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
