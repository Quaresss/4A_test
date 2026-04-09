export function formatRub(amount: number): string {
  return `${amount} ₽`;
}

export function discountPercent(price: number, fullPrice: number): number {
  if (fullPrice <= 0) return 0;
  return Math.round(((fullPrice - price) / fullPrice) * 100);
}

export function formatTimerParts(totalSeconds: number): {
  m: string;
  s: string;
} {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return {
    m: m.toString().padStart(2, "0"),
    s: sec.toString().padStart(2, "0"),
  };
}
