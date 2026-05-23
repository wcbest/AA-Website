"use client";

import gsap from "gsap";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// data/navigationItems.ts
export type NavItem = {
  id?: string;
  title: string;
  href?: string;
  subItems?: NavItem[];
  isDropdown?: boolean;
};

export const navigationItems: NavItem[] = [
  {
    id: "about-us",
    title: "About Us",
    href: "/about",
    isDropdown: true,
    subItems: [
      {
        title: "Our Story",
        href: "/about#our-story",
      },
      {
        title: "Leadership Team",
        href: "/about#our-team",
      },
      {
        title: "Values & Impact",
        href: "/about#our-global-partner",
      },
      {
        title: "Transworld Business Advisory",
        href: "/about#our-global-partner",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    href: "/services",
    isDropdown: true,
    subItems: [
      {
        title: "Business Consulting",
        href: "/business-consulting",
      },
      {
        title: "Business Funding",
        href: "/business-funding",
      },
      {
        title: "Business Brokerage",
        href: "/business-brokerage",
      },
    ],
  },
  {
    id: "listings",
    title: "Listings",
    href: "/listings",
    isDropdown: true,
    subItems: [
      {
        title: "Businesses",
        href: "#",
      },
      {
        title: "Real Estate",
        href: "#",
      },
      {
        title: "Featured Listings",
        href: "#",
      },
    ],
  },
  {
    id: "products",
    title: "Our products",
    href: "/products",
    isDropdown: true,
    subItems: [
      {
        title: "Valuation reports",
        href: "/business-brokerage#business-valuation",
      },
      {
        title: "Pitch books",
        href: "/business-brokerage#pitch-books",
      },
      {
        title: "CIM",
        href: "#",
      },
      {
        title: "Industry Research Report",
        href: "#",
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    href: "/resources",
    isDropdown: true,
    subItems: [
      {
        title: "Industry blog",
        href: "#",
      },
      {
        title: "Case study",
        href: "#",
      },
      {
        title: "Newsletter",
        href: "#",
      },
      {
        title: "Industry Research Report",
        href: "#",
      },
    ],
  },
  // {
  //   id: "funding",
  //   title: "Business Funding",
  //   href: "/business-funding",
  //   isDropdown: true,
  //   subItems: [
  //     {
  //       title: "Private Equity",
  //       href: "/business-funding#private-equity",
  //     },
  //     {
  //       title: "Private Debt",
  //       href: "/business-funding#private-debt",
  //     },
  //     {
  //       title: "Venture Capital",
  //       href: "/business-funding#venture-capital",
  //     },
  //     {
  //       title: "Family Offices",
  //       href: "/business-funding#family-offices",
  //     },
  //     {
  //       title: "Development Finance",
  //       href: "/business-funding#development-finance",
  //     },
  //     {
  //       title: "Public Sector",
  //       href: "/business-funding#public-sector",
  //     },
  //     {
  //       title: "Crowdfunding",
  //       href: "/business-funding#crowdfunding",
  //     },
  //   ],
  // },
  // {
  //   id: "brokerage",
  //   title: "Business Brokerage",
  //   href: "/business-brokerage",
  //   isDropdown: true,
  //   subItems: [
  //     {
  //       title: "African Business Sellers",
  //       href: "/business-brokerage#african-business-sellers/",
  //     },
  //     {
  //       title: "Buyers of African Businesses",
  //       href: "/business-brokerage#buyers-of-african-businesses",
  //     },
  //     {
  //       title: "African Looking to Invest Globally",
  //       href: "/business-brokerage#africans-looking-to-invest-globally/",
  //     },
  //     {
  //       title: "Business Valuation",
  //       href: "/business-brokerage#business-valuation",
  //     },
  //     {
  //       title: "Pitch Books",
  //       href: "/business-brokerage#pitch-books",
  //     },
  //   ],
  // },
  // {
  //   id: "our-specialties",
  //   title: "Our Specialties",
  //   href: "/our-specialties",
  //   isDropdown: true,
  //   subItems: [
  //     {
  //       title: "Insurance",
  //       href: "/insurance",
  //       subItems: [
  //         {
  //           title: "Strategic Growth & Innovation",
  //           href: "/insurance#strategic-growth-and-innovation",
  //         },
  //         {
  //           title: "Financial Resilience",
  //           href: "/insurance#financial-resilience",
  //         },
  //         {
  //           title: "Technical Excellence",
  //           href: "/insurance#technical-excellence",
  //         },
  //         {
  //           title: "Operations & People Enablement",
  //           href: "/insurance#operations-and-people-enablement",
  //         },
  //         {
  //           title: "Insurtech",
  //           href: "/insurance#insurtech",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Actuarial & Financial Modeling",
  //       href: "/acturial-and-financial-modeling#actuarial",
  //       subItems: [
  //         {
  //           title: "Pricing Strategy",
  //           href: "/acturial-and-financial-modeling#pricing-strategy",
  //         },
  //         {
  //           title: "Capital Management",
  //           href: "/acturial-and-financial-modeling#capital-management",
  //         },
  //         {
  //           title: "Solvency",
  //           href: "/acturial-and-financial-modeling#solvency",
  //         },
  //         {
  //           title: "Stochastic Modeling",
  //           href: "/acturial-and-financial-modeling#stochastic-modeling",
  //         },
  //         {
  //           title: "Insurance-Linked Securities",
  //           href: "/acturial-and-financial-modeling#insurance-linked-securities",
  //         },
  //         {
  //           title: "Predictive Analytics",
  //           href: "/business-consulting#predictive-analytics",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Investment & Asset-Liability Management",
  //       href: "/investment-and-asset-liability-management",
  //       subItems: [
  //         {
  //           title: "Investment Strategy",
  //           href: "/investment-and-asset-liability-management#investment-strategy",
  //         },
  //         {
  //           title: "Strategic Asset Allocation",
  //           href: "/investment-and-asset-liability-management#strategic-asset-allocation",
  //         },
  //         {
  //           title: "Tactical Asset Allocation",
  //           href: "/investment-and-asset-liability-management#tactical-asset-allocation",
  //         },
  //         {
  //           title: "Investment Limits",
  //           href: "/investment-and-asset-liability-management#investment-limits",
  //         },
  //         {
  //           title: "Investment Policy Statement",
  //           href: "/investment-and-asset-liability-management#investment-policy-statement",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Risk Management",
  //       href: "/risk-management",
  //       subItems: [
  //         {
  //           title: "Three Lines of Defense",
  //           href: "/risk-management#three-lines-of-defense",
  //         },
  //         {
  //           title: "Risk Appetite",
  //           href: "/risk-management#risk-appetite",
  //         },
  //         {
  //           title: "Risk Culture",
  //           href: "/risk-management#risk-culture",
  //         },
  //         {
  //           title: "Risk Management Process",
  //           href: "/risk-management#risk-management-process",
  //         },
  //         {
  //           title: "Risk Register",
  //           href: "/risk-management#risk-register",
  //         },
  //         {
  //           title: "Risk Event Management",
  //           href: "/risk-management#risk-event-management",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Compliance",
  //       href: "/compliance",
  //       subItems: [
  //         {
  //           title: "Regulatory Compliance ",
  //           href: "/compliance#regulatory-compliance",
  //         },
  //         {
  //           title: "Governance & Ethics",
  //           href: "/compliance#governance-and-ethics",
  //         },
  //         {
  //           title: "AML & Financial Crime",
  //           href: "/compliance#aml-financial-crime",
  //         },
  //         {
  //           title: "Compliance Risk Assessment",
  //           href: "/compliance#compliance-risk-assessment",
  //         },
  //         {
  //           title: "Regulatory Reporting",
  //           href: "/compliance#regulatory-reporting",
  //         },
  //         {
  //           title: "Compliance Training & Monitoring",
  //           href: "/compliance#compliance-training-monitoring",
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   id: "media-and-insights",
  //   title: "Media and Insights",
  //   href: "/media-and-insights",
  //   subItems: [],
  // },
  // {
  //   id: "contact-us",
  //   title: "Contact Us",
  //   href: "",
  //   subItems: [],
  // },
];

const ClientNavbar = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedMain, setSelectedMain] = useState<any>(null);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [_isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // mobile

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      console.log("Window resized, is mobile:", mobile);
      setIsMobile(mobile);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeDropdown = () => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => setOpenDropdown(null),
      });
    } else {
      setOpenDropdown(null);
    }
  };

  const _handleMouseEnter = (item: any) => {
    if (isMobile) return; // ✅ do nothing on mobile
    setOpenDropdown(item.id);
  };

  const _handleMouseLeave = () => {
    if (isMobile) return; // ✅ ignore on mobile
    closeDropdown();
  };

  const handleMainSelect = (item: any) => {
    if (selectedMain?.id === item.id) {
      setSelectedMain(null);
      setSelectedSub(null);
    } else {
      setSelectedMain(item);
      setSelectedSub(null);
    }
  };

  const handleSubSelect = (subItem: any) => {
    if (selectedSub?.title === subItem.title) setSelectedSub(null);
    else setSelectedSub(subItem);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        if (openDropdown) {
          closeDropdown();
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, isMobileMenuOpen, closeDropdown]);

  useEffect(() => {
    navItemRefs.current.forEach((item, _index) => {
      if (item) {
        const handleMouseEnter = () => {
          gsap.to(item, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          item.removeEventListener("mouseenter", handleMouseEnter);
          item.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });
  }, []);

  const _toggleDropdown = (item: string) => {
    if (openDropdown === item) {
      closeDropdown();
    } else {
      setOpenDropdown(item);
      if (dropdownRef.current) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
      } else {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      }
      setOpenDropdown(null);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isNavVisible]);

  const _openNav = () => {
    setIsOpen(true);
  };
  const _openNavMobile = () => {
    setIsMobileMenuOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };
  const closeNavMobile = () => {
    setIsMobileMenuOpen(false);
  };

  const _MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100vh", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 z-50 w-full overflow-hidden bg-[#181818] text-white md:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => {
                closeNavMobile();
                closeNav();
              }}
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>

          {selectedMain && (
            <button
              onClick={() =>
                selectedSub ? setSelectedSub(null) : setSelectedMain(null)
              }
              className="my-6 flex w-full items-center gap-2 text-white"
              style={{ margin: 45 }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="mr-8" style={{ marginLeft: 65 }}>
            <h2 className="my-3 font-semibold text-lg">
              {selectedSub
                ? selectedSub.title
                : selectedMain
                  ? selectedMain.title
                  : ""}
            </h2>
          </div>

          {/* Content */}
          <div
            className="h-full overflow-y-auto bg-[#181818] p-4"
            style={{ marginLeft: 45 }}
          >
            {/* Main Menu - No animation wrapper needed since container animates */}
            {!selectedMain && (
              <div>
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMainSelect(item)}
                    className="flex w-full items-center justify-between rounded-lg p-4 pr-8 text-left text-white transition hover:bg-white/10"
                  >
                    <span>{item.title}</span>
                    {(item?.subItems?.length as any) > 0 && (
                      <ChevronRight size={20} className="text-white/60" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Sub-menus - Side animations */}
            <AnimatePresence mode="wait">
              {selectedMain && !selectedSub && (
                <motion.div
                  key="submenu"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {selectedMain.subItems?.map((sub: any) => (
                    <button
                      key={sub.title}
                      onClick={() => {
                        if (sub.subItems && sub.subItems.length > 0) {
                          handleSubSelect(sub);
                        } else {
                          router.push(sub.href);
                          closeNavMobile();
                          closeNav();
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-lg p-4 pr-8 text-left text-white transition hover:bg-white/10"
                    >
                      <span>{sub.title}</span>
                      {sub.subItems?.length > 0 && (
                        <ChevronRight size={20} className="text-white/60" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}

              {selectedSub && (
                <motion.div
                  key="subsubmenu"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {selectedSub.subItems?.map((child: any) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      onClick={() => {
                        closeNavMobile();
                        closeNav();
                      }}
                      className="block w-full rounded-lg p-4 text-left text-white hover:bg-white/10"
                    >
                      {child.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // return (
  //   <header
  //     ref={navContainerRef}
  //     className="fixed inset-x-0 z-50 h-32 border-none transition-all duration-700 bg-[#fff]"
  //   >
  //     {/* <div className="absolute top-1/2 w-full -translate-y-1/2"> */}
  //     <nav className="flex size-full items-center justify-between p-4 md:px-20">
  //       <div className="md:hidden flex items-center gap-16">
  //         <div className="flex items-center gap-7 z-20">
  //           <button
  //             onClick={() => {
  //               if (isMobile) {
  //                 if (isMobileMenuOpen) {
  //                   closeNavMobile();
  //                 } else {
  //                   openNavMobile();
  //                 }
  //               } else {
  //                 if (isOpen) {
  //                   closeNav();
  //                 } else {
  //                   openNav();
  //                 }
  //               }
  //               setSelectedMain(null);
  //               setSelectedSub(null);
  //             }}
  //             className="relative w-6 md:w-10 h-4 md:h-6 flex flex-col justify-between items-center"
  //           >
  //             <div
  //               className={cn(
  //                 `w-8 h-[3px] bg-[#739F46] transition-all duration-300 ease-in-out `,
  //                 isOpen
  //                   ? "rotate-45 transform translate-y-2.5 h-[3px] bg-[#739F46]"
  //                   : "",
  //               )}
  //             />
  //             <div
  //               className={cn(
  //                 `w-8 h-[3px] bg-[#739F46]  transition-all duration-300 ease-in-out`,
  //                 isOpen ? "opacity-0 bg-[#739F46] " : "opacity-100",
  //               )}
  //             />
  //             <div
  //               className={cn(
  //                 `w-8 h-[3px] bg-[#739F46]  transition-all duration-300 ease-in-out`,
  //                 isOpen
  //                   ? "-rotate-45 transform -translate-y-2.5 bg-[#739F46] "
  //                   : "",
  //               )}
  //             />
  //           </button>
  //         </div>
  //         {/*  <div className="hidden md:flex">
  //            <Search size={30} color="#49454F" />
  //         </div>*/}
  //       </div>

  //       <Link href={"/"} className="">
  //         <Image
  //           width={212}
  //           height={103}
  //           alt="AAlogo"
  //           src="/new_images/image 14.svg"
  //           className="w-20 h-20 md:h-[95px] md:w-[197px]"
  //         />
  //       </Link>
  //       <Navbar />
  //       {/*  <div className="flex justify-between items-center gap-2">
  //         <div className="flex items-center">
  //           <span
  //             className="text-[#222222] pr-1  text-center font-semibold text-xs md:text-lg"
  //             style={{
  //               fontFamily: "Inter",
  //             }}
  //           >
  //             EN
  //           </span>
  //           <ChevronDown size={14} color="#222222" />
  //         </div>

  //         <button
  //           onClick={() => router.push("/about")}
  //           className="bg-[#007426] md:w-[171px] flex items-center justify-center rounded-full p-2 md:px-[13px] md:py-[10px] hover:bg-[#01882e] transition-colors duration-300"
  //         >
  //           <span
  //             className="text-[#FFFFFF]  text-center font-bold text-xs md:text-base"
  //             style={{
  //               fontFamily: "Inter",
  //             }}
  //           >
  //             Partner with us
  //           </span>
  //         </button>
  //       </div>*/}
  //       {/*  <div className="hidden">
  //       <Search size={30} color="#49454F" className="w-5 h-5 md:h-7 md:w-7" />
  //       </div>*/}
  //     </nav>
  //     {/* Dropdown */}
  //     <AnimatePresence>
  //       {!isMobile && isOpen && (
  //         <motion.div
  //           key="dropdown"
  //           initial={{ height: 0, opacity: 0, y: -20 }}
  //           animate={{ height: "100vh", opacity: 1, y: 0 }}
  //           exit={{ height: 0, opacity: 0, y: -20 }}
  //           transition={{ duration: 0.4, ease: "easeInOut" }}
  //           className="z-10 fixed top-0 left-0 w-full bg-[#000] text-white flex items-center overflow-hidden md:pl-44 h-[100%]"
  //         >
  //           {/* LEFT COLUMN */}
  //           <div className="w-[30%] p-6 space-y-6 h-full pt-28 pr-10">
  //             {navigationItems.map((item, index) => {
  //               const isSelected = selectedMain?.id === item.id;

  //               return (
  //                 <div
  //                   key={item.id}
  //                   onMouseEnter={() => handleMouseEnter(item)}
  //                   onMouseLeave={handleMouseLeave}
  //                 >
  //                   <button
  //                     key={item.id}
  //                     onClick={() => {
  //                       if ((item.subItems?.length as any) > 0) {
  //                         handleMainSelect(item);
  //                       } else {
  //                         router.push(item?.href as string);
  //                         setIsOpen(false);
  //                       }
  //                     }}
  //                     className={cn(
  //                       `group w-full flex justify-between items-center text-left text-lg transition-colors duration-300 `,
  //                       // isSelected
  //                       //   ? "text-[#cc9f53]"
  //                       //   : "text-white hover:text-[#cc9f53]",
  //                       item.title === "Our Specialties" ? "pb-20" : "",
  //                     )}
  //                   >
  //                     {/* Text + Underline */}
  //                     <span className="relative inline-block cursor-pointer text-xl Inter-font font-normal group-hover:text-[#007426]">
  //                       {item.title}
  //                       <span
  //                         className={cn(
  //                           "absolute left-0 -bottom-1 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full",
  //                           // isSelected && "w-full"
  //                         )}
  //                       />
  //                     </span>

  //                     {/* Right Arrow (only if subItems exist) */}
  //                     {(item.subItems?.length as any) > 0 && (
  //                       <ChevronRight
  //                         size={25}
  //                         className={cn(
  //                           "text-white transform transition-all duration-300 ease-out group-hover:text-[#007426] group-hover:translate-x-10",
  //                           // isSelected && "text-[#cc9f53]"
  //                         )}
  //                       />
  //                     )}
  //                   </button>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //           {selectedMain && (
  //             <motion.div
  //               key="center"
  //               initial={{ width: 0 }}
  //               animate={{ width: "100%" }}
  //               exit={{ width: 0 }}
  //               transition={{ duration: 0.7, ease: "easeOut" }}
  //               className="bg-[#181818] w-full flex justify-between h-[100%] space-x-10 pl-20 font-light"
  //             >
  //               {/* CENTER COLUMN */}
  //               <AnimatePresence>
  //                 {selectedMain && (
  //                   <motion.div
  //                     key="center"
  //                     initial={{ width: "50%" }} // start offscreen to the right
  //                     animate={{ width: "50%" }} // slide in from right to left
  //                     exit={{ width: 0 }} // slide out back to the right
  //                     transition={{
  //                       duration: 0.4,
  //                       ease: "easeOut",
  //                     }}
  //                     className="w-2/4 p-6 space-y-6  h-full pt-28 bg-[#181818]"
  //                   >
  //                     <Link
  //                       onClick={() => {
  //                         closeNav();
  //                       }}
  //                       href={selectedMain?.href as string}
  //                       className="relative inline-block cursor-pointer text-xl group hover:text-[#007426]"
  //                     >
  //                       {selectedMain.title}
  //                       <span
  //                         className={cn(
  //                           "absolute left-0 -bottom-1 h-[2px] w-full bg-[#007426] transition-all duration-300 ease-out group-hover:w-full",
  //                         )}
  //                       />
  //                     </Link>

  //                     {selectedMain.subItems?.map((sub: any) => {
  //                       const isSelected = selectedSub?.title === sub.title;

  //                       return (
  //                         <button
  //                           key={sub.title || sub.name}
  //                           onClick={() => {
  //                             if (sub.subItems && sub.subItems.length > 0) {
  //                               handleSubSelect(sub);
  //                             } else {
  //                               // navigate directly if no subitems
  //                               router.push(sub.href);
  //                               setIsOpen(false);
  //                             }
  //                           }}
  //                           className={cn(
  //                             `group w-full flex justify-between items-center text-left text-xl transition-colors duration-300`, // isSelected
  //                             //   ? "text-[#cc9f53]"
  //                             //   : "text-white hover:text-[#cc9f53]")}
  //                           )}
  //                         >
  //                           <span className="relative inline-block cursor-pointer font-thin group-hover:text-[#007426]">
  //                             {sub.title || sub.name}
  //                             <span
  //                               className={cn(
  //                                 "absolute left-0 -bottom-1 h-[1px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full",
  //                                 // isSelected && "w-full"
  //                               )}
  //                             />
  //                           </span>
  //                           {/* Right Arrow (only if subItems exist) */}
  //                           {sub.subItems?.length > 0 && (
  //                             <ChevronRight
  //                               size={25}
  //                               className={cn(
  //                                 "text-white transform transition-all duration-300 ease-out group-hover:text-[#007426] group-hover:translate-x-10",
  //                                 // isSelected && "text-[#cc9f53]"
  //                               )}
  //                             />
  //                           )}
  //                         </button>
  //                       );
  //                     })}
  //                   </motion.div>
  //                 )}
  //               </AnimatePresence>

  //               {/* RIGHT COLUMN */}
  //               <AnimatePresence>
  //                 {selectedSub && selectedSub.subItems?.length > 0 && (
  //                   <motion.div
  //                     key="right"
  //                     initial={{ opacity: 0, x: 0 }}
  //                     animate={{ opacity: 1, x: 0 }}
  //                     exit={{ opacity: 0, x: 0 }}
  //                     transition={{ duration: 0.3, ease: "easeOut" }}
  //                     className="w-1/3 flex-1 p-6 space-y-4  bg-[#181818] pt-28 h-[100%]"
  //                   >
  //                     <Link
  //                       onClick={() => {
  //                         closeNav();
  //                       }}
  //                       href={selectedSub?.href as string}
  //                       className="relative inline-block cursor-pointer text-xl group hover:text-[#007426]"
  //                     >
  //                       {selectedSub.title}
  //                       <span
  //                         className={cn(
  //                           "absolute left-0 -bottom-1 h-[2px] w-full bg-[#007426] transition-all duration-300 ease-out group-hover:w-full",
  //                         )}
  //                       />
  //                     </Link>
  //                     {selectedSub.subItems.map((child: any) => (
  //                       <Link
  //                         onClick={() => {
  //                           closeNav();
  //                         }}
  //                         key={child.title || child.name}
  //                         href={child.href}
  //                         className="relative group block text-[#fff] hover:text-[#007426] transition-colors"
  //                       >
  //                         <span className="relative inline-block cursor-pointer text-xl font-thin group-hover:text-[#007426]">
  //                           {child.title || child.name}
  //                           <span
  //                             className={cn(
  //                               "absolute left-0 -bottom-1 h-[1px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full",
  //                               // isSelected && "w-full"
  //                             )}
  //                           />
  //                         </span>
  //                       </Link>
  //                     ))}
  //                   </motion.div>
  //                 )}
  //               </AnimatePresence>
  //             </motion.div>
  //           )}
  //         </motion.div>
  //       )}
  //     </AnimatePresence>
  //     {isMobile && <MobileMenu />}
  //   </header>
  // );

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full border-gray-100 border-b bg-white">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between md:h-20">
        <Link href={"/"} className="">
          <Image
            width={212}
            height={103}
            alt="AAlogo"
            src="/new_images/image 14.svg"
            className="ml-2 h-20 w-20 md:-mr-5 md:h-[55px] md:w-[197px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="group relative"
              onMouseEnter={() =>
                item.isDropdown && setActiveDropdown(item.title)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item?.href as string}
                className="flex items-center gap-1 py-7 font-medium text-[15px] text-gray-700 transition-colors hover:text-emerald-900"
              >
                {item.title}
                {item.isDropdown && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeDropdown === item.title && "rotate-180",
                    )}
                  />
                )}
              </Link>

              {/* Mega-Menu Dropdown */}
              {item.isDropdown && (
                <div
                  className={cn(
                    "absolute top-full left-1/2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-50 bg-white p-5 shadow-2xl transition-all duration-200 ease-out",
                    activeDropdown === item.title
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-2 opacity-0",
                  )}
                >
                  <div className="grid grid-cols-1 gap-3">
                    {item.subItems?.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href as string}
                        className="group/item flex items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-gray-100 hover:bg-gray-50"
                      >
                        {/* <div className="p-2 bg-gray-100 rounded group-hover/item:bg-white transition-colors">
                          {child.icon}
                        </div> */}
                        <span className="font-medium text-[13px] text-gray-600 group-hover/item:text-black">
                          {child.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <a
          style={{ fontFamily: "Inter" }}
          href="https://forms.fillout.com/t/oEtePaNuxSus"
          target="_blank"
          // variant="outline"
          className="hidden w-fit rounded-full border-2 border-[#fff] bg-[#026B20] px-8 py-2 text-[#fff] hover:bg-[#026B20] hover:text-white md:flex"
          rel="noopener"
        >
          Contact Us
        </a>
        {/* <Menu className="" /> */}
        {/* Mobile Menu Button */}
        <button
          className="p-2 text-gray-600 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Sidebar/Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-20 z-50 flex transform flex-col gap-6 bg-white px-4 transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {navigationItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-4">
            <Link
              href={item.href as string}
              className="border-gray-50 border-b pb-2 font-semibold text-xl"
              onClick={() => !item.isDropdown && setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
            {item.isDropdown && (
              <div className="flex flex-col gap-4 pl-4">
                {item.subItems?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href as string}
                    className="flex items-center gap-2 text-gray-500 text-sm"
                  >
                    {/* {child.icon}  */}
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <a
          style={{ fontFamily: "Inter" }}
          href="https://forms.fillout.com/t/oEtePaNuxSus"
          target="_blank"
          // variant="outline"
          className="hidden w-fit rounded-full border-2 border-[#fff] bg-[#026B20] px-8 py-2 text-[#fff] hover:bg-[#026B20] hover:text-white md:flex"
          rel="noopener"
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default ClientNavbar;
