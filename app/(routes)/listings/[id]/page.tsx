"use client";

import * as motion from "motion/react-client";
import { ArrowLeft, Building2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ClientNavbar from "@/components/client-navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

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

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then(async (r) => {
        if (!r.ok) { setNotFound(true); return; }
        setListing(await r.json());
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ClientNavbar />
        <div className="mx-auto max-w-[90rem] px-4 pt-32 md:px-8">
          <div className="animate-pulse">
            <div className="mb-6 h-8 w-48 rounded bg-zinc-100" />
            <div className="mb-8 aspect-[16/7] w-full rounded-3xl bg-zinc-100" />
            <div className="mb-3 h-6 w-2/3 rounded bg-zinc-100" />
            <div className="h-4 w-1/3 rounded bg-zinc-100" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="min-h-screen bg-white">
        <ClientNavbar />
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <Building2 className="mb-4 h-12 w-12 text-zinc-300" />
          <h1 className="mb-2 font-bold text-2xl text-zinc-800">Listing not found</h1>
          <p className="mb-8 text-zinc-500">This listing may have been removed or is no longer available.</p>
          <Link href="/listings">
            <Button variant="outline">Back to listings</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ClientNavbar />

      <div className="mx-auto max-w-[90rem] px-4 pt-28 pb-20 md:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/listings"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#004714] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All listings
          </Link>
        </motion.div>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-12">
          {/* Left col */}
          <div>
            {/* Title + badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#004714]/10 px-3 py-1 text-xs font-semibold text-[#004714]">
                  {listing.type}
                </span>
              </div>
              <h1 className="font-bold text-3xl text-zinc-900 md:text-4xl">{listing.title}</h1>
              {listing.location && (
                <p className="mt-2 flex items-center gap-1.5 text-zinc-500">
                  <MapPin className="h-4 w-4 shrink-0 text-[#739F46]" />
                  {listing.location}
                </p>
              )}
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-100"
            >
              {listing.imageUrl ? (
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-300">
                  <Building2 className="h-16 w-16" />
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            {listing.description && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="mb-8 border-t pt-8"
              >
                <h2 className="mb-3 font-semibold text-lg text-zinc-900">About this listing</h2>
                <p className="whitespace-pre-wrap leading-relaxed text-zinc-600">{listing.description}</p>
              </motion.div>
            )}

            {/* Details grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="border-t pt-8"
            >
              <h2 className="mb-4 font-semibold text-lg text-zinc-900">Details</h2>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-zinc-50 p-4">
                  <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">Type</dt>
                  <dd className="font-semibold text-zinc-800">{listing.type}</dd>
                </div>
                {listing.location && (
                  <div className="rounded-xl bg-zinc-50 p-4">
                    <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">Location</dt>
                    <dd className="font-semibold text-zinc-800">{listing.location}</dd>
                  </div>
                )}
                {listing.price != null && (
                  <div className="rounded-xl bg-[#004714]/5 p-4">
                    <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-[#004714]/60">Price</dt>
                    <dd className="font-bold text-[#004714]">${listing.price.toLocaleString()}</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          </div>

          {/* Right col — sticky contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 lg:mt-0"
          >
            <div className="sticky top-24 rounded-2xl border p-6 shadow-sm">
              {listing.price != null && (
                <div className="mb-5 border-b pb-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Asking price</p>
                  <p className="mt-1 font-bold text-3xl text-[#004714]">
                    ${listing.price.toLocaleString()}
                  </p>
                </div>
              )}

              <div className="mb-5 space-y-2">
                <p className="font-semibold text-zinc-900">Interested in this listing?</p>
                <p className="text-sm leading-relaxed text-zinc-500">
                  Get in touch with our team to learn more or schedule a consultation.
                </p>
              </div>

              <div className="space-y-3">
                <a href="mailto:connect@africanaspirations.com" className="block">
                  <Button className="w-full gap-2 bg-[#004714] hover:bg-[#004714]/90">
                    <Mail className="h-4 w-4" />
                    Email us
                  </Button>
                </a>
                <a href="tel:+233030 398 2318" className="block">
                  <Button variant="outline" className="w-full gap-2 border-[#004714] text-[#004714] hover:bg-[#004714]/5">
                    <Phone className="h-4 w-4" />
                    Call us
                  </Button>
                </a>
              </div>

              <p className="mt-5 text-center text-xs text-zinc-400">
                Reference: {listing.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
