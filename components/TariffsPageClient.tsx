"use client";

import { useEffect, useState } from "react";
import type { Tariff } from "@/shared/types/tariff";
import { Header } from "@/components/Header";
import { TariffList } from "@/components/TariffList";
import Image from "next/image";
import { SITE_ASSETS } from "@/shared/site-assets";
import { cn } from "@/shared/lib/cn";

const TIMER_SECONDS = 120;

function useOfferTimer() {
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [priceRevealPulse, setPriceRevealPulse] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 0) return 0;
        const next = s - 1;
        if (next === 0) {
          queueMicrotask(() => setPriceRevealPulse(true));
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!priceRevealPulse) return;
    const t = window.setTimeout(() => setPriceRevealPulse(false), 700);
    return () => window.clearTimeout(t);
  }, [priceRevealPulse]);

  const expired = secondsLeft <= 0;
  const urgent = !expired && secondsLeft <= 30;

  return { secondsLeft, expired, urgent, priceRevealPulse };
}

export function TariffsPageClient({ tariffs }: { tariffs: Tariff[] }) {
  const { secondsLeft, expired, urgent, priceRevealPulse } = useOfferTimer();

  return (
    <div className="flex min-h-screen flex-col bg-page-bg">
      <Header secondsLeft={secondsLeft} urgent={urgent} />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-12 pt-6 wide:px-[112px] wide:pb-24 wide:pt-0">
        <h1 className="mb-5 mt-0 text-start text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[0.4px] text-white max-[321px]:mb-6 max-[321px]:text-[22px] wide:mb-[110px] wide:mt-[50px] wide:text-left wide:text-[40px] wide:font-bold wide:leading-[1.1] wide:tracking-[0.4px] wide:whitespace-nowrap">
          Выбери подходящий для себя{" "}
          <span className="text-accent">тариф</span>
        </h1>

        <div className="flex flex-col items-center gap-0 wide:flex-row wide:items-start wide:gap-[87px]">
          <div
            className={cn(
              "relative mx-auto shrink-0 overflow-hidden",
              "wide:mx-0 wide:mt-[52px] wide:h-[767px] wide:w-[381px] wide:max-w-none",
              "max-[320px]:mx-auto max-[320px]:h-[200px] max-[320px]:w-[99px] max-[320px]:max-w-none",
              "min-[321px]:max-[375px]:mx-auto min-[321px]:max-[375px]:h-[250px] min-[321px]:max-[375px]:w-[124px] min-[321px]:max-[375px]:max-w-none",
              "min-[376px]:max-wide:w-full min-[376px]:max-wide:max-w-[381px]",
            )}
          >
            <div
              className={cn(
                "relative h-full w-full overflow-hidden wide:aspect-auto wide:h-[767px]",
                "min-[321px]:max-[375px]:aspect-auto",
                "min-[376px]:max-wide:aspect-[381/767] min-[376px]:max-wide:w-full",
                "max-[320px]:aspect-auto",
              )}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <Image
                  src={SITE_ASSETS.hero}
                  alt=""
                  width={381}
                  height={767}
                  className="absolute inset-0 h-full w-full max-w-none object-contain object-top"
                  priority
                  unoptimized
                />
              </div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden h-[80px] w-full max-w-[381px] bg-linear-to-b from-page-bg/0 to-page-bg wide:block"
              aria-hidden
            />
          </div>

          <TariffList
            tariffs={tariffs}
            timerExpired={expired}
            priceRevealPulse={priceRevealPulse}
          />
        </div>

        <section className="mx-auto mt-0 flex max-w-[1216px] flex-col gap-[10px] rounded-[30px] border border-border-muted p-[12px] wide:mt-[66px] wide:gap-[30px] wide:p-5">
          <div className="inline-flex w-[294px] max-w-full shrink-0 justify-center rounded-[30px] border border-guarantee bg-surface-elevated px-[18px] pb-[12px] pt-[10px] wide:w-auto wide:max-w-none wide:justify-start">
            <p className="whitespace-nowrap font-sans text-[length:var(--text-guarantee-title)] font-medium leading-[1.2] text-guarantee">
              гарантия возврата 30 дней
            </p>
          </div>
          <p className="max-w-[1176px] font-sans text-[length:var(--text-guarantee-body)] font-normal leading-[1.3] text-muted-foreground">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые
            результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
            деньги в течение 30 дней с момента покупки, если ты не получишь
            видимых результатов.
          </p>
        </section>
      </main>
    </div>
  );
}
