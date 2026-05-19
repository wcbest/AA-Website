import { cn } from "@/lib/utils";
import { div } from "motion/react-client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const HeroSection = ({ img, title }: any) => {
  const [firstWord, ...rest] = title.split(" ");
  const secondPart = rest.join(" ");

  // 1. Check the combined length of the entire title (excluding spaces)
  const combinedLength =
    firstWord.length + secondPart.replace(/\s/g, "").length;

  // 2. Define the conditional font size class based on the combined length
  const isTitleLong = combinedLength > 18;

  // If the title is long, use md:text-6xl; otherwise, use md:text-8xl
  const mdSizeClass = isTitleLong ? "md:text-5xl" : "md:text-7xl";

  // Base classes that are always applied (mobile/sm sizes)
  const baseClasses = `block text-xl sm:text-6xl font-extrabold ${mdSizeClass}`;
  return (
    <div className="w-full">
      {/* <div className="py-4 md:py-[67px] w-full flex justify-center items-center border-b border-[#CCCCCCB2] max-w-[90rem] mx-auto px-4 md:px-8">
        <p
          className="text-[#739F46] text-2xl md:text-[85px] leading-[80px] font-bold "
          style={{
            fontFamily: "Inter",
          }}
        >
          {title}
        </p>
      </div> */}
      <div className="max-w-[90rem] mx-auto flex justify-center md:justify-between items-start w-full flex-wrap md:flex-nowrap md:gap-0 gap-10 px-4 md:px-8 pb-4 pt-14">
        <div className="w-full flex flex-col md:w-[871px] gap-5">
          <p className="text-[#000000] font-medium text-4xl md:text-[70px] md:leading-[60px] md:mb-4">
            Institutionalize your business without the overhead
          </p>
          <p className="text-[#81878A] font-normal text-2xl md:text-[40px] mb-2">
            We offer a one-stop shop for strategic, operational, and technical
            support .
          </p>
          <Button
            className="text-base font-bold rounded-full py-2 px-8 w-fit"
            style={{ fontFamily: "Inter" }}
          >
            Reach out to us
          </Button>
        </div>
        <div className="h-full w-full md:w-[596px]">
          <Image
            width={596}
            height={596}
            src={img}
            alt={"AA hero"}
            className="w-full h-full object-cover rounded-tr-[22px]"
            priority
          />{" "}
        </div>
      </div>
    </div>

    // <div className="relative  flex items-center justify-center h-[553px] w-full  group">
    //   <img
    //     src={img}
    //     alt={"AA hero"}
    //     className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500`}
    //   />

    //   {/* Subtle overlay */}
    //   {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}

    //   <div className="absolute z-20 top-[160px]">
    //     <img
    //       src={"/new_images/Rectangle 151 (1).png"}
    //       alt={"AA hero"}
    //       className={`absolute z-20 top-[210px] md:top-0 -left-10 md:left-0 max-h-[286px] max-w-[200px] md:max-w-[713px] object-cover transition-opacity duration-500`}
    //     />
    //     <img
    //       src={"/new_images/Rectangle 151.png"}
    //       alt={"AA hero"}
    //       className={`absolute z-10 top-[200px] md:-top-[10px] -left-6 md:left-[35px] max-w-[200px] max-h-[270px] md:max-w-[713px] object-cover transition-opacity duration-500`}
    //     />
    //     <div className="absolute z-30 bg-transparent top-[180px] md:top-1 -left-8 md:left-20 p-8 rounded-[40px]">
    //       <p className={cn("leading-none", baseClasses)}>
    //         <span
    //           className={cn(
    //             "block text-xl sm:text-6xl md:text-8xl font-extrabold text-[#1E1E1E]",
    //             baseClasses
    //           )}
    //           style={{ fontFamily: "Inter" }}
    //         >
    //           {firstWord}
    //         </span>
    //         <span
    //           className={cn(
    //             "block  text-xl sm:text-6xl md:text-8xl font-extrabold text-[#757575]",
    //             baseClasses
    //           )}
    //           style={{ fontFamily: "Inter" }}
    //         >
    //           {secondPart}
    //         </span>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HeroSection;
