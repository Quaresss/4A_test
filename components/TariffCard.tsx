"use client";

import type { Tariff } from "@/shared/types/tariff";
import { discountPercent, formatRub } from "@/shared/lib/money";
import { cn } from "@/shared/lib/cn";

export type TariffCardProps = {
  tariff: Tariff;
  selected: boolean;
  onSelect: () => void;
  timerExpired: boolean;
  priceRevealPulse?: boolean;
  variant: "featured" | "compact";
  compactSaleTopClass?: string;
  className?: string;
};

const articleMobileLikeFeatured =
  "max-[1439px]:w-full max-[1439px]:min-w-0 max-[1439px]:h-[131px] max-[1439px]:max-w-full max-[1439px]:overflow-hidden max-[1439px]:py-[2px] max-[1439px]:px-[30px] max-[1439px]:min-h-0";

const featuredArticleClass = cn(
  "flex w-full flex-col rounded-[20px]",
  articleMobileLikeFeatured,
  "px-[18px] pb-[30px] pt-[34px] max-[321px]:px-0 max-[321px]:py-0 max-[321px]:pt-[20px] max-[321px]:pb-[20px] max-[321px]:pl-[20px] max-[321px]:pr-[11px] min-[1440px]:h-[190px] min-[1440px]:w-full min-[1440px]:max-w-[748px] min-[1440px]:min-h-0 min-[1440px]:shrink-0 min-[1440px]:items-end min-[1440px]:justify-center min-[1440px]:overflow-visible min-[1440px]:rounded-[34px] min-[1440px]:px-0 min-[1440px]:pl-[122px] min-[1440px]:pr-[80px] min-[1440px]:pb-[30px] min-[1440px]:pt-[34px]",
);

const compactArticleClass = cn(
  "flex w-full max-w-full flex-col rounded-[20px]",
  articleMobileLikeFeatured,
  "px-[18px] pb-[30px] pt-[34px] max-[321px]:px-0 max-[321px]:py-0 max-[321px]:pt-[20px] max-[321px]:pb-[20px] max-[321px]:pl-[20px] max-[321px]:pr-[11px] min-[1440px]:items-center min-[1440px]:px-[18px] min-[1440px]:pb-[23px] min-[1440px]:pt-[70px] min-[1440px]:h-[335px] min-[1440px]:w-[240px] min-[1440px]:max-w-none min-[1440px]:min-h-0 min-[1440px]:overflow-visible min-[1440px]:rounded-[40px]",
);

function OldPrice({
  amount,
  formatAmount = formatRub,
}: {
  amount: number;
  formatAmount?: (n: number) => string;
}) {
  return (
    <span className="relative inline-grid justify-items-end leading-[0]">
      <span className="whitespace-nowrap font-['Montserrat',sans-serif] text-[length:var(--text-tariff-old)] font-normal leading-[1.2] text-old-price">
        {formatAmount(amount)}
      </span>
      <span
        className="pointer-events-none absolute left-0 right-0 top-[length:var(--tariff-old-strike-offset)] h-[2px] bg-old-price"
        aria-hidden
      />
    </span>
  );
}

function PriceColumn({
  tariff,
  timerExpired,
  priceRevealPulse,
  accentPrice,
  align = "start",
  formatAmount = formatRub,
}: {
  tariff: Tariff;
  timerExpired: boolean;
  priceRevealPulse?: boolean;
  accentPrice: boolean;
  align?: "start" | "center" | "end";
  formatAmount?: (n: number) => string;
}) {
  const alignCls =
    align === "center"
      ? "items-start text-left min-[1440px]:items-center min-[1440px]:text-center"
      : align === "end"
        ? "items-end text-right"
        : "items-start text-left";

  const absPos =
    align === "end"
      ? "right-0 left-auto"
      : align === "center"
        ? "left-0 w-max max-w-full min-[1440px]:right-0 min-[1440px]:w-full"
        : "left-0";

  return (
    <div
      className={cn(
        "relative flex w-full max-w-full flex-col justify-start",
        "max-[1439px]:w-max max-[1439px]:max-w-full",
        alignCls,
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-0 transition-opacity duration-500 ease-in-out",
          alignCls,
          timerExpired ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <p
          className={cn(
            "whitespace-nowrap font-['Montserrat',sans-serif] text-[length:var(--text-tariff-price)] font-semibold max-[1439px]:leading-[1.05] min-[1440px]:leading-none",
            accentPrice ? "text-accent" : "text-white",
          )}
        >
          {formatAmount(tariff.price)}
        </p>
        {!timerExpired ? (
          <span
            className={
              align === "center"
                ? "max-[1439px]:self-start min-[1440px]:self-end"
                : undefined
            }
          >
            <OldPrice amount={tariff.full_price} formatAmount={formatAmount} />
          </span>
        ) : null}
      </div>
      <div
        className={cn(
          "absolute top-0 flex flex-col transition-opacity duration-500 ease-in-out",
          absPos,
          alignCls,
          align === "end"
            ? "w-max max-w-full"
            : align === "center"
              ? "w-max max-w-full min-[1440px]:w-full"
              : "w-full",
          timerExpired ? "opacity-100" : "pointer-events-none opacity-0",
          timerExpired && priceRevealPulse ? "animate-price-reveal" : "",
        )}
      >
        <p className="whitespace-nowrap font-['Montserrat',sans-serif] text-[length:var(--text-tariff-price)] font-semibold max-[1439px]:leading-[1.05] min-[1440px]:leading-none text-white">
          {formatAmount(tariff.full_price)}
        </p>
      </div>
    </div>
  );
}

function FeaturedBody({
  tariff,
  timerExpired,
  priceRevealPulse,
}: {
  tariff: Tariff;
  timerExpired: boolean;
  priceRevealPulse?: boolean;
}) {
  const displayedPrice = timerExpired ? tariff.full_price : tariff.price;
  const priceDigitLen = String(Math.trunc(Math.abs(displayedPrice))).length;
  const priceToDescGapMax320 =
    priceDigitLen >= 5
      ? "max-[321px]:gap-[12px]"
      : priceDigitLen === 4
        ? "max-[321px]:gap-[30px]"
        : "max-[321px]:gap-[48px]";
  const priceToDescGap321to1439 =
    priceDigitLen >= 5
      ? "min-[321px]:max-[1439px]:gap-[30px]"
      : priceDigitLen === 4
        ? "min-[321px]:max-[1439px]:gap-[50px]"
        : "min-[321px]:max-[1439px]:gap-[70px]";
  const mobilePriceToDescGap = cn(
    priceToDescGapMax320,
    priceToDescGap321to1439,
  );

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full min-w-0 flex-1 flex-col gap-10 max-[1439px]:flex-row max-[1439px]:items-center max-[1439px]:overflow-visible",
        mobilePriceToDescGap,
        "min-[1440px]:w-auto min-[1440px]:max-w-full min-[1440px]:flex-row min-[1440px]:items-center min-[1440px]:justify-start min-[1440px]:gap-[50px] min-[1440px]:overflow-visible",
      )}
    >
      <div className="flex flex-col gap-4 px-[18px] max-[1439px]:w-auto max-[1439px]:max-w-full max-[1439px]:shrink-0 max-[1439px]:items-start max-[321px]:gap-3 min-[321px]:max-[374px]:gap-1 min-[375px]:max-[1439px]:gap-4 max-[1439px]:px-0 max-[1439px]:pl-1 min-[1440px]:min-w-0 min-[1440px]:items-center min-[1440px]:gap-4 min-[1440px]:px-0">
        <p className="text-center text-[length:var(--text-tariff-period)] font-medium leading-[1.2] text-white max-[1439px]:text-start">
          {tariff.period}
        </p>
        <PriceColumn
          tariff={tariff}
          timerExpired={timerExpired}
          priceRevealPulse={priceRevealPulse}
          accentPrice={tariff.is_best}
          align="center"
        />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 justify-center overflow-hidden py-2.5 max-[1439px]:py-0 min-[1440px]:w-[328px] min-[1440px]:shrink-0 min-[1440px]:items-start min-[1440px]:justify-center min-[1440px]:overflow-visible min-[1440px]:py-[10px]">
        <p className="w-full max-w-[328px] text-center text-[length:var(--text-tariff-desc)] font-normal leading-[1.3] text-white max-[1439px]:line-clamp-2 max-[1439px]:text-start min-[1440px]:text-left min-[1440px]:leading-[1.3]">
          {tariff.text}
        </p>
      </div>
    </div>
  );
}

function CompactBody({
  tariff,
  timerExpired,
  priceRevealPulse,
}: {
  tariff: Tariff;
  timerExpired: boolean;
  priceRevealPulse?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center max-[1439px]:flex-row max-[1439px]:items-center max-[1439px]:gap-[50px] max-[1439px]:overflow-hidden min-[1440px]:flex-col min-[1440px]:gap-10 min-[1440px]:overflow-visible">
      <div className="flex w-full max-[1439px]:min-w-0 max-[1439px]:flex-1 flex-col items-center gap-[30px] px-[18px] max-[1439px]:flex-row max-[1439px]:items-center max-[1439px]:gap-2 max-[1439px]:px-0 min-[1440px]:flex-col min-[1440px]:gap-[30px] min-[1440px]:px-[18px]">
        <p className="text-center text-[length:var(--text-tariff-period)] font-medium leading-[1.2] text-white max-[1439px]:shrink-0 max-[1439px]:text-start">
          {tariff.period}
        </p>
        <div className="flex w-full max-[1439px]:w-auto max-[1439px]:shrink-0 flex-col items-center">
          <PriceColumn
            tariff={tariff}
            timerExpired={timerExpired}
            priceRevealPulse={priceRevealPulse}
            accentPrice={false}
            align="center"
          />
        </div>
      </div>
      <div className="flex w-full max-w-[204px] items-start justify-start self-start max-[1439px]:min-h-0 max-[1439px]:min-w-0 max-[1439px]:max-w-none max-[1439px]:flex-1">
        <p className="w-full text-start text-[length:var(--text-tariff-desc)] font-normal leading-[1.3] text-white max-[1439px]:line-clamp-2 min-[1440px]:line-clamp-none">
          {tariff.text}
        </p>
      </div>
    </div>
  );
}

export function TariffCard({
  tariff,
  selected,
  onSelect,
  timerExpired,
  priceRevealPulse,
  variant,
  compactSaleTopClass,
  className,
}: TariffCardProps) {
  const pct = discountPercent(tariff.price, tariff.full_price);
  const isFeatured = variant === "featured";
  const saleTopCompact = compactSaleTopClass ?? "min-[1440px]:-top-0.5";
  const showSaleBadge = !timerExpired && pct > 0;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "relative cursor-pointer border-2 border-solid bg-card-bg font-['Montserrat',sans-serif] outline-none transition-[box-shadow,transform] duration-200 hover:brightness-[1.02] focus-visible:ring-2 focus-visible:ring-accent",
        selected ? "border-accent" : "border-border-muted",
        isFeatured ? featuredArticleClass : compactArticleClass,
        className,
      )}
    >
      {showSaleBadge ? (
        <div
          className={cn(
            "absolute flex items-center justify-center overflow-hidden border-0 bg-sale outline-none ring-0",
            "max-[1439px]:h-[27px] max-[1439px]:w-[48px] max-[321px]:h-[23px] max-[321px]:w-[42px] max-[1439px]:rounded-none max-[1439px]:rounded-b-[8px] max-[1439px]:p-0",
            "min-[1440px]:h-auto min-[1440px]:w-auto min-[1440px]:rounded-bl-lg min-[1440px]:rounded-br-lg min-[1440px]:px-2 min-[1440px]:py-[5px]",
            "top-0 max-[1439px]:left-auto",
            isFeatured
              ? "max-[1439px]:right-[62px] max-[321px]:right-[50px] min-[1440px]:left-[50px] min-[1440px]:right-auto"
              : cn(
                  "max-[1439px]:right-[36px] max-[321px]:right-[28px] min-[1440px]:left-[49px] min-[1440px]:right-auto",
                  saleTopCompact,
                ),
          )}
          aria-hidden
        >
          <span className="font-[family-name:var(--font-sale-badge)] font-medium text-white max-[1439px]:text-[length:var(--text-tariff-sale-pct)] max-[1439px]:leading-none min-[1440px]:text-[length:var(--text-tariff-sale-pct)] min-[1440px]:leading-[1.3]">
            -{pct}%
          </span>
        </div>
      ) : null}

      {tariff.is_best ? (
        <p className="absolute max-[1439px]:right-[14px] max-[1439px]:top-[6px] min-[1440px]:left-[682px] min-[1440px]:right-auto min-[1440px]:top-[10px] text-[length:var(--text-tariff-hit)] font-medium leading-[1.3] tracking-[0.66px] text-accent">
          хит!
        </p>
      ) : null}

      {isFeatured ? (
        <FeaturedBody
          tariff={tariff}
          timerExpired={timerExpired}
          priceRevealPulse={priceRevealPulse}
        />
      ) : (
        <>
          <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col min-[1440px]:hidden">
            <FeaturedBody
              tariff={tariff}
              timerExpired={timerExpired}
              priceRevealPulse={priceRevealPulse}
            />
          </div>
          <div className="hidden min-h-0 w-full min-[1440px]:flex min-[1440px]:h-full min-[1440px]:flex-1 min-[1440px]:flex-col">
            <CompactBody
              tariff={tariff}
              timerExpired={timerExpired}
              priceRevealPulse={priceRevealPulse}
            />
          </div>
        </>
      )}
    </article>
  );
}
