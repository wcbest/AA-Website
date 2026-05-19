"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import yourImage from "@/public/next.svg";
import { Button } from "./ui/button";
import { ShoppingBasket } from "lucide-react";

type ProductProps = {
  name: any;
  desc: string;
  imageUrl: string;
  link: string;
  _id: string;
};

const ProductCard = ({ name, desc, imageUrl, link, _id }: ProductProps) => {
  const router = useRouter();

  return (
    <div className="m-2 ">
      <div className="col-span-1 cursor-pointer group">
        <div
          className="flex flex-col gap-2 w-full"
          onClick={() => router.push(`/products/${_id}`)}
        >
          <div
            className="
      aspect-square 
      w-full 
      relative 
      overflow-hidden 
      rounded-xl
    "
          >
            <Image
              fill
              className="
        object-cover 
        h-full 
        w-full 
        group-hover:scale-110 
        transition
      "
              src={imageUrl}
              alt="Listing"
            />
            <div
              className="
      absolute
      top-3
      right-3
    "
            >
              {/* <HeartButton
                listingId={item.id}
                // currentUser={currentUser}
              /> */}
            </div>
          </div>
          <div className="font-semibold text-lg overflow-hidden truncate w-36">
            {name}
          </div>
          <div className="font-light text-neutral-500 overflow-hidden truncate w-36">
            {desc}
          </div>
          <div className="flex flex-row items-center gap-1">
            {/* <div className="font-semibold"> $ 40 </div> */}
            {/* {!item.reservations && <div className="font-light">night</div>} */}
            {/* <div className="font-light">night</div> */}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button onClick={() => router.push(`${link}`)}>
            <span className="mr-4">purchase</span>
            <ShoppingBasket size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
