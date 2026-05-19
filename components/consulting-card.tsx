"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  const getColorClass = (color?: "green" | "gray" | "gold") => {
    switch (color) {
      case "green":
        return "text-[#1a5928]";
      case "gold":
        return "text-[#c59446]";
      case "gray":
      default:
        return "text-gray-800";
    }
  };

  return (
    <div
      className={`rounded-[20px] overflow-hidden flex flex-col transition-all duration-500 ease-in-out transform ${
        isExpanded ? "md:col-span-2 lg:col-span-3" : "scale-100"
      }`}
    >
      {isExpanded ? (
        // Expanded State
        <div className="flex flex-col md:flex-row animate-fadeIn">
          <div className="relative h-full md:w-96">
            <div className="relative h-48 w-full overflow-hidden group">
              <Image
                src={image || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover  transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-[#026B20]">
              <h3
                className="text-[#fff] font-bold text-xl md:text-2xl mb-3 "
                style={{ fontFamily: "Inter" }}
              >
                {title}
              </h3>
              <p
                className="text-[#F7FAFE] font-normal text-sm md:text-base mb-6 flex-1 "
                style={{ fontFamily: "Inter" }}
              >
                {description}
              </p>
              <div className="flex w-full justify-center items-center">
                {isExpanded ? (
                  <Button
                    style={{ fontFamily: "Inter" }}
                    onClick={onToggle}
                    variant="outline"
                    className="border-2 border-[#fff] text-[#fff] hover:bg-[#026B20] hover:text-white rounded-full px-8 py-2 w-fit bg-transparent"
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    style={{ fontFamily: "Inter" }}
                    onClick={onToggle}
                    variant="outline"
                    className="border-2 border-[#fff] text-[#fff] hover:bg-[#026B20] hover:text-white rounded-full px-8 py-2 w-fit bg-transparent"
                  >
                    Read More
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 pt-8 px-8 bg-white">
            {/* <h3 className="text-[#739F46] font-medium text-2xl mb-4">
              {title}
            </h3> */}
            <p
              className="text-[#636466] font-normal text-sm md:text-2xl mb-6 leading-relaxed"
              style={{ fontFamily: "Inter" }}
            >
              {expandedDescription}
            </p>

            <div className="space-y-4">
              {details.map((detail, index) => (
                <div key={index}>
                  <h4
                    className={`
                    font-semibold text-base mb-1 text-[#739F46]`}
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
          <div className="relative h-48 w-full overflow-hidden group">
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col bg-[#026B20] transition-all duration-300 hover:scale-[1.01]">
            <h3
              className="text-[#fff] font-bold text-xl md:text-2xl mb-3 "
              style={{ fontFamily: "Inter" }}
            >
              {title}
            </h3>
            <p
              className="text-[#F7FAFE] font-normal text-sm md:text-base mb-6 flex-1 "
              style={{ fontFamily: "Inter" }}
            >
              {description}
            </p>
            {visible && (
              <Button
                style={{ fontFamily: "Inter" }}
                onClick={onToggle}
                variant="outline"
                className="border-2 border-[#fff] text-[#fff] hover:bg-[#026B20] hover:text-white rounded-full px-8 py-2 w-fit bg-transparent"
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
