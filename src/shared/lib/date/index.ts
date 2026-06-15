/** ISO-дата (YYYY-MM-DD) → «8 сентября 2025 года». */
export function formatRuDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) + ' года';
}
