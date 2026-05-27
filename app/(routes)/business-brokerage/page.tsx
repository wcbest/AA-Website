"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import BottomCTASection from "@/components/bottom-cta-section";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import PuzzleHeroSection from "@/components/PuzzleHeroSection";

const _businessBrokerageServices = [
  {
    id: "african-business-sellers",
    title: "African Business Sellers",
    description:
      "African Marketplace for Business Owners (Sellers) to sell their business or a stake in their business to Investors (Buyers). Through our relationship with Transworld Business Advisors (TBA), the world’s largest business brokerage network, we connect Africans with business opportunities across the globe, providing valuation, marketing, negotiation, and closing support with world-class professionalism.",
    icon: "/new_images/image 9.svg",
  },
  {
    id: "buyers-of-african-businesses",
    title: "Buyers of African Businesses",
    description:
      "We provide access to vetted, cash-flowing African businesses across multiple sectors. Our buyer clients benefit from proprietary listings, verified seller information, and expert guidance through due diligence and negotiations, ensuring each acquisition aligns with their investment goals.",
    icon: "/new_images/image 10.svg",
  },
  {
    id: "africans-looking-to-invest-globally",
    title: "Africans Looking to Invest Globally",
    description: `We help African investors diversify their portfolios internationally through franchise
opportunities, business acquisitions, and cross-border partnerships. Our global network
provides exposure to stable, high-growth markets while offering access to residency-by-
investment and lifestyle benefits.`,
    icon: "/new_images/image 11.svg",
  },
  {
    id: "business-valuation",
    title: "Business Valuation",
    description: `Understanding the true worth of your business is essential for any transaction or
partnership. Our valuation experts combine financial analysis, market benchmarking,
and sector insights to deliver accurate, defensible valuations that position your business
competitively for sale or investment.`,
    icon: "/new_images/image 12.svg",
  },
  {
    id: "pitch-books",
    title: "Pitch Books",
    description: `We craft professional, data-driven investor presentations that tell your business story
with clarity and impact. Each pitch book is tailored to showcase financial strength,
growth potential, and unique market positioning, ensuring your opportunity stands
out to serious investors and buyers.`,
    icon: "/new_images/image 13.svg",
  },
];

const services = [
  {
    title: "For African Business Sellers",
    image: "/new_images/image 25.png",
    items: [
      "Reach vetted, capital-ready buyers in global markets",
      "Secure fair valuations & better exits",
      "Receive full support through negotiation to closing",
      "Maximize liquidity from your life’s work",
      "Benefit from tax, legal, and compliance guidance",
    ],
  },
  {
    title: "For Buyers of African Businesses",
    image: "/new_images/image 25.png",

    items: [
      "Access curated, high-potential ventures",
      "Get support for due diligence & financing",
      "Expand confidently with trusted local expertise",
      "Acquire stable, cash-flowing businesses",
      "Benefit from end-to-end acquisition support",
    ],
  },
  {
    title: "Africans Looking to Invest Globally",
    image: "/new_images/image 25.png",

    items: [
      "Invest in vetted international businesses",
      "Enter global markets through secure pathways",
      "Enjoy education, healthcare & lifestyle benefits",
      "Gain residency or citizenship by investment",
      "Earn in strong, stable foreign currencies",
    ],
  },
];

const reports = [
  {
    title: "Expert Valuation Reports",
    image: "/new_images/freepik__talk.png",
    heading: "You’ve built a great business. Find out what it’s really worth.",
    content: `
Understanding what your business is truly worth is essential for raising capital, negotiating with investors, or preparing for a sale. African Aspirations provides a clear, defensible valuation that removes guesswork and gives you the confidence to make informed decisions.
Why it matters: Most African business owners rely on informal estimates, often leading to poor negotiations, undervalued sales, or missed investment opportunities. A professional valuation changes that by providing clarity and credibility buyers and investors trust.`,
  },
  {
    title: "Pitch Book / Confidential Information Memorandum (CIM)",
    image: "/new_images/freepik__talk__94008.png",
    heading: `Let us prepare a Pitch Book that sells your business with clarity, confidence, and professionalism.`,
    content: `
Preparing to sell your business shouldn’t be stressful. African Aspirations creates professional, investor-ready CIMs that present your company’s true value and attract serious local and international buyers. Each Pitch Book is crafted to highlight your strengths, communicate your numbers clearly, and position your business competitively in the market.`,
  },
];

export default function BusinessBrokeragePage() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  useEffect(() => {
    // Scroll to specific section if hash is present
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

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

  const _itemVariants = {
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

  return (
    <div className="min-h-screen bg-white">
      <ClientNavbar />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-20"
      >
        <Breadcrumbs />

        <PuzzleHeroSection
          title="Business Brokerage"
          img="/new_images/Union.png"
        />
      </motion.div>
      <FloatingArrow />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative h-[580px] w-full overflow-hidden bg-gradient-to-r from-[#000000] via-[#000] to-[#739F46]"
      >
        <div className="mx-auto grid h-full max-w-[90rem] grid-cols-1 px-4 md:grid-cols-2 md:px-8">
          {/* Left Section with Curved Edge */}
          <motion.div
            variants={slideInLeft as any}
            className="relative flex h-full items-center justify-center"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              src="/new_images/Group.png"
              alt="Transworld Logo"
              className="z-10 h-full w-full object-contain"
            />
          </motion.div>

          {/* Right Section */}
          <motion.div
            variants={slideInRight as any}
            className="flex max-w-[580px] flex-col justify-center text-white"
          >
            <h2
              className="font-bold text-xl leading-snug md:text-[30px]"
              style={{
                fontFamily: "Inter",
              }}
            >
              We are building a{" "}
              <span className="font-medium text-[#8FDC40B2]">
                Pan-African marketplace{" "}
              </span>
              for businesses, connected to the rest of the world{" "}
              {/* world’s largest business brokerage{" "}
            <span className="underline decoration-[#F2BA00] decoration-[0.8px] font-bold">
              Transworld Business Advisors (TBA)
            </span> */}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 font-light text-[#FFFFFF] text-base leading-relaxed md:text-[24px]"
            >
              African Aspirations helps you understand your company’s true
              value, connect with serious investors, and navigate the process
              with confidence, so you can make informed decisions and unlock the
              full potential of your business.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
      <div className="w-full bg-[#F1FBE6] py-7 md:py-24">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-center px-4 md:px-8">
          <h1
            className="text-center text-[#000000] text-xl md:text-[40px]"
            style={{
              fontFamily: "Inter",
            }}
          >
            Our Simple, Confidential Brokerage process
          </h1>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            src="/new_images/bbn1.png"
            alt="Transworld Logo"
            className="z-10 h-full w-full object-contain"
          />
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[90rem] px-4 md:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={index}>
                <h3
                  className="mb-8 w-full font-semibold text-2xl text-[#739F46] md:mb-14 md:text-6xl"
                  style={{ fontFamily: "Inter" }}
                >
                  <span
                    className="font-semibold text-2xl text-[#739F46] md:text-6xl"
                    style={{ fontFamily: "Inter" }}
                  >
                    {index + 1}.
                  </span>{" "}
                  {service.title}
                </h3>
                {/* Left Side - Image */}
                <div className="flex flex-col items-stretch overflow-hidden bg-white transition-all duration-300 hover:translate-y-[-2px] md:gap-20 lg:flex-row">
                  <div className="relative h-56 lg:w-2/5">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="h-full rounded-3xl object-cover"
                    />
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex flex-1 flex-col justify-center px-8 lg:px-10">
                    <div className="space-y-4">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
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
                                  fill="#000000"
                                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                                />
                              </g>
                            </svg>
                          </div>

                          <span
                            className="ml-4 text-[#000000] text-lg leading-relaxed"
                            style={{ fontFamily: "Inter" }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#015A1A] py-16" id="pitch-books">
        <div
          className="mx-auto max-w-[90rem] px-4 md:px-8"
          id="business-valuation"
        >
          <div className="mx-auto max-w-4xl">
            {/* Accordion */}
            <div className="space-y-4">
              {reports.map((service, index) => (
                <div
                  key={index}
                  className="overflow-hidden border-b transition-all duration-300"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center py-4 text-left transition-all duration-300 hover:text-[#C4FFDA]"
                  >
                    <h3
                      className="font-bold text-[#FFFFFF] text-xl"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      {service.title}
                    </h3>
                    <div className="ml-4 flex-shrink-0">
                      {openItem === index ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <title>arrow_up_line</title>
                          <g id="arrow_up_line" fill="none" fill-rule="nonzero">
                            <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                            <path
                              fill="#739F46"
                              d="M12.707 3.636a1 1 0 0 0-1.414 0L5.636 9.293a1 1 0 1 0 1.414 1.414L11 6.757V20a1 1 0 1 0 2 0V6.757l3.95 3.95a1 1 0 0 0 1.414-1.414l-5.657-5.657Z"
                            />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <title>arrow_down_fill</title>
                          <g
                            id="arrow_down_fill"
                            fill="none"
                            fill-rule="nonzero"
                          >
                            <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                            <path
                              fill="#739F46"
                              d="M10.5 16.035 7.404 12.94a1.5 1.5 0 1 0-2.122 2.121l5.657 5.657a1.5 1.5 0 0 0 2.122 0l5.657-5.656a1.5 1.5 0 1 0-2.122-2.122L13.5 16.035V4.5a1.5 1.5 0 0 0-3 0v11.535Z"
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                  </button>

                  <div
                    className={`flex flex-col items-center overflow-hidden bg-white px-4 transition-all duration-500 ease-in-out md:flex-row ${
                      openItem === index
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="h-full w-full md:w-[999px]">
                      <img
                        src={service?.image}
                        alt="Diagram showing the African Aspirations 'plug' connecting to 100+ vetted world-class solution providers for business institutionalization, including Accounting, HR, Marketing, Legal, and Franchising."
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <p
                        className="mb-4 font-light text-[#739F46] text-base leading-relaxed md:text-4xl"
                        style={{
                          fontFamily: "Inter",
                        }}
                      >
                        {service.heading}
                      </p>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-[#81878A] text-sm">
                            {service.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <div className="w-full -mt-32 hidden md:flex">
        <Image
          src={"/new_images/Meliuk-liuk.svg"}
          width={235}
          height={235}
          alt="AA line"
          className="w-full "
        />
      </div> */}

      {/* Services Grid */}
      {/* <section className="bg-white py-20 px-4 sm:px-6 lg:px-16">
        <div className="lg:px-16 ">
          <h2
            className="text-[#1E1E1E]  text-4xl sm:text-5xl font-light mb-12 max-w-[950px]"
            style={{
              fontFamily: "Inter",
            }}
          >
            Brokerage opportunities available with African{" "}
            <span className="text-[#FFC72C] font-normal">Aspirations</span>
          </h2>

          <div className="space-y-8">
            {businessBrokerageServices.map((item) => (
              <div
                id={item?.id}
                key={item?.id}
                className="border-l border-r border-t border-b border-[#FFC72C] p-6 sm:p-8 rounded-lg"
              >
                <div className="flex flex-wrap md:flex-nowrap items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-40 h-full">
                      <Image
                        src={item.icon as string}
                        width={100}
                        height={100}
                        alt={item?.description}
                        className="w-40 h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-bold text-[#1E1E1E] mb-2"
                      style={{ fontFamily: "Inter" }}
                    >
                      {item?.title}
                    </h3>
                    <p className="text-[#757575] text-xl font-normal mb-4">
                      {item?.description}
                    </p>
                    <a
                      style={{
                        fontFamily: "Inter",
                      }}
                      href="#"
                      className="inline-flex items-center text-xl font-light text-[#303030] hover:text-[#FFC72C] transition-colors"
                    >
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-9 w-9 text-[#FFC72C]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.5 8l4.5 4-4.5 4M3 12h18"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <BottomHero
        backgroundImage="/new_images/156.png"
        title="We are experts at Institutionalization"
        buttonTitle="Leave us a message"
      /> */}
      <BottomCTASection
        question="Exit on your own terms"
        buttonText="Contact Us"
        backgroundImage={"/new_images/7.jpg"}
        link={"https://forms.fillout.com/t/oEtePaNuxSus"}
      />

      <Footer />
    </div>
  );
}
