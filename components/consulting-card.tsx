"use client";

import Image from "next/image";
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
  const _getColorClass = (color?: "green" | "gray" | "gold") => {
    switch (color) {
      case "green":
        return "text-[#1a5928]";
      case "gold":
        return "text-[#c59446]";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div
      className={`flex transform flex-col overflow-hidden rounded-[20px] transition-all duration-500 ease-in-out ${
        isExpanded ? "md:col-span-2 lg:col-span-3" : "scale-100"
      }`}
    >
      {isExpanded ? (
        // Expanded State
        <div className="flex animate-fadeIn flex-col md:flex-row">
          <div className="relative h-full md:w-96">
            <div className="group relative h-48 w-full overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
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
                {isExpanded ? (
                  <Button
                    style={{ fontFamily: "Inter" }}
                    onClick={onToggle}
                    variant="outline"
                    className="w-fit rounded-full border-2 border-[#fff] bg-transparent px-8 py-2 text-[#fff] hover:bg-[#026B20] hover:text-white"
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    style={{ fontFamily: "Inter" }}
                    onClick={onToggle}
                    variant="outline"
                    className="w-fit rounded-full border-2 border-[#fff] bg-transparent px-8 py-2 text-[#fff] hover:bg-[#026B20] hover:text-white"
                  >
                    Read More
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white px-8 pt-8">
            {/* <h3 className="text-[#739F46] font-medium text-2xl mb-4">
              {title}
            </h3> */}
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
                    className={`mb-1 font-semibold text-[#739F46] text-base`}
                    style={{ fontFamily: "Inter" }}
                  >
                    {detail.title}
                  </h4>
                  <p
                    className="text-[#000] text-sm"
                    style={{ fontFamily: "Inter" }}
                  >
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Collapsed State
        <>
          <div className="group relative h-48 w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
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
              <Button
                style={{ fontFamily: "Inter" }}
                onClick={onToggle}
                variant="outline"
                className="w-fit rounded-full border-2 border-[#fff] bg-transparent px-8 py-2 text-[#fff] hover:bg-[#026B20] hover:text-white"
              >
                Read More
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
