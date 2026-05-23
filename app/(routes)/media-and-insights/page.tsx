"use client";

import * as motion from "motion/react-client";
import BottomHero from "@/components/BottomHero";
import Breadcrumbs from "@/components/bread-crumbs";
import ClientNavbar from "@/components/client-navbar";
import FloatingArrow from "@/components/floating-arrow";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";

const AboutUs = () => {
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

        <HeroSection title="Media Insights" img="/new_images/image 16.png" />
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
              Stay informed with perspectives from African Aspirations. Our
              Media & Insights hub features articles, interviews, and
              thought-leadership pieces on business brokerage, funding trends,
              and the evolving African investment landscape.
            </p>
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
};

export default AboutUs;
