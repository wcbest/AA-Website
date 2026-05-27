import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface FooterLinkProps {
  href?: string;
  children: ReactNode;
  bold?: boolean;
  external?: boolean;
  className?: string;
}

export function FooterLink({
  href,
  children,
  bold = false,
  external = false,
  className,
}: FooterLinkProps) {
  const base = cn(
    "group relative inline-block text-[15px] text-white transition-colors duration-300 hover:text-[#007426]",
    bold ? "font-bold" : "font-extralight",
    className,
  );

  const underline = (
    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full" />
  );

  if (!href) {
    return (
      <span className={base}>
        {children}
        {underline}
      </span>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={base}>
        {children}
        {underline}
      </a>
    );
  }

  return (
    <Link href={href} className={base}>
      {children}
      {underline}
    </Link>
  );
}
