"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { label: "Products", href: "/auth/admin" },
  { label: "Listings", href: "/auth/admin/listings" },
  { label: "Billboards", href: "/auth/admin/billboards" },
  { label: "Categories", href: "/auth/admin/categories" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const status = Cookies.get("isAuth");

  useEffect(() => {
    if (status === undefined || (false && pathname.startsWith("/auth/admin"))) {
      redirect("/");
    }
  });

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <div className="border-b bg-white px-8">
          <nav className="flex gap-1">
            {adminNavItems.map((item) => {
              const isActive =
                item.href === "/auth/admin"
                  ? pathname === "/auth/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "border-[#004714] text-[#004714]"
                      : "border-transparent text-zinc-500 hover:text-zinc-900",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
