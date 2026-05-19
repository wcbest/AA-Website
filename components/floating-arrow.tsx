import { ChevronDown } from "lucide-react";
import React from "react";

const FloatingArrow = () => {
  return (
    <div
      className="flex justify-center w-full md:mb-[26px] cursor-pointer group mt-8"
      onClick={() => {
        window.scrollBy({
          top: 250, // scrolls down a little
          behavior: "smooth", // smooth scroll
        });
      }}
    >
      <ChevronDown
        size={39}
        color="#739F46"
        className="transition-transform duration-300 group-active:translate-y-3 group-active:scale-90 animate-float"
      />
    </div>
  );
};

export default FloatingArrow;
