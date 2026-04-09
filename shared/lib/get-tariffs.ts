import type { Tariff } from "@/shared/types/tariff";

const TARIFFS_URL = "https://t-core.fit-hub.pro/Test/GetTariffs";

const DISPLAY_ORDER = ["Навсегда", "3 месяца", "1 месяц", "1 неделя"] as const;

function sortKey(period: string): number {
  const i = DISPLAY_ORDER.indexOf(period as (typeof DISPLAY_ORDER)[number]);
  return i === -1 ? 999 : i;
}

export async function getTariffs(): Promise<Tariff[]> {
  const res = await fetch(TARIFFS_URL, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`GetTariffs failed: ${res.status}`);
  }
  const data = (await res.json()) as Tariff[];
  return [...data].sort((a, b) => sortKey(a.period) - sortKey(b.period));
}

export function tariffReactKey(t: Tariff): string {
  return `${t.id}-${t.period}`;
}
