"use client";

import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

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
    <div className="m-2">
      <div className="group col-span-1 cursor-pointer">
        <div
          className="flex w-full flex-col gap-2"
          onClick={() => router.push(`/products/${_id}`)}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-xl">
            <Image
              fill
              className="h-full w-full object-cover transition group-hover:scale-110"
              src={imageUrl}
              alt="Listing"
            />
            <div className="absolute top-3 right-3">
              {/* <HeartButton
                listingId={item.id}
                // currentUser={currentUser}
              /> */}
            </div>
          </div>
          <div className="w-36 overflow-hidden truncate font-semibold text-lg">
            {name}
          </div>
          <div className="w-36 overflow-hidden truncate font-light text-neutral-500">
            {desc}
          </div>
          <div className="flex flex-row items-center gap-1">
            {/* <div className="font-semibold"> $ 40 </div> */}
            {/* {!item.reservations && <div className="font-light">night</div>} */}
            {/* <div className="font-light">night</div> */}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
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
