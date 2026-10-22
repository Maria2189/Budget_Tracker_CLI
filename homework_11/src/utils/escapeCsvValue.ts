const CSV_SPECIAL_CHARS: RegExp = /[",'\r\n]/;

export function escapeCsvValue(value: string | number): string {
  const text: string = String(value);
  if (!CSV_SPECIAL_CHARS.test(text)) {
    return text;
  }
  return `"${text.replace(/"/g, '""')}"`;
}
