import Image from "next/image";
import { Button } from "./ui/button";

const PuzzleHeroSection = ({ img, title }: any) => {
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
          className="text-[#739F46] text-2xl md:text-[50px] leading-[80px] font-bold "
          style={{
            fontFamily: "Inter",
          }}
        >
          {title}
        </p>
      </div> */}
      <div className="max-w-[90rem] mx-auto flex relative justify-center md:h-[551px] md:justify-between items-start w-full flex-wrap md:gap-2 gap-10 px-4 md:px-8 pb-4 pt-4 lg:pt-12">
        <div className="w-full flex flex-col md:max-w-[400px] lg:max-w-[420px] xl:max-w-[520px] gap-5">
          <p
            className="text-[#000000] font-medium 
      text-[clamp(24px,4vw,55px)] 
      leading-[1.2] mb-[-34px] md:mb-3  xl:mb-4"
          >
            Have you ever considered selling your business?{" "}
          </p>
        </div>

        <div className="md:absolute inset-0 top-24 h-full w-full px-4 md:px-8">
          <img
            src={img}
            alt="Diagram"
            className="w-full h-auto object-contain max-w-none lg:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PuzzleHeroSection;
