"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomHero from "@/components/BottomHero";
import Billboard from "@/components/billboard";
import ClientNavbar from "@/components/client-navbar";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const highlightPercentages = (text: string) => {
    return text.replace(/(\d+%)/g, '<span class="text-[#739F46]">$1</span>');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <ClientNavbar />

      {/* Hero Section */}
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-start gap-10 px-4 pt-[100px] md:flex-nowrap md:px-8 md:pt-[200px]">
        {/* Left: text */}
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <h1
            className="font-bold text-3xl text-black leading-tight md:text-[70px]"
            style={{ fontFamily: "Inter" }}
          >
            <span className="block">Realising the Global</span>
            <span className="block">
              <span className="text-[#739F46]">Aspirations</span> of Africans.
            </span>
          </h1>

          <span
            className="font-normal text-black text-xl md:text-2xl"
            style={{ fontFamily: "Inter" }}
          >
            Whether you're building, scaling, or preparing to exit, we empower
            you to achieve your aspirations
          </span>

          <Button
            onClick={() => router.push("/about")}
            className="w-fit rounded-full border-2 border-[#015A1A] bg-white px-8 py-2 font-bold text-base text-black hover:bg-white"
            style={{ fontFamily: "Inter" }}
          >
            Learn more
          </Button>
        </div>

        {/* Right: billboard */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Billboard />
        </motion.div>
      </div>
      <FloatingArrow />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="relative mx-auto mt-[125px] flex max-w-[90rem] flex-wrap items-center gap-6 px-4 md:mt-0 md:flex-nowrap md:gap-[68px] md:px-8"
      >
        <motion.div
          variants={scaleUp as any}
          className="w-full md:h-[548px] md:max-w-[1100px]"
        >
          <Image
            src={"/new_images/The-Republic-Cover-Landscape-Image-Card-5 1.svg"}
            width={235}
            height={235}
            alt="AA globe"
            className="h-full w-[788px]"
          />
        </motion.div>

        <div className="right-0 left-0 flex w-full flex-wrap items-start justify-between px-4 md:absolute md:top-5 md:flex-nowrap md:px-8">
          <div className="absolute top-0 left-4 z-10 mt-2 h-[4px] w-[286px] rounded-r-full bg-gradient-to-r from-[#739F46] to-[#739F46] md:left-8"></div>

          <p
            className="mb-2 pt-5 font-bold text-[#000000] text-[50px]"
            style={{
              fontFamily: "Inter",
            }}
          >
            Why African Aspirations Matters
          </p>
          <div className="flex flex-col md:w-[669px]">
            {[
              {
                id: 1,
                text: "80% of African SMEs never reach their full growth potential due to lack of access to capital and advisory support.",
              },
              {
                id: 1,
                text: "Businesses that engage professional advisory are 3x more likely to attract investors and close deals successfully.",
              },
              {
                id: 1,
                text: "Proper valuation and exit planning can increase business sale value by up to 40%.",
              },
            ].map((item) => (
              <div
                key={item?.id}
                className="flex items-start gap-2 transition duration-300"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <title>information_line</title>
                    <g id="information_line" fill="none">
                      <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                      <path
                        fill="#1E1E1E"
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                      />
                    </g>
                  </svg>
                </div>

                <div className="mb-4 w-full">
                  <p
                    className="mb-4 border-[#CCCCCC] border-b pb-4 font-medium text-[#000000] text-base leading-relaxed"
                    style={{ fontFamily: "Inter" }}
                    dangerouslySetInnerHTML={{
                      __html: highlightPercentages(item.text),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="mt-20 bg-[#F1FBE6] md:-mt-20 md:py-20">
        <div className="gap-2 bg-[#F1FBE6] md:gap-[68px]">
          {/* <div className="w-full -mb-32 hidden md:flex">
          <Image
            src={"/new_images/Meliuk-liuk.svg"}
            width={235}
            height={235}
            alt="AA line"
            className="w-full "
          />
        </div> */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp as any}
            className="mx-auto mb-4 max-w-[90rem] px-4 md:px-8"
          >
            <div>
              <p
                className="font-bold text-[#000000] text-[50px]"
                style={{
                  fontFamily: "Inter",
                }}
              >
                How we are enabling this
              </p>
            </div>
            <div className="mt-1">
              <p
                className="Inter-font font-normal text-3xl text-black md:text-[32px]"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Our <span className="text-[#739F46]">3</span> complementary
                services
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mx-auto flex w-full max-w-[90rem] flex-wrap items-baseline justify-center gap-14 px-4 sm:flex-nowrap md:px-8"
        >
          {[
            {
              id: 1,
              img: "/new_images/15.jpg",
              title: "Business Consulting",
              desc: "Strategy & support to build, institutionalize, and grow businesses",
              link: "/business-consulting",
            },
            {
              id: 2,
              img: "/new_images/8.jpg",
              title: "Business Funding",
              desc: "Access to aligned investors and favourable funding options.",
              link: "/business-funding",
            },
            {
              id: 3,
              img: "/new_images/13.jpg",
              title: "Business Brokerage",
              desc: "A confidential global marketplace to connect business sellers with buyers.",
              link: "business-brokerage",
            },
          ]?.map((item) => {
            const [firstWord, ...rest] = item.title.split(" ");
            const secondPart = rest.join(" ");

            return (
              <motion.div
                key={item?.id}
                variants={itemVariants as any}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="w-96"
              >
                <Link href={item.link} className="max-w-[384px]">
                  <div className="mb-9 rounded-e-[84px]">
                    <Image
                      src={item.img}
                      width={235}
                      height={235}
                      alt="AA globe"
                      className="h-full w-full rounded-ss-[84px] rounded-ee-[84px]"
                    />
                  </div>
                  <p className="mb-[14px] font-bold text-[#1E1E1E] text-[34px]">
                    <span
                      className="text-[#1E1E1E]"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      {firstWord}
                    </span>{" "}
                    <span
                      className="text-[#A6A6A6]"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      {secondPart}
                    </span>
                  </p>
                  <p className="font-light text-2xl text-[#A6A6A6]">
                    {item.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative h-[500px] w-full overflow-hidden bg-[#004714] md:h-[369px]"
      >
        <div className="mx-auto grid h-full max-w-[90rem] grid-cols-1 px-4 md:grid-cols-2 md:px-6">
          {/* Left Section with Curved Edge */}
          <motion.div
            variants={slideInLeft as any}
            className="relative flex items-center justify-center"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              src="/new_images/TBALogo_origin.webp"
              alt="Transworld Logo"
              className="z-10 w-[260px] object-contain md:w-[400px]"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              src="/new_images/Rectangle 151.png"
              alt="Transworld Logo"
              className="absolute z-0 h-[253px] object-contain p-6 md:left-4 md:w-[794px] md:p-0"
            />
          </motion.div>

          {/* Right Section */}
          <motion.div
            variants={slideInRight as any}
            className="flex flex-col justify-center bg-[#004714] text-white"
          >
            <h2
              className="font-bold text-xl leading-snug md:text-xl"
              style={{
                fontFamily: "Inter",
              }}
            >
              Our partnership with the world’s largest business brokerage{" "}
              Transworld Business Advisors (TBA)
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 font-light text-[#F5F5F5A6] text-base leading-relaxed md:text-[20px]"
            >
              We operate Transworld Business Advisors Ghana to connect African
              enterprises with global opportunity.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <BottomHero
        backgroundImage="/new_images/16.jpg"
        title="Expert support at every stage of the business lifecycle"
        buttonTitle="Speak with our team"
        link={"https://forms.fillout.com/t/oEtePaNuxSus"}
      />
      <Footer />
    </main>
  );
}
