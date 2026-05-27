"use client";

import axios from "axios";
import { toast } from "sonner";
import { ListingForm, type ListingFormValues } from "@/components/admin/listing-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

export const EditListingModal = () => {
  const { isOpen, type, data, onClose } = useModal();

  const isModalOpen = isOpen && type === "editListing";
  const listing = data?.listing;

  const onSubmit = async (values: ListingFormValues) => {
    await axios.put(`/api/listings/${listing.id}`, values);
    toast.success("Listing updated successfully");
    onClose();
    data?.onSuccess?.();
  };

  if (!listing) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white text-black sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Edit Listing</DialogTitle>
        </DialogHeader>
        <ListingForm
          defaultValues={{
            title: listing.title,
            description: listing.description ?? "",
            price: listing.price ?? undefined,
            type: listing.type,
            location: listing.location ?? "",
            image_url: listing.imageUrl ?? "",
            published: listing.published === 1 || listing.published === true,
          }}
          onSubmit={onSubmit}
          submitLabel="Save changes"
        />
      </DialogContent>
    </Dialog>
  );
};
