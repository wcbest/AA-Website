"use client";

import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import BottomHero from "@/components/BottomHero";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import ConsultingCard, {
  type ConsultingCardProps,
} from "@/components/consulting-card";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";

const _businessFundingServices = [
  {
    id: "private-equity",
    title: "Private Equity",
    description: `We connect established African businesses with private equity investors seeking
scalable opportunities. Our team supports the entire process, from deal preparation
and structuring to negotiation and closing, to ensure mutually beneficial outcomes.`,
    icon: "/new_images/image 8.svg",
  },
  {
    id: "private-debt",
    title: "Private Debt",
    description: `We arrange flexible debt instruments tailored to the borrower’s cash flow and growth
plans. By working closely with private lenders and debt funds, we secure financing that
balances capital efficiency with sustainability.`,
    icon: "/new_images/image 9.svg",
  },

  {
    id: "venture-capital",
    title: "Venture Capital",
    description: `We help early and growth-stage companies access venture funding that accelerates
innovation and market expansion. Our role includes investor matching, pitch
preparation, and deal structuring to position startups for success.`,
    icon: "/new_images/image 7.svg",
  },
  {
    id: "family-offices",
    title: "Family Offices",
    description: `Through our relationships with global family offices, we provide access to long-term,
patient capital. We align businesses with family investors who share similar values,
investment horizons, and strategic interests.`,
    icon: "/new_images/image 10.svg",
  },
  {
    id: "development-finance",
    title: "Development Finance",
    description: `We partner with Development Finance Institutions (DFIs) and impact investors to fund
projects that drive inclusive growth across Africa. Our team assists with proposal
preparation, compliance, and investment readiness.`,
    icon: "/new_images/image 11.svg",
  },
  {
    id: "public-sector",
    title: "Public sector",
    description: `We collaborate with government agencies and public-private partnership (PPP)
programs to design and finance large-scale infrastructure and social projects. Our
experience ensures transparency, efficiency, and developmental impact.`,
    icon: "/new_images/image 12.svg",
  },
  {
    id: "crowdfunding",
    title: "Crowdfunding",
    description: `We help entrepreneurs tap into collective financing opportunities by connecting them
with credible crowdfunding platforms. Our process ensures compliance, investor
protection, and clear communication of the business case.`,
    icon: "/new_images/image 13.svg",
  },
];

const fundingCards: Omit<ConsultingCardProps, "isExpanded" | "onToggle">[] = [
  {
    id: 0,
    title: "Private Equity",
    description: `We arrange flexible debt instruments tailored to the borrower’s cash flow and growth
plans. By working closely with private lenders and debt funds, we secure financing that
balances capital efficiency with sustainability.`,
    image: "/new_images/68adea73590669a19f87111d_biz-img-1.webp.png",
    imageAlt: "Team collaboration",
    expandedDescription:
      "Our plug-and-play model connects clients to 100+ service providers with trusted expertise, everything needed to institutionalize your business and operate at global standards.",
    details: [
      {
        title: "Management Consulting:",
        description: "Strengthening governance, structure, and systems.",
        color: "green",
      },
      {
        title: "Strategy:",
        description:
          "Developing clear, forward-looking roadmaps for growth and market positioning.",
        color: "gray",
      },
      {
        title: "Revenue Maximization:",
        description:
          "Identifying new revenue streams, optimizing margins, and driving profitability.",
        color: "gold",
      },
      {
        title: "Franchise Consulting:",
        description:
          "Structuring and scaling businesses through strategic franchise development.",
        color: "green",
      },
    ],
  },
  {
    id: 1,
    title: "Private Debt",
    description:
      "Navigate mergers, acquisitions, and business transitions with clarity and confidence.",
    image: "/new_images/2.jpg",
    imageAlt: "Business professional",
    expandedDescription:
      "Navigate mergers, acquisitions, and business transitions with clarity and confidence. Our expert advisors guide you through every step of the process.",
    details: [
      {
        title: "Transaction Support:",
        description: "Comprehensive support throughout the M&A lifecycle.",
        color: "green",
      },
      {
        title: "Due Diligence:",
        description: "Thorough analysis to identify risks and opportunities.",
        color: "gray",
      },
      {
        title: "Valuation Services:",
        description:
          "Accurate business valuation for informed decision-making.",
        color: "gold",
      },
    ],
  },
  {
    id: 2,
    title: "Venture Capital",
    description: `We help early and growth-stage companies access venture funding that accelerates
innovation and market expansion. Our role includes investor matching, pitch
preparation, and deal structuring to position startups for success.`,
    image: "/new_images/14.jpg",
    imageAlt: "Construction professional",
    expandedDescription:
      "Get expert advice in finance, risk, compliance, and investment to solve complex challenges. Our specialized team brings deep industry knowledge and practical solutions.",
    details: [
      {
        title: "Financial Advisory:",
        description: "Strategic financial planning and optimization.",
        color: "green",
      },
      {
        title: "Risk Management:",
        description: "Identifying and mitigating business risks effectively.",
        color: "gray",
      },
      {
        title: "Compliance Consulting:",
        description: "Ensuring regulatory compliance across all operations.",
        color: "gold",
      },
      {
        title: "Investment Strategy:",
        description: "Developing strategic investment approaches for growth.",
        color: "green",
      },
    ],
  },
  {
    id: 3,
    title: "Family Offices",
    description: `Through our relationships with global family offices, we provide access to long-term,
patient capital. We align businesses with family investors who share similar values,
investment horizons, and strategic interests.`,
    image: "/new_images/8.jpg",
    imageAlt: "Construction professional",
    expandedDescription:
      "Get expert advice in finance, risk, compliance, and investment to solve complex challenges. Our specialized team brings deep industry knowledge and practical solutions.",
    details: [
      {
        title: "Financial Advisory:",
        description: "Strategic financial planning and optimization.",
        color: "green",
      },
      {
        title: "Risk Management:",
        description: "Identifying and mitigating business risks effectively.",
        color: "gray",
      },
      {
        title: "Compliance Consulting:",
        description: "Ensuring regulatory compliance across all operations.",
        color: "gold",
      },
      {
        title: "Investment Strategy:",
        description: "Developing strategic investment approaches for growth.",
        color: "green",
      },
    ],
  },
  {
    id: 4,
    title: "Development Finance",
    description: `We partner with Development Finance Institutions (DFIs) and impact investors to fund
projects that drive inclusive growth across Africa. Our team assists with proposal
preparation, compliance, and investment readiness.`,
    image: "/new_images/16.jpg",
    imageAlt: "Construction professional",
    expandedDescription:
      "Get expert advice in finance, risk, compliance, and investment to solve complex challenges. Our specialized team brings deep industry knowledge and practical solutions.",
    details: [
      {
        title: "Financial Advisory:",
        description: "Strategic financial planning and optimization.",
        color: "green",
      },
      {
        title: "Risk Management:",
        description: "Identifying and mitigating business risks effectively.",
        color: "gray",
      },
      {
        title: "Compliance Consulting:",
        description: "Ensuring regulatory compliance across all operations.",
        color: "gold",
      },
      {
        title: "Investment Strategy:",
        description: "Developing strategic investment approaches for growth.",
        color: "green",
      },
    ],
  },
  {
    id: 5,
    title: "Public sector",
    description: `We collaborate with government agencies and public-private partnership (PPP)
programs to design and finance large-scale infrastructure and social projects. Our
experience ensures transparency, efficiency, and developmental impact.`,
    image: "/new_images/17.jpg",
    imageAlt: "Construction professional",
    expandedDescription:
      "Get expert advice in finance, risk, compliance, and investment to solve complex challenges. Our specialized team brings deep industry knowledge and practical solutions.",
    details: [
      {
        title: "Financial Advisory:",
        description: "Strategic financial planning and optimization.",
        color: "green",
      },
      {
        title: "Risk Management:",
        description: "Identifying and mitigating business risks effectively.",
        color: "gray",
      },
      {
        title: "Compliance Consulting:",
        description: "Ensuring regulatory compliance across all operations.",
        color: "gold",
      },
      {
        title: "Investment Strategy:",
        description: "Developing strategic investment approaches for growth.",
        color: "green",
      },
    ],
  },
  {
    id: 6,
    title: "Crowdfunding",
    description: `We help entrepreneurs tap into collective financing opportunities by connecting them
with credible crowdfunding platforms. Our process ensures compliance, investor
protection, and clear communication of the business case.`,
    image: "/new_images/13.jpg",
    imageAlt: "Construction professional",
    expandedDescription:
      "Get expert advice in finance, risk, compliance, and investment to solve complex challenges. Our specialized team brings deep industry knowledge and practical solutions.",
    details: [
      {
        title: "Financial Advisory:",
        description: "Strategic financial planning and optimization.",
        color: "green",
      },
      {
        title: "Risk Management:",
        description: "Identifying and mitigating business risks effectively.",
        color: "gray",
      },
      {
        title: "Compliance Consulting:",
        description: "Ensuring regulatory compliance across all operations.",
        color: "gold",
      },
      {
        title: "Investment Strategy:",
        description: "Developing strategic investment approaches for growth.",
        color: "green",
      },
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

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
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

        <HeroSection title="Business Funding" img="/new_images/image 16.png" />
      </motion.div>
      <FloatingArrow />

      <section className="bg-[#015A1A] py-16">
        <div className="mx-auto max-w-[90rem] px-4 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h2
              className="mb-3 font-bold text-3xl text-white md:text-4xl"
              style={{
                fontFamily: "Inter",
              }}
            >
              Our funding platform bridges the gap between capital providers and
              investment-ready businesses.
            </h2>
            <p
              className="text-2xl text-white/90 md:text-lg"
              style={{
                fontFamily: "Inter",
              }}
            >
              We start by understanding investors’ and financiers’ criteria,
              then match them with qualified businesses that meet those
              requirements, increasing the likelihood of successful funding and
              long-term partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundingCards.map((card) => (
              <ConsultingCard
                key={card.id}
                {...card}
                isExpanded={expandedCard === card.id}
                onToggle={() => toggleCard(card.id)}
                visible={false}
              />
            ))}
          </div>
        </div>
      </section>
      {/* <div className="h-11 pt-11">{breadcrumbs}</div> */}

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
            Funding opportunities available with African{" "}
            <span className="text-[#FFC72C] font-normal">Aspirations</span>
          </h2>

          <div className="space-y-8">
            {businessFundingServices.map((item) => (
              <div
                key={item?.id}
                id={item?.id}
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

      <BottomHero
        backgroundImage="/new_images/156.png"
        title="We have an extensive network of numerous funding partners"
        buttonTitle="Leave us a message"
        titleContainerClass="max-w-[627px]"
        link={"https://forms.fillout.com/t/oEtePaNuxSus"}
      />

      <Footer />
    </div>
  );
}
