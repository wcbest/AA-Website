import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#151515] font-light text-white" id="footer">
      {/* Main content */}
      <div className="mx-auto grid max-w-[90rem] grid-cols-2 gap-8 px-4 py-12 pt-[76px] sm:grid-cols-3 md:grid-cols-6 md:gap-10 md:px-8">
        {/* Social */}
        <div className="col-span-2 space-y-6 sm:col-span-3 md:col-span-2">
          <Link href={"/"} className="">
            <Image
              width={212}
              height={103}
              alt="AAlogo"
              src="/new_images/Copy of AA Slides v5 Final 1.svg"
              className="h-20 w-20 md:h-[95px] md:w-[197px]"
            />
          </Link>
          <div className="space-y-2 text-[15px]">
            {/* <h3 className="text-xl font-semibold text-[#cc9f53] mb-4">
            Contact Us
          </h3> */}

            <div className="flex items-center gap-3">
              {/* <MapPin className="w-5 h-5 text-[#cc9f53]" /> */}
              <span className="font-extralight text-[15px] text-white">
                6 Koi Street, Osu. Accra, Ghana
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* <Phone className="w-5 h-5 text-[#cc9f53]" /> */}
              <a
                href="tel: +233030 398 2318"
                className="font-extralight text-[15px] text-white hover:text-inherit hover:no-underline"
              >
                030 398 2318
                {/* +233-505-099427 | +1-973-204-5796 */}
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {/* <Mail className="w-5 h-5 text-[#cc9f53]" /> */}
                <a
                  href="mailto:connect@africanaspirations.com"
                  className="font-extralight text-[15px] text-white transition hover:text-[#007426]"
                >
                  connect@africanaspirations.com
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Links */}
        <div>
          <Link
            href="/our-specialties"
            className="group relative mb-4 inline-block font-bold text-[15px] text-white hover:text-[#007426]"
          >
            Stakeholders
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
          <ul className="space-y-4">
            {[
              // { name: "Insurance", href: "/insurance" },
              // {
              //   name: "Acturial & Financial Model",
              //   href: "/acturial-and-financial-modeling#actuarial",
              // },
              // {
              //   name: "Investment & Asset-Liability Management",
              //   href: "/investment-and-asset-liability-management",
              // },
              // { name: "Risk Management", href: "/risk-management" },
              // { name: "Compliance", href: "/compliance" },

              { name: "For Sellers", href: "/business-brokerage" },
              {
                name: "For Buyers",
                href: "/business-brokerage",
              },
              {
                name: "For Investors",
                href: "/investment-and-asset-liability-management",
              },
              {
                name: "Business Advisors",
                href: "/investment-and-asset-liability-management",
              },
            ].map((link) => (
              <li key={link.name} className="text-[15px]">
                <Link
                  href={link?.href}
                  className="group relative inline-block font-extralight text-[15px] text-white transition-colors duration-300 hover:text-[#007426]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            href="#footer"
            className="group relative mb-4 inline-block font-bold text-[15px] text-white hover:text-[#007426]"
          >
            Our products
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
          <ul className="space-y-4">
            {[
              {
                name: "Valuation Report",
                href: "/business-brokerage#business-valuation",
              },
              { name: "Pitch Books", href: "/business-brokerage#pitch-books" },
              {
                name: "CIM",
                // href: "/about",
              },
              {
                name: "Industry Research Report",
                href: "/business-brokerage#research-report",
              },
              // { name: "Media & insights", href: "/media-and-insights" },
              // { name: "Refer a Business" },
              // { name: "Contact Us" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link?.href}
                  className="group relative inline-block font-extralight text-[15px] text-white transition-colors duration-300 hover:text-[#007426]"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            href="#footer"
            className="group relative mb-4 inline-block font-bold text-[15px] text-white hover:text-[#007426]"
          >
            Other Links
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
          <ul className="space-y-4">
            {[
              {
                name: "TBA Ghana",
                href: "https://tworld.com.gh/",
              },
              { name: "Services Providers" },
              { name: "Refer a business" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  target="_blank"
                  href={link?.href}
                  className="group relative inline-block font-extralight text-[15px] text-white transition-colors duration-300 hover:text-[#007426]"
                  rel="noopener"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#007426] transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Social Icons */}
        <div className="col-span-2 flex flex-col items-start gap-5 sm:col-span-1 md:justify-self-end">
          <a
            target="_blank"
            href="http://linkedin.com/company/african-aspirations/"
            className="footer-svg transition"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <title>linkedin_line</title>
              <g id="linkedin_line" fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                <path
                  className="icon-path"
                  fill="#09244BFF"
                  d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M8 10a1 1 0 0 1 .993.883L9 11v5a1 1 0 0 1-1.993.117L7 16v-5a1 1 0 0 1 1-1m3-1a1 1 0 0 1 .984.821 5.82 5.82 0 0 1 .623-.313c.667-.285 1.666-.442 2.568-.159.473.15.948.43 1.3.907.315.425.485.942.519 1.523L17 12v4a1 1 0 0 1-1.993.117L15 16v-4c0-.33-.08-.484-.132-.555a.548.548 0 0 0-.293-.188c-.348-.11-.849-.052-1.182.09-.5.214-.958.55-1.27.861L12 12.34V16a1 1 0 0 1-1.993.117L10 16v-6a1 1 0 0 1 1-1M8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                />
              </g>
            </svg>
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/share/1BaJ73G9gw/?mibextid=wwXIfr"
            className="footer-svg transition"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <title>facebook_fill</title>
              <g id="facebook_fill" fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                <path
                  className="icon-path"
                  fill="#09244BFF"
                  d="M13.5 21.888C18.311 21.164 22 17.013 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.013 3.689 9.165 8.5 9.888V15H9a1.5 1.5 0 0 1 0-3h1.5v-2A3.5 3.5 0 0 1 14 6.5h.5a1.5 1.5 0 0 1 0 3H14a.5.5 0 0 0-.5.5v2H15a1.5 1.5 0 0 1 0 3h-1.5z"
                />
              </g>
            </svg>
          </a>
          <a
            target="_blank"
            href="http://instagram.com/africanasp.gh/"
            className="footer-svg transition"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <title>instagram_line</title>
              <g id="instagram_line" fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                <path
                  className="icon-path"
                  fill="#ffff"
                  d="M16 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-4 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m4.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                />
              </g>
            </svg>
          </a>
          <a
            target="_blank"
            href="https://x.com/AfricanAspGh"
            className="footer-svg transition"
            rel="noopener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <title>social_x_line</title>
              <g id="social_x_line" fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z" />
                <path
                  fill="#ffff"
                  className="icon-path"
                  d="M19.753 4.659a1 1 0 0 0-1.506-1.317l-5.11 5.84L8.8 3.4A1 1 0 0 0 8 3H4a1 1 0 0 0-.8 1.6l6.437 8.582-5.39 6.16a1 1 0 0 0 1.506 1.317l5.11-5.841L15.2 20.6a1 1 0 0 0 .8.4h4a1 1 0 0 0 .8-1.6l-6.437-8.582 5.39-6.16ZM16.5 19 6 5h1.5L18 19z"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-3 border-white/10 border-t px-4 pt-6 pb-8 md:flex-row md:items-center md:gap-0 md:px-8">
        <span
          className="font-normal text-[15px] text-white"
          style={{ fontFamily: "Inter" }}
        >
          Copyright © {new Date().getFullYear()}. African Aspirations.
        </span>
        <div className="flex items-center gap-6">
          <span
            className="font-normal text-[#81878A] text-[15px]"
            style={{ fontFamily: "Inter" }}
          >
            Privacy Policy
          </span>
          <span
            className="font-normal text-[#81878A] text-[15px]"
            style={{ fontFamily: "Inter" }}
          >
            Terms of Use
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
