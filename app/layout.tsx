import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ReactLenis } from "@/hooks/lenis";
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
      <ReactLenis root>
        <body className={cn("w-full")}>
          {children}

          <Analytics />
        </body>
        <ModalProvider />
      </ReactLenis>
    </html>
  );
}
