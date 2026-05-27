import type { ReactNode } from "react";

interface ExpandableCardProps {
  isExpanded: boolean;
  /** Content shown in the collapsed (default) state. Fills the card below the image. */
  collapsedContent: ReactNode;
  /** Left column content in expanded state (image + info panel). Fixed at md:w-96. */
  expandedLeft: ReactNode;
  /** Right column content in expanded state. Takes remaining width. */
  expandedRight: ReactNode;
}

/**
 * Shell used by ConsultingCard and LeadershipCard.
 * Owns: rounded-[20px] wrapper, grid-span expand behaviour,
 * animate-fadeIn layout switch, md:w-96 left column.
 */
export function ExpandableCard({
  isExpanded,
  collapsedContent,
  expandedLeft,
  expandedRight,
}: ExpandableCardProps) {
  return (
    <div
      className={`flex transform flex-col overflow-hidden rounded-[20px] transition-all duration-500 ease-in-out ${
        isExpanded ? "md:col-span-2 lg:col-span-3" : "scale-100"
      }`}
    >
      {isExpanded ? (
        <div className="flex animate-fadeIn flex-col md:flex-row">
          <div className="relative h-full md:w-96">{expandedLeft}</div>
          <div className="flex-1 bg-white px-8 pt-8">{expandedRight}</div>
        </div>
      ) : (
        collapsedContent
      )}
    </div>
  );
}
