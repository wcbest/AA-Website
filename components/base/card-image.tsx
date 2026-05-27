import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardImageProps {
  src: string;
  alt: string;
  /** Height class applied to the wrapper, e.g. "h-48" or "h-80". Defaults to "h-48". */
  heightClass?: string;
  className?: string;
}

export function CardImage({
  src,
  alt,
  heightClass = "h-48",
  className,
}: CardImageProps) {
  return (
    <div className={cn("group relative w-full overflow-hidden", heightClass, className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}
