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

export const CreateListingModal = () => {
  const { isOpen, type, data, onClose } = useModal();

  const isModalOpen = isOpen && type === "createListing";

  const onSubmit = async (values: ListingFormValues) => {
    await axios.post("/api/listings", values);
    toast.success("Listing created successfully");
    onClose();
    data?.onSuccess?.();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white text-black sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">New Listing</DialogTitle>
        </DialogHeader>
        <ListingForm onSubmit={onSubmit} submitLabel="Create listing" />
      </DialogContent>
    </Dialog>
  );
};
