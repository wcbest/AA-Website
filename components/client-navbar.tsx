"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
      { title: "Our Story", href: "/about#our-story" },
      { title: "Leadership Team", href: "/about#our-team" },
      { title: "Values & Impact", href: "/about#our-global-partner" },
      { title: "Transworld Business Advisory", href: "/about#our-global-partner" },
    ],
  },
  {
    id: "services",
    title: "Services",
    href: "/services",
    isDropdown: true,
    subItems: [
      { title: "Business Consulting", href: "/business-consulting" },
      { title: "Business Funding", href: "/business-funding" },
      { title: "Business Brokerage", href: "/business-brokerage" },
    ],
  },
  {
    id: "listings",
    title: "Listings",
    href: "/listings",
    isDropdown: true,
    subItems: [
      { title: "All Listings", href: "/listings" },
      { title: "Businesses", href: "/listings?type=Business" },
      { title: "Real Estate", href: "/listings?type=Real+Estate" },
    ],
  },
  {
    id: "products",
    title: "Our products",
    href: "/products",
    isDropdown: true,
    subItems: [
      { title: "Valuation reports", href: "/business-brokerage#business-valuation" },
      { title: "Pitch books", href: "/business-brokerage#pitch-books" },
      { title: "CIM", href: "#" },
      { title: "Industry Research Report", href: "#" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    href: "/resources",
    isDropdown: true,
    subItems: [
      { title: "Industry blog", href: "#" },
      { title: "Case study", href: "#" },
      { title: "Newsletter", href: "#" },
      { title: "Industry Research Report", href: "#" },
    ],
  },
];

const ClientNavbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setActiveDropdown(null);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown / mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      animate={{ y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 z-[100] w-full border-gray-100 border-b bg-white"
    >
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between md:h-20">
        <Link href="/">
          <Image
            width={212}
            height={103}
            alt="AAlogo"
            src="/new_images/image 14.svg"
            className="ml-2 h-24 w-24 md:-mr-5 md:h-[65px] md:w-[230px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="group relative"
              onMouseEnter={() => item.isDropdown && setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href as string}
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

              {item.isDropdown && (
                <div
                  className={cn(
                    "absolute top-full left-1/2 w-[280px] -translate-x-1/2 rounded-xl border border-gray-50 bg-white p-5 shadow-2xl transition-all duration-200 ease-out",
                    activeDropdown === item.title
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-2 opacity-0",
                  )}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {item.subItems?.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href as string}
                        className="group/item flex items-center gap-3 rounded-lg border border-transparent p-3 transition-all hover:border-gray-100 hover:bg-gray-50"
                      >
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
          rel="noopener"
          className="hidden w-fit rounded-full border-2 border-[#fff] bg-gradient-to-b from-[#026B20] to-[#004714] px-8 py-2 text-[#fff] hover:opacity-90 md:flex"
        >
          Contact Us
        </a>

        {/* Mobile menu toggle */}
        <button
          className="p-2 text-gray-600 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
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
              onClick={() => setIsMobileMenuOpen(false)}
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

export default ClientNavbar;
