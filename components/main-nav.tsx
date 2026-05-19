"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth-store";
import { MobileToggle } from "./mobile.toggle";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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

  return (
    <nav
      className={cn(
        "hidden sm:flex items-center space-x-4 sm:space-x-6",
        className
      )}
      {...props}
    >
      {filteredRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
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
  );
}
