export function formatDecimal(value: string): string {
  const match = value.replace(',', '.').match(/^\d{0,3}(\.\d{0,2})?/);

  return match?.[0] ?? '';
}
