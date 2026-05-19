import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="z-0 min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h1 className="text-black  text-2xl uppercase ">
          Welcome to African asprirations
        </h1>

        <div className="text-black">
          <p className="max-w-5xl text-center">
            At African Aspirations, we are your trusted partner in driving
            business success across Africa. With expertise spanning industries,
            strategic consulting, tailored funding solutions, and seamless
            brokerage services, we empower businesses to thrive in dynamic
            markets. Explore how we can transform your aspirations into reality.
          </p>
          {/* <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p> */}
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        {/* <div className="relative mask-clip-path about-image">
          <img
            src={"/images/pexels-janetrangdoan-1024248.jpg"}
            alt="Background"
            className="absolute z-10 left-0 top-0 size-full object-cover"
            loading="lazy"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Story;
