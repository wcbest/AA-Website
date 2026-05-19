// components/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getBreadcrumbTrail } from "@/lib/getBreadCrumbs";

export default function Breadcrumbs() {
  const pathname = usePathname() ?? "/";
  const trail = getBreadcrumbTrail(pathname);

  console.log(pathname, "path");
  console.log(trail, "trail");

  // fallback: build crumbs from pathname segments (keeps previous behavior)
  const fallbackCrumbs = (p: string) => {
    const segments = p.split("/").filter(Boolean);
    return segments.map((seg, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = decodeURIComponent(seg)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { href, title: label };
    });
  };

  const crumbs = trail.length ? trail : fallbackCrumbs(pathname);

  if (!crumbs.length) return null;

  const labelFromHref = (href: string) =>
    href
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ?? href;

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-base text-[#1E1E1E] mb-6 bg-[#F1FBE6]"
    >
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 py-3 flex items-center space-x-2">
        <Link
          href="/"
          className="flex items-center font-semibold text-[#1E1E1E] hover:text-gray-900"
        >
          Home
        </Link>

        {crumbs.map((c, i) => (
          <div
            key={`${c.href ?? c.title}-${i}`}
            className="flex items-center space-x-2"
          >
            <ChevronRight size={16} className="text-[#739F46] mx-3" />
            {i === crumbs.length - 1 || !c.href ? (
              <span className="font-normal text-[#858585]">
                {labelFromHref(c.href ?? c.title)}
              </span>
            ) : (
              <Link
                href={c.href}
                className="hover:text-gray-900 transition-colors font-normal"
              >
                {labelFromHref(c.href)}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
