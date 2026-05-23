"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { data } from "../data/carousel";

const Billboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_isTransitioning, setIsTransitioning] = useState(false);

  const prevSlide = () => {
    const imageCount = data?.length || 0;
    if (imageCount === 0) return;

    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const imageCount = data?.length || 0;
    if (imageCount === 0) return;

    setIsTransitioning(true);
    const isLastSlide = currentIndex === data?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 500); // This should match the transition duration
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSlide();
    }, 5000); // Change every 5s

    return () => clearTimeout(timeout); // Clear previous timeout
  }, [nextSlide]);

  const _goToSlide = (slideIndex: any) => {
    const imageCount = data?.length || 0;
    if (imageCount === 0) return;

    setCurrentIndex(slideIndex);
  };

  return (
    <div className="group relative flex h-[633px] w-full items-center justify-center rounded-full">
      {data?.map((slide: any, index: any) => (
        <img
          key={index}
          src={slide.url || "/images/photo1666102737.jpeg"}
          alt={slide.alt || "African Aspirations"}
          className={`absolute top-0 left-0 h-full w-full rounded-[40px] object-cover transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Subtle overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}

      {/* Text block with angled white shape */}
      {/* <div className="bg-white  absolute z-20 -left-2 md:left-0 -bottom-20 md:w-[750px] md:h-[300px] py-6 md:py-10 pr-12 pl-2 md:pl-2 clip-path-shape">
        <div className="relative h-full ">
          <p
            className=" text-3xl md:text-[69px] md:leading-[65px] font-bold text-[#A6A6A6]"
            style={{
              fontFamily: "Inter",
            }}
          >
            Realising the <br />
            Global <span className=" text-[#F2BA00]">Aspirations</span>
            <br />
            of Africans.
          </p>
        </div>
      </div> */}

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-5 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/30 p-3 text-2xl text-white transition hover:bg-black/50 group-hover:flex">
        <ArrowLeft onClick={prevSlide} size={28} />
      </div>

      <div className="absolute top-1/2 right-5 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/30 p-3 text-2xl text-white transition hover:bg-black/50 group-hover:flex">
        <ArrowRight onClick={nextSlide} size={28} />
      </div>
      {/* Gold gradient bar */}
      {/* <div className="absolute z-10 bottom-0 h-[8px] w-full bg-gradient-to-r from-[#F2BA00] to-[#000000] mt-2 rounded-r-full"></div> */}
    </div>
  );
};

export default Billboard;
