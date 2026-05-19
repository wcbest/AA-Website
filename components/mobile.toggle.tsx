"use client";

import { Menu } from "lucide-react";
import Cookies from "js-cookie";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth-store";

export const MobileToggle: React.FC<any> = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { onLogin, onLogout, isAuth, data } = useAuth();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/products`,
      label: "Products",
      active: pathname === `/products`,
    },
    {
      href: `/about`,
      label: "About Us",
      active: pathname === `/about`,
    },
    // {
    //   href: `/contact`,
    //   label: "Contact Us",
    //   active: pathname === `/contact`,
    // },
    {
      href: `/auth/admin/billboards`,
      label: "Manage Billboards",
      active: pathname === `/auth/admin/billboards`,
    },
    {
      href: `/auth/admin/`,
      label: "Manage Products",
      active: pathname === `/auth/admin/`,
    },
    {
      href: `/auth/admin/categories`,
      label: "Manage Categories",
      active: pathname === `/auth/admin/categories`,
    },
  ];

  const status = Cookies.get("isAuth");

  const filteredRoutes = status
    ? routes // If authenticated, include all routes
    : routes.filter((route) => !route.href.startsWith("/auth/admin"));

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
        // toast.error("Something went wrong!!");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={18} cursor="pointer" className="flex md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0 flex-col ">
        <Image
          className="object-cover cursor-pointer"
          alt="Image"
          src={`/images/AAlogo.jpeg`}
          width={100}
          height={100}
          sizes="(max-width: 4px) 100vw, (max-width: 4px) 80vw, 1200px"
          onClick={() => router.push(`/`)}
        />
        <nav
          className={cn(
            "flex flex-col  "
            // className
          )}
          //   {...props}
        >
          {filteredRoutes.map((route: any) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-xl m-3 font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
          {/* <MobileToggle filteredRoutes={filteredRoutes} /> */}
        </nav>
        {categories?.map((route: any) => (
          <div
            key={route._id}
            onClick={() => router.push(`/category/${route.label}`)}
            className={cn(
              "font-medium transition-colors hover:text-primary cursor-pointer text-xl m-3",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};
