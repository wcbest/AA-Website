"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import ImageUpload from "../image-upload";
import { Toaster, toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateBillBoardModal = () => {
  const { isOpen, onClose, type, data, onRender } = useModal();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleInputChange = (e: any) => {
    setTextInput(e.target.value);
  };

  const isModalOpen = isOpen && type === "createBillboard";

  const router = useRouter();

  const submit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/billboards/",
        {
          label: textInput,
          imageUrl: file,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Billboard created successfully!!");
      setTextInput("");
      setFile("");
      handleClose();
      onRender();
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
      <Toaster position="top-center" />
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Create Billboard
            </DialogTitle>
          </DialogHeader>
          <form className="m-4">
            <ImageUpload setFile={setFile} />
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
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
