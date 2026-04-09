"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { formatTimerParts } from "@/shared/lib/money";
import { SITE_ASSETS } from "@/shared/site-assets";
import { cn } from "@/shared/lib/cn";

export type TimerProps = {
  secondsLeft: number;
  urgent: boolean;
  className?: string;
};

export function Timer({ secondsLeft, urgent, className }: TimerProps) {
  const { m, s } = formatTimerParts(secondsLeft);
  const expired = secondsLeft <= 0;

  const digitClass = expired
    ? "text-white"
    : urgent
      ? "text-timer-urgent animate-timer-blink"
      : "text-timer-gold";

  const starFilterStyle: CSSProperties | undefined = expired
    ? { filter: "brightness(0) invert(1)" }
    : urgent
      ? {
          filter:
            "brightness(0) saturate(100%) invert(32%) sepia(95%) saturate(7500%) hue-rotate(346deg) brightness(101%) contrast(101%)",
        }
      : undefined;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 whitespace-nowrap wide:gap-2",
        className,
      )}
      role="timer"
      aria-live="polite"
      aria-label={
        expired
          ? "Время акции истекло"
          : `Осталось ${m} минут ${s} секунд`
      }
    >
      <Image
        src={SITE_ASSETS.star}
        alt=""
        width={14}
        height={14}
        className="size-[14px] shrink-0"
        style={starFilterStyle}
        unoptimized
      />
      <div
        className={cn(
          "flex items-center gap-1.5 font-[family-name:var(--font-raleway)] text-[clamp(1.75rem,5vw,2.5rem)] font-bold uppercase leading-none max-[321px]:text-[32px] wide:gap-[6px] wide:text-[40px]",
          digitClass,
        )}
        style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
      >
        <span className="leading-[1.1]">{m}</span>
        <span className="translate-y-px leading-[1.3]">:</span>
        <span className="leading-[1.1]">{s}</span>
      </div>
      <Image
        src={SITE_ASSETS.star}
        alt=""
        width={14}
        height={14}
        className="size-[14px] shrink-0"
        style={starFilterStyle}
        unoptimized
      />
    </div>
  );
}
