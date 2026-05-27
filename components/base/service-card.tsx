import Image from "next/image";
import { ServiceListItem } from "./service-list-item";

interface ServiceCardProps {
  title: string;
  index: number;
  image: string;
  items: string[];
}

/**
 * Numbered service block: large title, image on the left, bullet checklist on the right.
 * Used in the Business Brokerage page services section.
 */
export function ServiceCard({ title, index, image, items }: ServiceCardProps) {
  return (
    <div>
      <h3
        className="mb-8 w-full font-semibold text-2xl text-[#739F46] md:mb-14 md:text-6xl"
        style={{ fontFamily: "Inter" }}
      >
        <span className="font-semibold text-2xl text-[#739F46] md:text-6xl">
          {index + 1}.
        </span>{" "}
        {title}
      </h3>
      <div className="flex flex-col items-stretch overflow-hidden bg-white transition-all duration-300 hover:translate-y-[-2px] md:gap-20 lg:flex-row">
        <div className="relative h-56 lg:w-2/5">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="h-full rounded-3xl object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center px-8 lg:px-10">
          <div className="space-y-4">
            {items.map((item) => (
              <ServiceListItem key={item}>
                <span
                  className="text-[#000000] text-lg leading-relaxed"
                  style={{ fontFamily: "Inter" }}
                >
                  {item}
                </span>
              </ServiceListItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
