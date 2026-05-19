"use client";

import Image from "next/image";

export interface Leader {
  id: number;
  name: string;
  title: string;
  image: string;
  credentials?: string;
  description?: string;
  bio1?: string;
  bio2?: string;
  bio3?: string;
  bio4?: string;
  imageAlt: string;
}

interface LeadershipCardProps {
  leader: Leader;
  isExpanded: boolean;
  onToggle: () => void;
}

export function LeadershipCard({
  leader,
  isExpanded,
  onToggle,
}: LeadershipCardProps) {
  const {
    image,
    imageAlt,
    name,
    title,
    bio1,
    bio2,
    bio3,
    bio4,
    credentials,
    description,
  } = leader;

  return (
    <div
      className={`rounded-[20px] overflow-hidden flex flex-col transition-all duration-500 ease-in-out transform ${
        isExpanded ? "md:col-span-2 lg:col-span-3" : "scale-100"
      }`}
    >
      {isExpanded ? (
        // Expanded State
        <div className="flex flex-col md:flex-row animate-fadeIn">
          <div className="relative h-full md:w-96">
            <div className="relative h-96 w-full overflow-hidden group">
              <Image
                src={image || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-[#FFFFFF]">
              <h3
                className="text-[#0C0D0C] font-bold text-xl md:text-2xl mb-3"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {name}{" "}
                <span className="font-bold text-[#739F46] text-[12px] ml-1">
                  {credentials}
                </span>
              </h3>
              <p
                className="text-[#0C0D0C] font-normal text-sm md:text-base mb-6 flex-1"
                style={{
                  fontFamily: "Inter",
                }}
              >
                {title}
              </p>
              <button
                onClick={onToggle}
                className="flex justify-end items-end self-end text-[#fff] hover:bg-transparent hover:text-white rounded-fullw-fit bg-transparent "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <title>arrow_left_circle_line</title>
                  <g
                    id="arrow_left_circle_line"
                    fill="none"
                    fill-rule="nonzero"
                  >
                    <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z" />
                    <path
                      fill="#739F46"
                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1.419 3.757a1 1 0 0 1 1.498 1.32l-.084.094-1.828 1.83h6.076a1 1 0 0 1 .116 1.992l-.116.007h-6.076l1.829 1.828a1 1 0 0 1-1.32 1.498l-.095-.084-3.535-3.535a1 1 0 0 1-.083-1.32l.083-.094 3.535-3.536Z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 pt-4 px-8 bg-white">
            <p
              className="text-[#739F46] font-bold text-xs md:text-[15px] mb-6 leading-relaxed"
              style={{
                fontFamily: "Inter",
              }}
            >
              {description}
            </p>
            <p
              className="text-[#000000] font-normal text-[10px] md:text-xs mb-4 leading-relaxed"
              style={{
                fontFamily: "Inter",
              }}
            >
              {bio1}
            </p>
            <p
              className="text-[#000000] font-normal text-[10px]  md:text-xs mb-4 leading-relaxed"
              style={{
                fontFamily: "Inter",
              }}
            >
              {bio2}
            </p>
            <p
              className="text-[#000000] font-normal text-[10px]  md:text-xs mb-4 leading-relaxed"
              style={{
                fontFamily: "Inter",
              }}
            >
              {bio3}
            </p>
            <p
              className="text-[#000000] font-normal text-[10px]  md:text-xs mb-4 leading-relaxed"
              style={{
                fontFamily: "Inter",
              }}
            >
              {bio4}
            </p>
          </div>
        </div>
      ) : (
        // Collapsed State
        <>
          <div className="relative h-80 w-full overflow-hidden group">
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col bg-[#fff] transition-all duration-300 hover:scale-[1.01] h-[94px]">
            <h3
              className="text-[#0C0D0C] font-bold text-xl mb-[2px]"
              style={{ fontFamily: "Inter" }}
            >
              {name}
              <span className="font-bold text-[#739F46] text-[10px] ml-1">
                {credentials}
              </span>
            </h3>
            <p
              className="text-[#0C0D0C] font-normal text-sm flex-1"
              style={{ fontFamily: "Inter" }}
            >
              {title}
            </p>

            <button
              onClick={onToggle}
              className="flex justify-end items-end self-end border-2 border-[#fff] text-[#fff] hover:bg-transparent hover:text-white rounded-fullw-fit bg-transparent "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <title>arrow_right_circle_line</title>
                <g id="arrow_right_circle_line" fill="none" fill-rule="nonzero">
                  <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.105.074.014.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.092.01-.009.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                  <path
                    fill="#739F46"
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.005 3.758a1 1 0 0 1 1.32-.084l.094.084 3.535 3.535a1 1 0 0 1 .083 1.32l-.083.094-3.535 3.536a1 1 0 0 1-1.498-1.32l.084-.094 1.828-1.83H7.757a1 1 0 0 1-.116-1.992L7.757 11h6.076l-1.828-1.828a1 1 0 0 1 0-1.414Z"
                  />
                </g>
              </svg>{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
