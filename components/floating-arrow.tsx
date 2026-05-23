import { ChevronDown } from "lucide-react";

const FloatingArrow = () => {
  return (
    <div
      className="group mt-8 flex w-full cursor-pointer justify-center md:mb-[26px]"
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
        className="animate-float transition-transform duration-300 group-active:translate-y-3 group-active:scale-90"
      />
    </div>
  );
};

export default FloatingArrow;
