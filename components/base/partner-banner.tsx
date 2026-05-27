import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { SectionContainer } from "./section-container";

interface PartnerBannerProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  /** Tailwind background class(es). Defaults to the dark green used on the home page. */
  backgroundClassName?: string;
  className?: string;
}

/**
 * Full-width dark banner split into two columns.
 * Left: logo / image. Right: headline + supporting copy.
 * Used on the home page (solid dark green) and the brokerage page (gradient).
 */
export function PartnerBanner({
  leftContent,
  rightContent,
  backgroundClassName = "bg-[#004714]",
  className,
}: PartnerBannerProps) {
  return (
    <div
      className={cn(
        "relative h-[500px] w-full overflow-hidden md:h-[369px]",
        backgroundClassName,
        className,
      )}
    >
      <SectionContainer className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="relative flex items-center justify-center">
          {leftContent}
        </div>
        <div className="flex flex-col justify-center text-white">
          {rightContent}
        </div>
      </SectionContainer>
    </div>
  );
}
