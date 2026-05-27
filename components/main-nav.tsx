"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
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
  ];

  const filteredRoutes = routes;

  return (
    <nav
      className={cn(
        "hidden items-center space-x-4 sm:flex sm:space-x-6",
        className,
      )}
      {...props}
    >
      {filteredRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "font-medium text-sm transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
      {/* <MobileToggle filteredRoutes={filteredRoutes} /> */}
    </nav>
  );
}
