import * as motion from "motion/react-client";

interface BottomCTASectionProps {
  question?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  link?: string;
}

export default function BottomCTASection({
  question = "What are your Aspirations?",
  buttonText = "Come talk to Us",
  buttonLink = "#contact",
  backgroundImage = "/images/cta-background.jpg",
  link,
}: BottomCTASectionProps) {
  return (
    <section className="relative bg-gray-900 overflow-hidden flex justify-center items-center h-[550px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />

      {/* Content */}
      <div className="relative max-w-[90rem] mx-auto px-4 md:px-8 flex justify-center items-center flex-col text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-7xl font-bold text-white mb-8"
          style={{ fontFamily: "Inter" }}
        >
          {question}
        </h2>
        {/* <a
          href={buttonLink}
          className="inline-flex items-center gap-2 bg-[#f5c842] hover:bg-[#e6b933] text-gray-900 font-semibold px-8 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </a> */}

        <motion.a
          whileHover={{
            scale: 1.05,
            backgroundColor: "#e6b400",
          }}
          href={link}
          target="_blank"
          whileTap={{ scale: 0.95 }}
          className="bg-[#F2BA00] border border-[#2C2C2C] flex items-center justify-between gap-4 rounded-full px-8 py-2 hover:bg-[#cc9f53] transition-colors duration-300"
        >
          <span className="text-[#3C3C3C] font-medium text-base">
            {buttonText}
          </span>

          <motion.svg
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
          >
            <title>arrow_right_circle_line</title>
            <g id="arrow_right_circle_line" fill="none" fillRule="nonzero">
              <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.105.074.014.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.092.01-.009.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
              <path
                fill="#3C3C3C"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.005 3.758a1 1 0 0 1 1.32-.084l.094.084 3.535 3.535a1 1 0 0 1 .083 1.32l-.083.094-3.535 3.536a1 1 0 0 1-1.498-1.32l.084-.094 1.828-1.83H7.757a1 1 0 0 1-.116-1.992L7.757 11h6.076l-1.828-1.828a1 1 0 0 1 0-1.414Z"
              />
            </g>
          </motion.svg>
        </motion.a>
      </div>
    </section>
  );
}
