"use client";

import { useMemo, useState } from "react";
import type { Tariff } from "@/shared/types/tariff";
import { tariffReactKey } from "@/shared/lib/get-tariffs";
import { TariffCard } from "@/components/TariffCard";
import Image from "next/image";
import { SITE_ASSETS } from "@/shared/site-assets";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { cn } from "@/shared/lib/cn";

export type TariffListProps = {
  tariffs: Tariff[];
  timerExpired: boolean;
  priceRevealPulse?: boolean;
};

export function TariffList({
  tariffs,
  timerExpired,
  priceRevealPulse,
}: TariffListProps) {
  const [selectedKey, setSelectedKey] = useState(() => {
    const best = tariffs.find((t) => t.is_best);
    if (best) return tariffReactKey(best);
    return tariffReactKey(tariffs[0]);
  });
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const { featured, compact } = useMemo(() => {
    const f = tariffs.find((t) => t.is_best) ?? tariffs[0];
    const c = tariffs.filter((t) => tariffReactKey(t) !== tariffReactKey(f!));
    return { featured: f!, compact: c };
  }, [tariffs]);

  const consentId = "offer-consent";

  return (
    <div className="mx-auto w-full min-w-0 max-w-[748px] min-[1440px]:mx-0 min-[1440px]:w-[748px] min-[1440px]:max-w-none min-[1440px]:shrink-0">
      {featured ? (
        <TariffCard
          tariff={featured}
          selected={selectedKey === tariffReactKey(featured)}
          onSelect={() => {
            setSelectedKey(tariffReactKey(featured));
            setConsentError(false);
          }}
          timerExpired={timerExpired}
          priceRevealPulse={priceRevealPulse}
          variant="featured"
          className={cn(
            "min-[1440px]:mb-[14px]",
            compact.length > 0
              ? "mb-2 max-[321px]:mb-1.5"
              : "mb-[12px] max-[321px]:mb-[10px]",
          )}
        />
      ) : null}

      <div
        className={cn(
          "grid w-full grid-cols-1 gap-2 max-[321px]:gap-[6px] min-[322px]:max-[1439px]:gap-2",
          compact.length > 0
            ? "mb-[12px] max-[321px]:mb-[10px]"
            : "max-[1439px]:mb-0",
          "min-[1440px]:mb-5 min-[1440px]:w-[748px] min-[1440px]:grid-cols-3 min-[1440px]:gap-[14px]",
        )}
      >
        {compact.map((t, index) => (
          <div
            key={tariffReactKey(t)}
            className="w-full min-w-0 min-[1440px]:flex-none min-[1440px]:w-auto"
          >
            <TariffCard
              tariff={t}
              selected={selectedKey === tariffReactKey(t)}
              onSelect={() => {
                setSelectedKey(tariffReactKey(t));
                setConsentError(false);
              }}
              timerExpired={timerExpired}
              variant="compact"
              compactSaleTopClass={
                index === 0 ? "min-[1440px]:-top-[3px]" : "min-[1440px]:-top-0.5"
              }
            />
          </div>
        ))}
      </div>

      <div className="mb-6 flex w-full max-w-[600px] gap-[8px] rounded-[20px] bg-surface-elevated px-5 py-[18px] max-[321px]:mb-4 min-[1440px]:mb-[30px] min-[1440px]:max-w-none min-[1440px]:px-[20px] min-[1440px]:py-[18px]">
        <div className="relative h-[24px] w-[22px] shrink-0 overflow-hidden">
          <Image
            src={SITE_ASSETS.alertIcon}
            alt=""
            width={22}
            height={24}
            className="absolute left-0 top-0 h-full w-full max-w-none object-contain"
            unoptimized
          />
        </div>
        <p className="max-w-[427px] font-['Montserrat',sans-serif] text-[length:var(--text-offer-alert)] font-normal leading-[1.3] text-white">
          Следуя плану на 3 месяца и более, люди получают в&nbsp;2 раза лучший
          результат, чем за 1 месяц
        </p>
      </div>

      <Checkbox
        id={consentId}
        checked={consent}
        error={consentError}
        onChange={(e) => {
          setConsent(e.target.checked);
          if (e.target.checked) setConsentError(false);
        }}
        className="mb-[20px] max-w-full max-[321px]:mb-4 min-[1440px]:mb-4"
        label={
          <>
            <span className="leading-[1.1]">Я согласен с </span>
            <a
              href="#"
              className="leading-[1.1] underline decoration-solid [text-decoration-skip-ink:none]"
            >
              офертой рекуррентных платежей
            </a>
            <span className="leading-[1.1]"> и </span>
            <a
              href="#"
              className="leading-[1.1] underline decoration-solid [text-decoration-skip-ink:none]"
            >
              Политикой конфиденциальности
            </a>
          </>
        }
      />

      <Button
        type="button"
        className="animate-buy-blink mb-[20px] w-full max-[321px]:mb-[10px] min-[1440px]:mb-[14px] min-[1440px]:w-[352px]"
        onClick={() => {
          if (!consent) {
            setConsentError(true);
            return;
          }
          setConsentError(false);
        }}
      >
        Купить
      </Button>

      <p className="mb-[25px] max-w-[748px] font-['Montserrat',sans-serif] text-[length:var(--text-legal-disclaimer)] font-normal leading-[1.2] text-legal-muted max-[321px]:mb-[22px] min-[1440px]:mb-0 min-[1440px]:w-[748px]">
        Нажимая кнопку «Купить», Пользователь соглашается на разовое списание
        денежных средств для получения пожизненного доступа к приложению.
        Пользователь соглашается, что данные кредитной/дебетовой карты будут
        сохранены для осуществления покупок дополнительных услуг сервиса в случае
        желания пользователя.
      </p>
    </div>
  );
}
