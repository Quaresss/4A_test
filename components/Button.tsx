"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        variant === "primary" &&
          "rounded-[20px] bg-accent px-[60px] py-5 text-center font-sans text-[length:var(--text-primary-btn)] font-bold leading-[1.3] text-on-accent disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
