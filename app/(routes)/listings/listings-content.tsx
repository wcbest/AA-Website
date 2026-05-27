"use client";

import * as motion from "motion/react-client";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ClientNavbar from "@/components/client-navbar";
import Footer from "@/components/footer";

interface Listing {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  type: string;
  location: string | null;
  imageUrl: string | null;
  published: number;
  createdAt: string;
}

const FILTERS = ["All", "Business", "Real Estate"] as const;
type Filter = (typeof FILTERS)[number];

export default function ListingsContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const typeParam = searchParams.get("type");
  const initialFilter = FILTERS.find((f) => f === typeParam) ?? "All";
  const [filter, setFilter] = useState<Filter>(initialFilter);

  useEffect(() => {
    fetch("/api/listings?published=true")
      .then((r) => r.json())
      .then(setListings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? listings : listings.filter((l) => l.type === filter);

  return (
    <div className="min-h-screen bg-white">
      <ClientNavbar />

      {/* Hero */}
      <section className="bg-[#004714] px-4 pb-12 pt-32 text-white md:px-8">
        <div className="mx-auto max-w-[90rem]">
          <motion.p
            className="mb-2 text-sm font-medium uppercase tracking-widest text-[#739F46]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            African Aspirations
          </motion.p>
          <motion.h1
            className="mb-3 font-bold text-4xl leading-tight md:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Browse Listings
          </motion.h1>
          <motion.p
            className="max-w-xl text-base text-white/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            Explore businesses and real estate opportunities across Africa.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[90rem] items-center gap-1 overflow-x-auto px-4 py-3 md:px-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#004714] text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {f}
            </button>
          ))}
          {!loading && (
            <span className="ml-auto shrink-0 text-sm text-zinc-400">
              {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <main className="mx-auto max-w-[90rem] px-4 py-10 md:px-8">
        {loading && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-3 aspect-[4/3] rounded-2xl bg-zinc-100" />
                <div className="mb-2 h-4 w-3/4 rounded bg-zinc-100" />
                <div className="h-3 w-1/2 rounded bg-zinc-100" />
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Building2 className="mb-4 h-10 w-10 text-zinc-300" />
            <p className="font-medium text-zinc-500">No listings found</p>
            <p className="mt-1 text-sm text-zinc-400">Check back soon for new opportunities.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/listings/${listing.id}`} className="group block">
        {/* Image */}
        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
          {listing.imageUrl ? (
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Building2 className="h-10 w-10 text-zinc-300" />
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-[#004714] backdrop-blur-sm">
            {listing.type}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p className="truncate font-semibold text-sm text-zinc-900 transition-colors group-hover:text-[#004714]">
            {listing.title}
          </p>
          {listing.location && (
            <p className="flex items-center gap-1 text-xs text-zinc-500">
              <MapPin className="h-3 w-3 shrink-0" />
              {listing.location}
            </p>
          )}
          {listing.price != null && (
            <p className="pt-0.5 font-bold text-sm text-zinc-900">
              ${listing.price.toLocaleString()}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
