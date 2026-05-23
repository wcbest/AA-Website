"use client";

import * as motion from "motion/react-client";
import { useEffect } from "react";
import BottomHero from "@/components/BottomHero";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";

const businessBrokerageServices = [
  {
    id: "strategic-growth-and-innovation",
    title: "Strategic Growth & Innovation",
    description: `We help insurers expand market reach, create new products, and embed innovation
across the value chain. Our approach combines market intelligence, digital enablement,
and operational efficiency.`,
    features: [
      "Buyer qualification",
      "Market matching",
      "Transaction support",
      "Due diligence assistance",
    ],
  },
  {
    id: "financial-resilience",
    title: "Financial Resilience",
    description: `We strengthen solvency and capital efficiency by developing robust financial
frameworks and stress-tested capital models. Our goal is to enhance profitability and
regulatory confidence.`,
    features: [
      "Business valuation",
      "Marketing strategy",
      "Buyer screening",
      "Negotiation support",
    ],
  },
  {
    id: "technical-excellence",
    title: "Technical Excellence",
    description: `We optimize underwriting, pricing, and claims processes to improve risk management
and operational performance. Our experts ensure technical capabilities evolve with
emerging industry standards.`,
    features: [
      "Market-based valuation",
      "Comparable analysis",
      "Financial performance review",
      "Actionable recommendations",
    ],
  },
  {
    id: "operations-and-people-enablement",
    title: "Operations & People Enablement",
    description: `We streamline operations and build people capabilities through training, change
management, and process automation. Our focus is creating agile, high-performing
insurance organizations.`,
    features: [
      "Professional documentation",
      "Financial highlights",
      "Market positioning",
      "Confidentiality assured",
    ],
  },
  {
    id: "insurtech",
    title: "Insurtech",
    description: `We help insurers adopt digital technologies and data-driven tools that improve
customer engagement, risk assessment, and operational agility, enabling a truly
modern insurance experience.`,
    features: [
      "Diverse portfolio",
      "Verified listings",
      "Financial transparency",
      "Growth potential analysis",
    ],
  },
];

export default function BusinessBrokeragePage() {
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

  return (
    <div className="min-h-screen bg-white">
      <ClientNavbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-40"
      >
        <Breadcrumbs />

        <HeroSection title="Our Specialties" img="/new_images/image 16.png" />
      </motion.div>
      <FloatingArrow />

      {/* <div className="w-full -mt-32 hidden md:flex">
        <Image
          src={"/new_images/Meliuk-liuk.svg"}
          width={235}
          height={235}
          alt="AA line"
          className="w-full "
        />
      </div> */}

      {/* Hero Section */}
      <section className="pt-10 pb-16">
        <div className="mx-auto max-w-[90rem] px-4 md:px-8">
          <div className="mx-auto">
            <p className="font-thin text-3xl text-[#1E1E1E] leading-relaxed">
              With deep expertise across Life, General, Health, Brokerage, and
              Reinsurance, we provide integrated solutions that drive
              sustainable growth and technical excellence for insurers, brokers,
              and reinsurers.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white py-16">
        <div className="mx-auto max-w-[90rem] px-4 md:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="mb-4 font-thin text-4xl text-[#1E1E1E] md:text-5xl">
              Insurance
            </h2>
          </div>

          {/* Services Grid */}
          <div className="mx-auto grid grid-cols-1 gap-10 gap-y-28 md:grid-cols-2 lg:grid-cols-3">
            {/* Management Consulting */}
            {businessBrokerageServices.map((item) => (
              <div
                key={item?.id}
                id={item?.id}
                className="flex items-baseline gap-2 rounded-lg bg-white transition duration-300"
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
                        fill="#F2BA00"
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                      />
                    </g>
                  </svg>
                </div>

                <div>
                  <h3
                    className="mb-2 font-bold text-3xl text-[#1E1E1E]"
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    {item?.title}
                  </h3>
                  <p className="mb-4 font-normal text-[#757575] leading-relaxed">
                    {item?.description}
                  </p>
                  {/* <button className="text-[#303030] text-xl font-light  flex items-center gap-2 hover:gap-3 transition-all duration-300">
                  See more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <title>arrow_right_line</title>
                    <g id="arrow_right_line" fill="none" fill-rule="nonzero">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                      <path
                        fill="#F2BA00"
                        d="m14.707 5.636 5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l3.95-3.95H4a1 1 0 1 1 0-2h13.243l-3.95-3.95a1 1 0 1 1 1.414-1.414Z"
                      />
                    </g>
                  </svg>
                </button> */}
                </div>
              </div>
            ))}
            <div className="flex h-[231px] items-center justify-center rounded-[34px] bg-[#F2BA00] md:w-[410px]">
              <p className="p-7 text-[52px] leading-10">and many more...</p>
            </div>
          </div>
        </div>
      </div>

      <BottomHero
        backgroundImage="/new_images/156.png"
        title="We are experts at Institutionalization"
        buttonTitle="Leave us a message"
        link={"https://forms.fillout.com/t/oEtePaNuxSus"}
      />

      <Footer />
    </div>
  );
}
