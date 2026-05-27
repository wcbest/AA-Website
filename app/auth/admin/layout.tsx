"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth-store";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { label: "Products", href: "/auth/admin" },
  { label: "Listings", href: "/auth/admin/listings" },
  { label: "Billboards", href: "/auth/admin/billboards" },
  { label: "Categories", href: "/auth/admin/categories" },
];

interface LoginFields {
  email: string;
  password: string;
}

function AdminLoginGate({ onSuccess }: { onSuccess: () => void }) {
  const { onLogin } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFields>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFields) => {
    try {
      setServerError("");
      const res = await axios.post("/api/auth/login", data);
      localStorage.setItem("user", res.data.id);
      localStorage.setItem("name", res.data.name);
      Cookies.set("isAuth", "true", { expires: 7 });
      onLogin(res.data);
      toast.success("Logged in");
      onSuccess();
    } catch (err: any) {
      setServerError(err.response?.data ?? "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-zinc-100">
        <h1 className="mb-1 font-bold text-2xl text-zinc-900">Admin sign in</h1>
        <p className="mb-6 text-sm text-zinc-500">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className="text-zinc-900"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="text-zinc-900"
            {...register("password", { required: true })}
          />

          {serverError && (
            <p className="text-red-500 text-sm">{serverError}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(!!Cookies.get("isAuth"));
  }, []);

  // avoid hydration mismatch — render nothing until client has read the cookie
  if (authed === null) return null;

  if (!authed) {
    return <AdminLoginGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <div className="border-b bg-white px-8">
          <nav className="flex gap-1">
            {adminNavItems.map((item) => {
              const active =
                item.href === "/auth/admin"
                  ? pathname === "/auth/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                    active
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
