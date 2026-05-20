"use client";

import Cookies from "js-cookie";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useAuth } from "@/hooks/use-auth-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onLogin, onLogout, isAuth, data } = useAuth();
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
      <div className="mt-20">{children}</div>
      <Footer />
    </>
  );
}
