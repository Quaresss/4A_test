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
  "max-wide:w-full max-wide:min-w-0 max-wide:h-[131px] max-wide:max-w-full max-wide:overflow-hidden max-wide:py-[2px] max-wide:px-[30px] max-wide:min-h-0";

const featuredArticleClass = cn(
  "flex w-full flex-col rounded-[20px]",
  articleMobileLikeFeatured,
  "px-[18px] pb-[30px] pt-[34px] max-[321px]:px-0 max-[321px]:py-0 max-[321px]:pt-[20px] max-[321px]:pb-[20px] max-[321px]:pl-[20px] max-[321px]:pr-[11px] wide:h-[190px] wide:w-full wide:max-w-[748px] wide:min-h-0 wide:shrink-0 wide:items-end wide:justify-center wide:overflow-visible wide:rounded-[34px] wide:px-0 wide:pl-[122px] wide:pr-[80px] wide:pb-[30px] wide:pt-[34px]",
);

const compactArticleClass = cn(
  "flex w-full max-w-full flex-col rounded-[20px]",
  articleMobileLikeFeatured,
  "px-[18px] pb-[30px] pt-[34px] max-[321px]:px-0 max-[321px]:py-0 max-[321px]:pt-[20px] max-[321px]:pb-[20px] max-[321px]:pl-[20px] max-[321px]:pr-[11px] wide:items-center wide:px-[18px] wide:pb-[23px] wide:pt-[70px] wide:h-[335px] wide:w-[240px] wide:max-w-none wide:min-h-0 wide:overflow-visible wide:rounded-[40px]",
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
      <span className="whitespace-nowrap font-sans text-[length:var(--text-tariff-old)] font-normal leading-[1.2] text-old-price">
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
      ? "items-start text-left wide:items-center wide:text-center"
      : align === "end"
        ? "items-end text-right"
        : "items-start text-left";

  const absPos =
    align === "end"
      ? "right-0 left-auto"
      : align === "center"
        ? "left-0 w-max max-w-full wide:right-0 wide:w-full"
        : "left-0";

  return (
    <div
      className={cn(
        "relative flex w-full max-w-full flex-col justify-start",
        "max-wide:w-max max-wide:max-w-full",
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
            "whitespace-nowrap font-sans text-[length:var(--text-tariff-price)] font-semibold max-wide:leading-[1.05] wide:leading-none",
            accentPrice ? "text-accent" : "text-white",
          )}
        >
          {formatAmount(tariff.price)}
        </p>
        {!timerExpired ? (
          <span
            className={
              align === "center"
                ? "max-wide:self-start wide:self-end"
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
              ? "w-max max-w-full wide:w-full"
              : "w-full",
          timerExpired ? "opacity-100" : "pointer-events-none opacity-0",
          timerExpired && priceRevealPulse ? "animate-price-reveal" : "",
        )}
      >
        <p className="whitespace-nowrap font-sans text-[length:var(--text-tariff-price)] font-semibold max-wide:leading-[1.05] wide:leading-none text-white">
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
      ? "min-[321px]:max-wide:gap-[30px]"
      : priceDigitLen === 4
        ? "min-[321px]:max-wide:gap-[50px]"
        : "min-[321px]:max-wide:gap-[70px]";
  const mobilePriceToDescGap = cn(
    priceToDescGapMax320,
    priceToDescGap321to1439,
  );

  return (
    <div
      className={cn(
        "flex h-full min-h-0 w-full min-w-0 flex-1 flex-col gap-10 max-wide:flex-row max-wide:items-center max-wide:overflow-visible",
        mobilePriceToDescGap,
        "wide:w-auto wide:max-w-full wide:flex-row wide:items-center wide:justify-start wide:gap-[50px] wide:overflow-visible",
      )}
    >
      <div className="flex flex-col gap-4 px-[18px] max-wide:w-auto max-wide:max-w-full max-wide:shrink-0 max-wide:items-start max-[321px]:gap-3 min-[321px]:max-[374px]:gap-1 min-[375px]:max-wide:gap-4 max-wide:px-0 max-wide:pl-1 wide:min-w-0 wide:items-center wide:gap-4 wide:px-0">
        <p className="text-center text-[length:var(--text-tariff-period)] font-medium leading-[1.2] text-white max-wide:text-start">
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
      <div className="flex min-h-0 min-w-0 flex-1 justify-center overflow-hidden py-2.5 max-wide:py-0 wide:w-[328px] wide:shrink-0 wide:items-start wide:justify-center wide:overflow-visible wide:py-[10px]">
        <p className="w-full max-w-[328px] text-center text-[length:var(--text-tariff-desc)] font-normal leading-[1.3] text-white max-wide:line-clamp-2 max-wide:text-start wide:text-left wide:leading-[1.3]">
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
    <div className="flex h-full min-h-0 w-full flex-col items-center max-wide:flex-row max-wide:items-center max-wide:gap-[50px] max-wide:overflow-hidden wide:flex-col wide:gap-10 wide:overflow-visible">
      <div className="flex w-full max-wide:min-w-0 max-wide:flex-1 flex-col items-center gap-[30px] px-[18px] max-wide:flex-row max-wide:items-center max-wide:gap-2 max-wide:px-0 wide:flex-col wide:gap-[30px] wide:px-[18px]">
        <p className="text-center text-[length:var(--text-tariff-period)] font-medium leading-[1.2] text-white max-wide:shrink-0 max-wide:text-start">
          {tariff.period}
        </p>
        <div className="flex w-full max-wide:w-auto max-wide:shrink-0 flex-col items-center">
          <PriceColumn
            tariff={tariff}
            timerExpired={timerExpired}
            priceRevealPulse={priceRevealPulse}
            accentPrice={false}
            align="center"
          />
        </div>
      </div>
      <div className="flex w-full max-w-[204px] items-start justify-start self-start max-wide:min-h-0 max-wide:min-w-0 max-wide:max-w-none max-wide:flex-1">
        <p className="w-full text-start text-[length:var(--text-tariff-desc)] font-normal leading-[1.3] text-white max-wide:line-clamp-2 wide:line-clamp-none">
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
  const saleTopCompact = compactSaleTopClass ?? "wide:-top-0.5";
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
        "relative cursor-pointer border-2 border-solid bg-card-bg font-sans outline-none transition-[box-shadow,transform] duration-200 hover:brightness-[1.02] focus-visible:ring-2 focus-visible:ring-accent",
        selected ? "border-accent" : "border-border-muted",
        isFeatured ? featuredArticleClass : compactArticleClass,
        className,
      )}
    >
      {showSaleBadge ? (
        <div
          className={cn(
            "absolute flex items-center justify-center overflow-hidden border-0 bg-sale outline-none ring-0",
            "max-wide:h-[27px] max-wide:w-[48px] max-[321px]:h-[23px] max-[321px]:w-[42px] max-wide:rounded-none max-wide:rounded-b-[8px] max-wide:p-0",
            "wide:h-auto wide:w-auto wide:rounded-bl-lg wide:rounded-br-lg wide:px-2 wide:py-[5px]",
            "top-0 max-wide:left-auto",
            isFeatured
              ? "max-wide:right-[62px] max-[321px]:right-[50px] wide:left-[50px] wide:right-auto"
              : cn(
                  "max-wide:right-[36px] max-[321px]:right-[28px] wide:left-[49px] wide:right-auto",
                  saleTopCompact,
                ),
          )}
          aria-hidden
        >
          <span className="font-[family-name:var(--font-sale-badge)] font-medium text-white max-wide:text-[length:var(--text-tariff-sale-pct)] max-wide:leading-none wide:text-[length:var(--text-tariff-sale-pct)] wide:leading-[1.3]">
            -{pct}%
          </span>
        </div>
      ) : null}

      {tariff.is_best ? (
        <p className="absolute max-wide:right-[14px] max-wide:top-[6px] wide:left-[682px] wide:right-auto wide:top-[10px] text-[length:var(--text-tariff-hit)] font-medium leading-[1.3] tracking-[0.66px] text-accent">
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
          <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col wide:hidden">
            <FeaturedBody
              tariff={tariff}
              timerExpired={timerExpired}
              priceRevealPulse={priceRevealPulse}
            />
          </div>
          <div className="hidden min-h-0 w-full wide:flex wide:h-full wide:flex-1 wide:flex-col">
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
