"use client";

import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";
import BottomCTASection from "@/components/bottom-cta-section";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import Footer from "@/components/footer";
import GlobalPartnerSection from "@/components/global-partner-section";
import { type Leader, LeadershipCard } from "@/components/leadership-card";

const AboutUs = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const leaders: Leader[] = [
    {
      id: 1,
      name: "Nigel Nunoo",
      title: "Chief Executive Officer",
      image: "/new_images/image 19.png",
      credentials: "MBA, CFA, CFE",
      imageAlt: "Nigel Nunoo",
      description: `Over 20 years of experience in global financial services and investment strategy.`,
      bio1: `Nigel Nunoo is an entrepreneurial international business executive with over 20 years of experience driving profitable growth and transformation in the global financial services industry. A proven strategist and visionary, Nigel has designed and implemented corporate, business, investment, and risk management strategies that have delivered measurable success across the U.S., Africa, and Europe.`,
      bio2: "Over 20 years of experience in global financial services and investment strategy.\n\nNigel has pioneered the institutionalization process with over 25 years of experience in middle-market M&A, private equity and investment banking. Through his career, he has closed hundreds of transactions with a particular focus on cross-border M&A, Africa, minerals, resources, business franchises, and agri-businesses.",
      bio3: `As Chief Executive Officer of African Aspirations, Nigel provides overall vision and leadership for the Group and its three subsidiaries; Business Brokerage, Business Consulting, and Business Funding. His mission is to position African Aspirations as a premier Pan-African business development platform that empowers entrepreneurs, investors, and corporations to grow and thrive across markets.`,
      bio4: `Respected for his professional rigor and global credentials; MBA, Chartered Financial Analyst (CFA), and Fellow of the Society of Actuaries (FSA), Nigel ensures that African Aspirations operates with world-class standards of excellence. Above all, his goal is to ensure that every SME achieves its aspirations through transformative, professional, and impactful partnerships.`,
    },
    {
      id: 2,
      name: "Richard Osei",
      title: "Chief Operations Officer",
      image: "/new_images/image 22.png",
      credentials: "MBA, CPA, CIA",
      imageAlt: "Richard Osei",
      description: ` Seasoned finance/operations leader overseeing Transworld Ghana & group execution`,
      bio1: `Richard Osei is a results-driven executive with over 15 years of experience in the financial sector, specializing in compliance, risk management, and deal execution. Renowned for his operational precision and analytical expertise, Richard has successfully led organizations and entrepreneurs through complex financial and business challenges across Ghana, Nigeria, and The Gambia.
`,
      bio2: `As Chief Operations Officer of African Aspirations, Richard is the engine behind the Group’s daily execution. He leads the Business Brokerage subsidiary and ensures seamless integration across the Consulting and Funding divisions. His role encompasses building operational systems, ensuring financial transparency, and structuring business processes that minimize risks and maximize opportunities for clients.
`,
      bio3: `Richard’s regional exposure and financial expertise make him a trusted partner for SMEs seeking to buy, sell, restructure, or expand their businesses. His leadership is defined by a process-driven, detail-oriented mindset that guarantees transactions are not only successful but sustainable. 
`,
      bio4: `Armed with an MBA, Certified Public Accountant (CPA), and Certified Internal Auditor (CIA) designations, Richard brings a rare combination of technical expertise and strategic foresight to African Aspirations. His mission is clear: to ensure that the Group delivers flawless execution and enables every SME to achieve its aspirations across brokerage, consulting, and funding.
`,
    },
    {
      id: 3,
      name: "Cleland Goffie Bruce Jnr",
      title: "Board Chair",
      image: "/new_images/image 20.png",
      credentials: "PhD, MBA, CPA, FCCA",
      description: `Veteran insurance & financial services executive; pioneer in Ghana’s insurance industry.`,
      imageAlt: "Cleland Goffie Bruce Jnr",
      bio1: `C.C. Bruce is a highly accomplished executive with over 30 years of leadership in financial services, governance, and organizational transformation. Recognized as a thought leader across Africa, he has shaped industry policies, guided organizations to growth, and provided strategic oversight that has strengthened both national and regional markets.`,
      bio2: `As Board Chair of African Aspirations, C.C. Bruce provides governance, oversight, and strategic direction to ensure the Group remains anchored in integrity, professionalism, and client success. His leadership influences every aspect of African Aspirations’ expansion across its three subsidiaries; Business Brokerage, Business Consulting, and Business Funding cementing the Group’s role as a trusted partner for entrepreneurs and investors across Africa and the diaspora.`,
      bio3: `C.C. Bruce’s credentials include Associate of the Chartered Insurance Institute (ACII, UK), Fellow of the Insurance Institute of Ghana (FIIG), a Diploma in Financial Management (DipFM, ACCA), and a Master of Arts in Leading Innovation and Change from York St. John University, UK. His distinguished career and reputation for excellence bring stability, authority, and vision to African Aspirations.`,
      bio4: `With his guidance, African Aspirations is positioned to redefine business development across Africa. His ultimate goal and that of the Group is to ensure that every SME achieves its aspirations and contributes to Africa’s sustainable economic growth story.`,
    },
  ];
  return (
    <div className="min-h-screen">
      <ClientNavbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-40"
      >
        <Breadcrumbs />

        <div className="w-full">
          <div className="flex w-full items-center justify-center border-[#CCCCCCB2] border-b py-4 md:py-[67px]">
            <p
              className="font-bold text-2xl text-[#739F46] md:text-[85px]"
              style={{
                fontFamily: "Inter",
              }}
            >
              About African Aspirations
            </p>
          </div>
        </div>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-[90rem] px-4 md:px-8">
            <div className="grid grid-cols-1 items-center sm:gap-8 md:gap-12 lg:grid-cols-2">
              {/* LEFT IMAGES */}
              <div className="relative h-[320px] w-full md:h-[420px]">
                {/* Top Image */}
                <div className="absolute top-0 left-0 z-0 h-[70%] w-[70%] overflow-hidden rounded-[50px]">
                  <Image
                    src="/new_images/2148913227 2.png"
                    alt="African business team collaborating"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bottom Image – overlapping & moved slightly right */}
                <div className="absolute -bottom-[100px] left-[90px] z-10 h-[70%] w-[70%] overflow-hidden rounded-[50px] shadow-lg">
                  <Image
                    src="/new_images/precision-farming 1.png"
                    alt="African entrepreneur in agricultural setting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* RIGHT TEXT */}
              <div className="mt-32 space-y-6 md:mt-0">
                <h2
                  className="font-semibold text-[#000000] text-xl md:text-2xl"
                  style={{ fontFamily: "Inter" }}
                >
                  African Aspirations was founded on the belief that{" "}
                  <span
                    className="text-[#739F46]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Africa's full potential will be realized when all of its
                    people achieve their individual and collective aspirations.
                  </span>
                </h2>

                <div className="space-y-4 text-[#000] leading-relaxed">
                  <p className="font-normal text-[#000] text-base md:text-xl">
                    Inspired by Dr. Kwame Nkrumah's vision of{" "}
                    <strong>a united and empowered Africa</strong>, our founders
                    set out to bridge the gap between African enterprises and
                    global opportunity.
                  </p>

                  <p className="font-normal text-[#000] text-base md:text-xl">
                    Through our three integrated divisions:
                  </p>

                  <p className="font-semibold text-[#739F46] text-base md:text-xl">
                    Business Consulting | Business Funding | Business Brokerage
                  </p>

                  <p className="font-normal text-[#636466] text-base md:text-xl">
                    We connect business owners, investors, and advisors across
                    Africa and the world. Rooted in Ghana and expanding across
                    the continent. African Aspirations is redefining what it
                    means to build, grow, and scale African businesses with
                    structure, strategy, and sustainable value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
      <div
        className="mt-20 bg-gradient-to-r from-[#000000] via-[#000] to-[#739F46] py-40"
        id="our-team"
      >
        {/* Leadership */}
        <div className="mx-auto max-w-[90rem] px-4 md:px-8">
          <div className="grid grid-cols-1 items-start gap-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-32 lg:grid-cols-4">
            <div className="col-span-4 text-white sm:col-span-3 md:col-span-1">
              <h2
                className="mb-6 font-bold text-xl leading-tight md:text-2xl lg:text-4xl"
                style={{ fontFamily: "Inter" }}
              >
                Our
                <br />
                Leadership
              </h2>
              <p className="font-light text-[#F1FBE6] text-sm leading-relaxed md:text-base">
                Our team combines world-class expertise with local insight to
                deliver professional excellence across every engagement.
              </p>
            </div>
            <div className="col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {leaders.map((leader) => (
                <LeadershipCard
                  key={leader.id}
                  leader={leader}
                  isExpanded={expandedId === leader.id}
                  onToggle={() => handleToggle(leader.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <GlobalPartnerSection />
      <BottomCTASection backgroundImage={"/new_images/7.jpg"} />
      <Footer />
    </div>
  );
};

export default AboutUs;
