"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NavMenu = () => {
  const [categories, setCategories] = useState([]);
  const [_loading, setLoading] = useState(false);
  const router = useRouter();

  // get all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/api/categories/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCategories(response.data);
      } catch (error: any) {
        console.error(error.response);
        // toast.error("Something went wrong!!");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <nav
      className={cn("hidden items-center space-x-4 sm:flex lg:space-x-6")}
      // {...props}
    >
      {categories.map((route: any) => (
        <div
          key={route._id}
          onClick={() => router.push(`/category/${route.label}`)}
          className={cn(
            "cursor-pointer font-medium text-sm transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </div>
      ))}
      {/* <MobileToggle categories={categories} /> */}
    </nav>
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <NavigationMenuTrigger>
    //         {" "}
    //         <p className="text-gray-500">Categories</p>
    //       </NavigationMenuTrigger>
    //       <NavigationMenuContent>
    //         <NavigationMenuLink>
    //           <div className="flex items-start justify-start flex-wrap mr-auto">
    //             <div className="m-4 flex justify-between flex-wrap">
    //               {categories?.map((category: any) => (
    //                 <div
    //                   className="flex cursor-pointer items-center justify-between hover:rounded-sm hover:border-[0.5px] hover:border-black/25  bg-white px-4 py-2 h-full w-64"
    //                   key={category._id}
    //                   onClick={() => router.push(`/category/${category.label}`)}
    //                 >
    //                   <div className="flex items-center justify-between gap-1 w-full">
    //                     <div className="flex justify-between flex-col items-start ">
    //                       <p className="text-sm text-black ">
    //                         {category.label}
    //                       </p>
    //                       <p className="text-xs text-gray-400 ">
    //                         {category.desc}
    //                       </p>
    //                     </div>
    //                     <p className="text-sm text-black ">
    //                       <ChevronRight size={16} />
    //                     </p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         </NavigationMenuLink>
    //       </NavigationMenuContent>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
};

export default NavMenu;
