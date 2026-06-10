/** Копейки → «1 200 000 ₽» (неразрывные пробелы из локали ru-RU). */
export function rub(kopecks: number): string {
  return `${Math.round(kopecks / 100).toLocaleString('ru-RU')} ₽`;
}

/** Рубли → копейки (для отправки на бэкенд). */
export function toKopecks(rubles: number): number {
  return Math.round(rubles * 100);
}
