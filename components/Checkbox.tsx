"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className"
> & {
  label: ReactNode;
  error?: boolean;
  className?: string;
};

export function Checkbox({
  id,
  label,
  error,
  className = "",
  checked,
  ...rest
}: CheckboxProps) {
  const isOn = Boolean(checked);

  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-[12px]",
        error &&
          "rounded-xl ring-2 ring-sale ring-offset-2 ring-offset-page-bg",
        className,
      )}
    >
      <div className="relative shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          {...rest}
        />
        <label
          htmlFor={id}
          className={cn(
            "flex size-[30px] cursor-pointer items-center justify-center rounded border-2 bg-card-bg transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-page-bg wide:size-[32px]",
            error ? "border-sale" : "border-border-muted",
          )}
        >
          {isOn ? (
            <svg
              viewBox="0 0 16 12"
              className="h-3 w-4 text-accent"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M1 6l4.5 5L15 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </label>
      </div>
      <label
        htmlFor={id}
        className="min-w-0 max-w-[605px] cursor-pointer font-sans text-[length:var(--text-consent)] leading-[1.1] text-checkbox-label"
      >
        {label}
      </label>
    </div>
  );
}
