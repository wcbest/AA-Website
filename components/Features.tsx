"use client";

import {
  ArrowBigRightDash,
  ArrowRight,
  ChevronRight,
  LocateIcon,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
// import { TiLocationArrow } from "react-icons/ti";

interface BentoTiltProps {
  children: any;
  className?: string;
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<any>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }: any) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<any>(null);

  const handleMouseMove = (event: any) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full hover:opacity-70">
      <Image
        fill
        alt="title"
        src={src}
        // loop
        // muted
        // autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
        // loading="lazy"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
        <div>
          <h1 className="bento-title text-xs md:text-3xl special-font">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div className="flex items-center gap-1">
            <p className="w-max flex items-center mb-5 relative ms-10 text-sm uppercase text-white after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white cursor-pointer">
              Expand
            </p>
            <ChevronRight className="mb-5 z-20 text-zinc-50" size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="max-w-[90rem] mx-auto px-4 md:px-8">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Sector-Specific Expertise for Sustainable Growth
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          We specialize in delivering tailored solutions for diverse industries.
        </p>
      </div>

      <BentoTilt className="border-hsla bento-tilt_1 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src={"/images/pexels-energepic-com-27411-159888.jpg"}
          title={<> Financial Services</>}
          description="Optimize risk management, compliance, and growth strategies."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src={"/images/pexels-davidmcbee-1546168.jpg"}
            title={<>Real Estate & Hospitality</>}
            description="Unlock value in property development and tourism."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src={"/images/pexels-vividcafe-681335.jpg"}
            title="Sustainability & Strategy"
            description="Align operations with long-term goals."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src={"/images/pexels-Inter-shimazaki-5668842.jpg"}
            title={<>Mergers & Acquisitions</>}
            description="Navigate complex deals with precision."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="border-hsla bento-tilt_1 relative mb-7 h-96 w-full overflow-hidden rounded-md col-span-2 md:h-[65vh]">
          <BentoCard
            src={"/images/pexels-ron-lach-9870217.jpg"}
            title={<>Supporting Services</>}
            description="Legal, valuation, and post-transaction integration."
            isComingSoon
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
