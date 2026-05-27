import { AnimatedCTAButton } from "@/components/base/animated-cta-button";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

const BottomHero = ({
  title,
  buttonTitle,
  backgroundImage,
  titleContainerClass,
  link,
}: any) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.a
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp as any}
      className="relative flex h-[633px] items-end md:items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      href={link}
      target="_blank"
      rel="noopener"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="mx-auto w-full max-w-[90rem] px-4 md:px-8">
        <div className={cn("relative z-10 max-w-[471px] space-y-8", titleContainerClass)}>
          <p
            className="font-bold text-3xl text-white leading-snug md:text-[54px]"
            style={{ fontFamily: "Inter" }}
          >
            {title}
          </p>
          <AnimatedCTAButton>{buttonTitle}</AnimatedCTAButton>
        </div>
      </div>
    </motion.a>
  );
};

export default BottomHero;
