import { AnimatedCTAButton } from "@/components/base/animated-cta-button";

interface BottomCTASectionProps {
  question?: string;
  buttonText?: string;
  backgroundImage?: string;
  link?: string;
}

export default function BottomCTASection({
  question = "What are your Aspirations?",
  buttonText = "Come talk to Us",
  backgroundImage = "/images/cta-background.jpg",
  link,
}: BottomCTASectionProps) {
  return (
    <section className="relative flex h-[550px] items-center justify-center overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-30"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />

      <div className="relative mx-auto flex max-w-[90rem] flex-col items-center justify-center px-4 text-center md:px-8">
        <h2
          className="mb-8 font-bold text-3xl text-white md:text-4xl lg:text-7xl"
          style={{ fontFamily: "Inter" }}
        >
          {question}
        </h2>
        <AnimatedCTAButton href={link}>{buttonText}</AnimatedCTAButton>
      </div>
    </section>
  );
}
