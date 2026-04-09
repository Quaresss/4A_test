import { TariffsPageClient } from "@/components/TariffsPageClient";
import { getTariffs } from "@/shared/lib/get-tariffs";

export default async function Home() {
  let tariffs;
  try {
    tariffs = await getTariffs();
  } catch {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page-bg px-6 text-center text-white">
        <p>Не удалось загрузить тарифы. Попробуйте обновить страницу.</p>
      </div>
    );
  }

  if (!tariffs.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page-bg px-6 text-center text-white">
        <p>Список тарифов пуст.</p>
      </div>
    );
  }

  return <TariffsPageClient tariffs={tariffs} />;
}
