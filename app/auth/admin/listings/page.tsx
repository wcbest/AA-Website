"use client";

import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertModal } from "@/components/alert";
import EmptyState from "@/components/empty-state";
import { Heading } from "@/components/heading";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";

interface Listing {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  type: string;
  location: string | null;
  image_url: string | null;
  created_at: string;
}

const ListingsPage = () => {
  const { onOpen } = useModal();
  const router = useRouter();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/listings");
      setListings(res.data);
    } catch {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/listings/${deleteId}`);
      toast.success("Listing deleted");
      setDeleteId(null);
      fetchListings();
    } catch {
      toast.error("Failed to delete listing");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Heading
            title={`Listings (${listings.length})`}
            description="Manage business and real estate listings"
          />
          <Button onClick={() => onOpen("createListing")}>
            <Plus className="mr-2 h-4 w-4" />
            Add listing
          </Button>
        </div>
      </div>

      <Separator />

      <div className="min-h-[60vh] p-8">
        {loading && (
          <div className="flex w-full items-center justify-center py-10">
            <Loader />
          </div>
        )}

        {!loading && listings.length === 0 && (
          <div className="flex w-full items-center justify-center py-10">
            <EmptyState title="No listings yet" subtitle="Add your first listing above" />
          </div>
        )}

        {!loading && listings.length > 0 && (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Image</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {listings.map((listing) => (
                  <tr key={listing.id} className="bg-white hover:bg-zinc-50">
                    <td className="px-4 py-3">
                      {listing.image_url ? (
                        <div className="relative h-12 w-12 overflow-hidden rounded-md">
                          <Image
                            fill
                            src={listing.image_url}
                            alt={listing.title}
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100 text-xs text-zinc-400">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="max-w-[200px] px-4 py-3">
                      <p className="truncate font-medium text-zinc-900">{listing.title}</p>
                      {listing.description && (
                        <p className="mt-0.5 truncate text-zinc-400">{listing.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                        {listing.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {listing.price != null
                        ? `$${listing.price.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {listing.location ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onOpen("editListing", { listing });
                            router.refresh();
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteId(listing.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ListingsPage;
