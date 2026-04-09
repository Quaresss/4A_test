"use client";

import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary";
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  const base =
    variant === "primary"
      ? "rounded-[20px] bg-accent px-[60px] py-5 text-center font-['Montserrat',sans-serif] text-[length:var(--text-primary-btn)] font-bold leading-[1.3] text-[#191e1f] disabled:pointer-events-none disabled:opacity-50"
      : "";

  return (
    <button type={type} className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
