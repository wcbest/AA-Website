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
      <div className="mx-auto max-w-[90rem] px-4 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div>
            <h2
              className="mb-8 font-bold text-4xl text-[#000000] md:mb-20 md:text-7xl"
              style={{ fontFamily: "Inter" }}
            >
              Our Global
              <br />
              Partner
            </h2>
            <div className="max-w-[483px]">
              <p className="mb-8 font-normal text-[#81878A] text-sm leading-relaxed md:text-lg">
                {description}
              </p>
            </div>
          </div>

          {/* Left: Description */}

          {/* Right: Logo and Stats */}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 md:mb-20">
              <Image
                src={partnerLogo || "/placeholder.svg"}
                alt={partnerName}
                width={300}
                height={80}
                className="h-24 w-auto"
              />
            </div>

            <div className="border-[#8FDC40B2] border-t-2 pt-8">
              <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="mb-2 font-bold text-2xl text-[#015A1A] md:text-3xl"
                      style={{ fontFamily: "Inter" }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="font-normal text-[#636466] text-xs leading-tight md:text-sm"
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
          <p className="max-w-5xl font-normal text-[#636466] text-sm leading-relaxed md:text-lg">
            {detailText}
          </p>
        </div>
      </div>
    </section>
  );
}
