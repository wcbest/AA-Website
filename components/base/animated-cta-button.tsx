"use client";

import * as motion from "motion/react-client";
import type { ReactNode } from "react";

interface AnimatedCTAButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

const ArrowIcon = () => (
  <motion.svg
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
  >
    <title>arrow right</title>
    <g fill="none" fillRule="nonzero">
      <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.105.074.014.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.092.01-.009.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
      <path
        fill="#3C3C3C"
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.005 3.758a1 1 0 0 1 1.32-.084l.094.084 3.535 3.535a1 1 0 0 1 .083 1.32l-.083.094-3.535 3.536a1 1 0 0 1-1.498-1.32l.084-.094 1.828-1.83H7.757a1 1 0 0 1-.116-1.992L7.757 11h6.076l-1.828-1.828a1 1 0 0 1 0-1.414Z"
      />
    </g>
  </motion.svg>
);

const buttonClass =
  "flex items-center justify-between gap-4 rounded-full border border-[#2C2C2C] bg-[#F2BA00] px-8 py-2 transition-colors duration-300 hover:bg-[#cc9f53]";

const motionProps = {
  whileHover: { scale: 1.05, backgroundColor: "#e6b400" },
  whileTap: { scale: 0.95 },
};

export function AnimatedCTAButton({
  children,
  href,
  onClick,
}: AnimatedCTAButtonProps) {
  const label = (
    <span className="font-medium text-[#3C3C3C] text-base">{children}</span>
  );

  if (href) {
    return (
      <motion.a
        {...(motionProps as any)}
        href={href}
        target="_blank"
        rel="noopener"
        className={buttonClass}
      >
        {label}
        <ArrowIcon />
      </motion.a>
    );
  }

  return (
    <motion.button
      {...(motionProps as any)}
      onClick={onClick}
      className={buttonClass}
    >
      {label}
      <ArrowIcon />
    </motion.button>
  );
}
