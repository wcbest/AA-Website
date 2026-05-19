"use client";

import BottomHero from "@/components/BottomHero";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect } from "react";

const businessBrokerageServices = [
  {
    id: "three-lines-of-defense",
    title: "Three Lines of Defense",
    description: `
We implement the Three Lines of Defense model to clarify accountability across
governance, management, and assurance, strengthening enterprise oversight and
control.`,
    icon: "/new_images/image 12.svg",
  },
  {
    id: "risk-appetite",
    title: "Risk Appetite",
    description: `We design and document risk appetite frameworks that align strategic ambitions with
tolerance levels, ensuring leadership decisions are informed and balanced.`,
    icon: "/new_images/image 7.svg",
  },
  {
    id: "risk-culture",
    title: "Risk Culture",
    description: `We foster risk-aware cultures that embed accountability and proactive decision-making
at every organizational level.`,
    icon: "/new_images/image 8.svg",
  },
  {
    id: "risk-management-process",
    title: "Risk Management Process",
    description: `We build and operationalize risk management processes covering identification,
assessment, mitigation, and monitoring tailored to client objectives.`,
    icon: "/new_images/image 10.svg",
  },
  {
    id: "risk-register",
    title: "Risk Register",
    description: `
We develop and maintain dynamic risk registers that prioritize exposures, track
mitigation, and provide leadership with actionable insights.`,
    icon: "/new_images/image 9.svg",
  },
  {
    id: "risk-event-management",
    title: "Risk Event Management",
    description: `
We support clients in responding to and learning from incidents, building resilience
through structured root-cause analysis and remediation planning.`,
    icon: "/new_images/image 11.svg",
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
        <HeroSection title="Risk Management" img="/new_images/image 16.png" />
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
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="mx-auto">
            <p className="text-[#1E1E1E] text-3xl font-thin leading-relaxed">
              Our Risk Management practice helps organizations view risk as both
              a defensive and offensive tool for growth. We implement frameworks
              that balance protection and performance through robust governance
              and analytical rigor.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <h2
            className="text-[#1E1E1E]  text-4xl sm:text-5xl font-light mb-12 max-w-[950px]"
            style={{
              fontFamily: "Inter",
            }}
          >
            Risk Management opportunities available with African{" "}
            <span className="text-[#FFC72C] font-normal">Aspirations</span>
          </h2>

          <div className="space-y-8">
            {businessBrokerageServices.map((item) => (
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
                    {/* <a
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
                    </a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
