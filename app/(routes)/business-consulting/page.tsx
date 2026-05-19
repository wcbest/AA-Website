"use client";

import BottomHero from "@/components/BottomHero";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import ConsultingCard, {
  type ConsultingCardProps,
} from "@/components/consulting-card";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

const businessConsultingServices = [
  {
    id: "management-consulting",
    title: "Management Consulting",
    description: `We guide organizations through the process of strengthening their structure,
governance, and systems. Our consultants design practical frameworks that enhance
decision-making, improve efficiency, and enable sustainable, long-term growth.`,
    features: [
      "Risk assessment",
      "Statistical modeling",
      "Insurance analysis",
      "Pension planning",
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    description: `We develop forward-looking strategies that help businesses define their vision, identify
market opportunities, and execute with precision. Whether entering new markets or
restructuring existing operations, we provide a clear roadmap for success.`,
    features: [
      "Tax optimization",
      "Financial reporting",
      "Compliance management",
      "Strategic planning",
    ],
  },
  {
    id: "revenue-maximization",
    title: "Revenue Maximization",
    description: `We work with clients to identify new revenue streams, optimize pricing models, and
streamline processes to improve profitability. Our focus is on measurable outcomes,
stronger margins, better customer retention, and scalable growth.`,
    features: [
      "Regulatory compliance",
      "Risk assessment",
      "Policy development",
      "Audit preparation",
    ],
  },
  {
    id: "franchise-consulting",
    title: "Franchise Consulting",
    description: `We support entrepreneurs in expanding through franchising and investors in acquiring
franchise models that align with their business goals. From concept development to
franchise rollout, we ensure strategic growth with controlled risk.`,
    features: [
      "Regulatory compliance",
      "Risk assessment",
      "Policy development",
      "Audit preparation",
    ],
  },
  {
    id: "business-plans",
    title: "Business Plans",
    description: `Our team develops detailed, investor-ready business plans that clearly articulate
strategy, financial projections, and operational models. Each plan is customized to meet
funding requirements and attract investor confidence.`,
    features: [
      "Financial analysis",
      "Legal review",
      "Market assessment",
      "Risk evaluation",
    ],
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck",
    description: `We create compelling pitch decks that communicate your business story to investors in
a concise, visually engaging way. Our process ensures your financials, growth plan, and
competitive edge are presented with clarity and professionalism.`,
    features: [
      "Strategic planning",
      "Market analysis",
      "Growth strategies",
      "Performance optimization",
    ],
  },
  {
    id: "concept-papers",
    title: "Concept Papers",
    description: `We help clients transform ideas into well-defined concept papers that can be used to
secure partners, funding, or pilot opportunities. Each paper is structured to
communicate purpose, feasibility, and projected impact.`,
    features: [
      "Environmental impact",
      "Sustainable practices",
      "ESG compliance",
      "Green initiatives",
    ],
  },
  {
    id: "valuation-appraisals",
    title: "Valuation & Appraisals",
    description:
      "Professional business valuation and appraisal services for various purposes including sales, acquisitions, financial reporting, and strategic planning decisions.",
    features: [
      "Business valuation",
      "Asset appraisal",
      "Market analysis",
      "Financial modeling",
    ],
  },
];

const consultingCards: Omit<ConsultingCardProps, "isExpanded" | "onToggle">[] =
  [
    {
      id: 0,
      title: "Generalized Consulting",
      description:
        "Build strong systems and structures with access to trusted partners and expert guidance (institutionalization)",
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
      title: "M&A Support",
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
      title: "Specialized Consulting",
      description:
        "Get expert advice in finance, risk, compliance, and investment to solve complex challenges.",
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
        className="pt-40"
      >
        <Breadcrumbs />

        <HeroSection
          title="Business Consulting"
          img="/new_images/image 16.png"
        />
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

      <section className="bg-[#015A1A] py-16">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h2
              className="text-white text-3xl md:text-4xl font-bold mb-3 "
              style={{
                fontFamily: "Inter",
              }}
            >
              Vetted consulting expertise for all your aspirations
            </h2>
            <p
              className="text-white/90 text-2xl md:text-lg "
              style={{
                fontFamily: "Inter",
              }}
            >
              Let's help you find the most ideal support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingCards.map((card) => (
              <ConsultingCard
                key={card.id}
                {...card}
                isExpanded={expandedCard === card.id}
                onToggle={() => toggleCard(card.id)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative pb-16 bg-[#F5F5F5] py-24 md:h-[945px] p-4">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 md:pt-32">
              <p
                className="text-[#739F46] mb-2 text-lg  sm:text-xl lg:text-2xl font-semibold leading-snug tracking-tighter max-w-xl"
                style={{
                  fontFamily: "Inter",
                }}
              >
                African Aspirations’ consulting arm leverages a carefully
                curated network of expert service providers{" "}
              </p>
              <p className="text-[#636466] text-base md:text-xl font-normal leading-snug tracking-tighter max-w-xl">
                By connecting businesses to the right experts at the right time,
                African Aspirations ensures solutions are practical,
                implementable, and designed to create lasting impact, helping
                companies institutionalize, grow, and thrive.
              </p>
            </div>

            <div className="md:absolute inset-0 h-full w-full md:p-[89px]">
              <img
                src="/new_images/bc1.png"
                alt="Diagram showing the African Aspirations 'plug' connecting to 100+ vetted world-class solution providers for business institutionalization, including Accounting, HR, Marketing, Legal, and Franchising."
                className="w-full h-auto object-contain max-w-none lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <div className="bg-white py-16 px-4 md:px-24">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-thin text-[#1E1E1E] mb-4">
            Our consulting services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 gap-y-28  mx-auto">
          {businessConsultingServices.map((item) => (
            <div
              key={item?.id}
              id={item?.id}
              className="bg-white flex items-baseline gap-2 rounded-lg  transition duration-300"
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
                  className="text-3xl  font-bold text-[#1E1E1E] mb-2"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {item?.title}
                </h3>
                <p className="text-[#757575] font-normal mb-4 leading-relaxed">
                  {item?.description}
                </p>
                <button className="text-[#303030] text-xl font-light  flex items-center gap-2 hover:gap-3 transition-all duration-300">
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
                </button>
              </div>
            </div>
          ))}
          <div className="bg-[#F2BA00] md:w-[410px] h-[231px] rounded-[34px] flex justify-center items-center">
            <p className="text-[52px] p-7 leading-10">and many more...</p>
          </div>
        </div>
      </div> */}

      <BottomHero
        backgroundImage="/new_images/156.png"
        title="We are experts at Institutionalization"
        buttonTitle="Leave us a message"
        titleContainerClass="max-w-[525px]"
        link={"https://forms.fillout.com/t/oEtePaNuxSus"}
      />

      <Footer />
    </div>
  );
}
