"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import ImageUpload from "../image-upload";

export const CreateBillBoardModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleInputChange = (e: any) => {
    setTextInput(e.target.value);
  };

  const isModalOpen = isOpen && type === "createBillboard";


  const submit = async () => {
    try {
      setLoading(true);

      const _response = await axios.post(
        "/api/billboards/",
        {
          label: textInput,
          imageUrl: file,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Billboard created successfully!!");
      setTextInput("");
      setFile("");
      handleClose();
      data?.onSuccess?.();
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="overflow-hidden bg-white p-0 text-black">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-center font-bold text-2xl">
              Create Billboard
            </DialogTitle>
          </DialogHeader>
          <form className="m-4">
            <ImageUpload setFile={setFile} />
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter text"
              value={textInput}
              onChange={handleInputChange}
            />
          </form>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button onClick={submit}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
