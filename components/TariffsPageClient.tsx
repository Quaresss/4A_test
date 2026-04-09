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
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-12 pt-6 min-[1440px]:px-[112px] min-[1440px]:pb-24 min-[1440px]:pt-0">
        <h1 className="mb-5 mt-0 text-start text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[0.4px] text-white max-[321px]:mb-6 max-[321px]:text-[22px] min-[1440px]:mb-[110px] min-[1440px]:mt-[50px] min-[1440px]:text-left min-[1440px]:text-[40px] min-[1440px]:font-bold min-[1440px]:leading-[1.1] min-[1440px]:tracking-[0.4px] min-[1440px]:whitespace-nowrap">
          Выбери подходящий для себя{" "}
          <span className="text-accent">тариф</span>
        </h1>

        <div className="flex flex-col items-center gap-0 min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:gap-[87px]">
          <div
            className={cn(
              "relative mx-auto shrink-0 overflow-hidden",
              "min-[1440px]:mx-0 min-[1440px]:mt-[52px] min-[1440px]:h-[767px] min-[1440px]:w-[381px] min-[1440px]:max-w-none",
              "[@media(max-width:320px)]:mx-auto [@media(max-width:320px)]:h-[200px] [@media(max-width:320px)]:w-[99px] [@media(max-width:320px)]:max-w-none",
              "[@media(min-width:321px)_and_(max-width:375px)]:mx-auto [@media(min-width:321px)_and_(max-width:375px)]:h-[250px] [@media(min-width:321px)_and_(max-width:375px)]:w-[124px] [@media(min-width:321px)_and_(max-width:375px)]:max-w-none",
              "min-[376px]:max-[1439px]:w-full min-[376px]:max-[1439px]:max-w-[381px]",
            )}
          >
            <div
              className={cn(
                "relative h-full w-full overflow-hidden min-[1440px]:aspect-auto min-[1440px]:h-[767px]",
                "[@media(min-width:321px)_and_(max-width:375px)]:aspect-auto",
                "min-[376px]:max-[1439px]:aspect-[381/767] min-[376px]:max-[1439px]:w-full",
                "[@media(max-width:320px)]:aspect-auto",
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
              className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden h-[80px] w-full max-w-[381px] bg-gradient-to-b from-[rgba(35,40,41,0)] to-page-bg min-[1440px]:block"
              aria-hidden
            />
          </div>

          <TariffList
            tariffs={tariffs}
            timerExpired={expired}
            priceRevealPulse={priceRevealPulse}
          />
        </div>

        <section className="mx-auto mt-0 flex max-w-[1216px] flex-col gap-[10px] rounded-[30px] border border-border-muted p-[12px] min-[1440px]:mt-[66px] min-[1440px]:gap-[30px] min-[1440px]:p-5">
          <div className="inline-flex w-[294px] max-w-full shrink-0 justify-center rounded-[30px] border border-guarantee bg-surface-elevated px-[18px] pb-[12px] pt-[10px] min-[1440px]:w-auto min-[1440px]:max-w-none min-[1440px]:justify-start">
            <p className="whitespace-nowrap font-['Montserrat',sans-serif] text-[length:var(--text-guarantee-title)] font-medium leading-[1.2] text-guarantee">
              гарантия возврата 30 дней
            </p>
          </div>
          <p className="max-w-[1176px] font-['Montserrat',sans-serif] text-[length:var(--text-guarantee-body)] font-normal leading-[1.3] text-[color:var(--text-muted-on-dark)]">
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
