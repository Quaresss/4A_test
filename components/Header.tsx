"use client";

import { Timer } from "@/components/Timer";

export type HeaderProps = {
  secondsLeft: number;
  urgent: boolean;
};

export function Header({ secondsLeft, urgent }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-header-strip py-2">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-1 px-4 min-[1440px]:max-w-none min-[1440px]:gap-1 min-[1440px]:px-0">
        <p
          className="whitespace-nowrap text-center text-lg font-semibold leading-[1.3] text-white max-[321px]:text-[14px] min-[1440px]:text-2xl min-[1440px]:leading-[1.3]"
          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
        >
          Успейте открыть пробную неделю
        </p>
        <Timer secondsLeft={secondsLeft} urgent={urgent} />
      </div>
    </header>
  );
}
