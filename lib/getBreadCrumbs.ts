// lib/getBreadcrumbs.ts

import { type NavItem, navigationItems } from "@/components/client-navbar";

export type Breadcrumb = { title: string; href?: string };

function normalizePath(p?: string) {
  if (!p) return "";
  // remove trailing slash for comparison
  return p.replace(/\/+$/, "");
}

/**
 * Recursively search navigation items and return breadcrumb trail or null
 */
export function getBreadcrumbTrail(pathname: string): Breadcrumb[] {
  const normalizedPath = normalizePath(pathname);

  function findPath(
    items: NavItem[],
    parentTrail: Breadcrumb[],
  ): Breadcrumb[] | null {
    for (const item of items) {
      const itemHrefBase = normalizePath(item.href?.split("#")[0]);
      const currentTrail = [
        ...parentTrail,
        {
          title: item.title,
          href: item.subItems?.length ? undefined : item.href,
        },
      ];

      // exact match (including top-level pages)
      if (itemHrefBase && itemHrefBase === normalizedPath) {
        return currentTrail;
      }

      // if the pathname starts with this item's href base, try descend
      if (item.subItems && item.subItems.length > 0) {
        // search children
        const childResult = findPath(item.subItems, currentTrail);
        if (childResult) return childResult;
      }

      // also handle when the pathname equals a hash target under this item's href
      // e.g. pathname '/our-specialties#something' OR pathname startsWith('/our-specialties')
      if (
        itemHrefBase &&
        normalizedPath.startsWith(itemHrefBase) &&
        item.subItems
      ) {
        const childResult = findPath(item.subItems, currentTrail);
        if (childResult) return childResult;
      }
    }
    return null;
  }

  const found = findPath(navigationItems, []);
  return found ?? [];
}
