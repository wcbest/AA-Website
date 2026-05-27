"use client";

import { CardImage } from "@/components/base/card-image";
import { ExpandableCard } from "@/components/base/expandable-card";
import { Button } from "@/components/ui/button";

export interface ConsultingCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  expandedDescription: string;
  details: Array<{
    title: string;
    description: string;
    color?: "green" | "gray" | "gold";
  }>;
  isExpanded: boolean;
  onToggle: () => void;
  visible?: boolean;
}

export default function ConsultingCard({
  title,
  description,
  image,
  imageAlt,
  expandedDescription,
  details,
  isExpanded,
  onToggle,
  visible = true,
}: ConsultingCardProps) {
  const actionButton = (
    <Button
      style={{ fontFamily: "Inter" }}
      onClick={onToggle}
      variant="outline"
      className="w-fit rounded-full border-2 border-[#fff] bg-transparent px-8 py-2 text-[#fff] hover:bg-[#026B20] hover:text-white"
    >
      {isExpanded ? "Close" : "Read More"}
    </Button>
  );

  return (
    <ExpandableCard
      isExpanded={isExpanded}
      collapsedContent={
        <>
          <CardImage src={image} alt={imageAlt} heightClass="h-48" />
          <div className="flex flex-1 flex-col bg-[#026B20] p-6 transition-all duration-300 hover:scale-[1.01]">
            <h3
              className="mb-3 font-bold text-[#fff] text-xl md:text-2xl"
              style={{ fontFamily: "Inter" }}
            >
              {title}
            </h3>
            <p
              className="mb-6 flex-1 font-normal text-[#F7FAFE] text-sm md:text-base"
              style={{ fontFamily: "Inter" }}
            >
              {description}
            </p>
            {visible && (
              <div className="flex w-full items-center justify-center">
                {actionButton}
              </div>
            )}
          </div>
        </>
      }
      expandedLeft={
        <>
          <CardImage src={image} alt={imageAlt} heightClass="h-48" />
          <div className="flex flex-1 flex-col bg-[#026B20] p-6">
            <h3
              className="mb-3 font-bold text-[#fff] text-xl md:text-2xl"
              style={{ fontFamily: "Inter" }}
            >
              {title}
            </h3>
            <p
              className="mb-6 flex-1 font-normal text-[#F7FAFE] text-sm md:text-base"
              style={{ fontFamily: "Inter" }}
            >
              {description}
            </p>
            <div className="flex w-full items-center justify-center">
              {actionButton}
            </div>
          </div>
        </>
      }
      expandedRight={
        <>
          <p
            className="mb-6 font-normal text-[#636466] text-sm leading-relaxed md:text-2xl"
            style={{ fontFamily: "Inter" }}
          >
            {expandedDescription}
          </p>
          <div className="space-y-4">
            {details.map((detail, index) => (
              <div key={index}>
                <h4
                  className="mb-1 font-semibold text-[#739F46] text-base"
                  style={{ fontFamily: "Inter" }}
                >
                  {detail.title}
                </h4>
                <p className="text-[#000] text-sm" style={{ fontFamily: "Inter" }}>
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}
