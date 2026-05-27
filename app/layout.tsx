import { Analytics } from "@vercel/analytics/react";
import { Agentation } from "agentation";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "African Aspirations",
  description: "African Aspirations fuels Africa's success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("w-full")}>
        {children}

        <Analytics />
        {process.env.NODE_ENV === "development" && (
          <Agentation endpoint="http://localhost:4747" />
        )}
        <ModalProvider />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
