import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function SectionContainer({
  children,
  className,
  as: Tag = "div",
}: SectionContainerProps) {
  return (
    <Tag className={cn("mx-auto max-w-[90rem] px-4 md:px-8", className)}>
      {children}
    </Tag>
  );
}
