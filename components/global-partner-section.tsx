import Image from "next/image";

interface Stat {
  number: string;
  label: string;
}

interface GlobalPartnerSectionProps {
  partnerName?: string;
  partnerLogo?: string;
  description?: string;
  stats?: Stat[];
  detailText?: string;
}

const defaultStats: Stat[] = [
  { number: "250", label: "Global Offices" },
  { number: "600,000+", label: "Active Investor Network" },
  { number: "1,000+", label: "Global Active Agents" },
];

export default function GlobalPartnerSection({
  partnerName = "Transworld Business Advisors",
  partnerLogo = "/new_images/TBALogo_origin.webp",
  description = "African Aspirations proudly partners with Transworld Business Advisors (TBA), the world's largest business brokerage network.",
  stats = defaultStats,
  detailText = "Through this partnership, we bring Transworld's proven systems, valuation expertise, and international investor reach to African markets. Operating as Transworld Business Advisors Ghana, we connect African business owners with qualified local and global buyers while ensuring confidentiality, fair valuation, and end-to-end transaction support. Together, African Aspirations and TBA are creating a seamless bridge between African enterprises and global opportunity.",
}: GlobalPartnerSectionProps) {
  return (
    <section className="bg-white py-16" id="our-global-partner">
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="text-4xl md:text-7xl font-bold text-[#000000] mb-8 md:mb-20"
              style={{ fontFamily: "Inter" }}
            >
              Our Global
              <br />
              Partner
            </h2>
            <div className="max-w-[483px]">
              <p className="text-[#81878A] text-sm font-normal md:text-lg leading-relaxed mb-8">
                {description}
              </p>
            </div>
          </div>

          {/* Left: Description */}

          {/* Right: Logo and Stats */}
          <div className="flex flex-col justify-center items-center">
            <div className="mb-8 md:mb-20">
              <Image
                src={partnerLogo || "/placeholder.svg"}
                alt={partnerName}
                width={300}
                height={80}
                className="h-24 w-auto"
              />
            </div>

            <div className="border-t-2 border-[#8FDC40B2] pt-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="text-2xl md:text-3xl font-bold text-[#015A1A] mb-2"
                      style={{ fontFamily: "Inter" }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="text-xs md:text-sm text-[#636466] font-normal leading-tight"
                      style={{ fontFamily: "Inter" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Text */}
        <div className="mt-8">
          <p className="text-[#636466] font-normal text-sm md:text-lg leading-relaxed max-w-5xl">
            {detailText}
          </p>
        </div>
      </div>
    </section>
  );
}
