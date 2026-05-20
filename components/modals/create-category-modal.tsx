"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";
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

export const CreateCategoryModal = () => {
  const { isOpen, onClose, type, data, onRender } = useModal();
  const [_file, _setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [DescInput, setDescInput] = useState("");
  const [_linkInput, _setLinkInput] = useState("");
  const [_categoryInput, _setCategoryInput] = useState("");

  const handleNameInputChange = (e: any) => {
    setNameInput(e.target.value);
  };

  const handleDescInputChange = (e: any) => {
    setDescInput(e.target.value);
  };

  const isModalOpen = isOpen && type === "createCategory";

  const _router = useRouter();

  // create category
  const submit = async () => {
    try {
      setLoading(true);

      const _response = await axios.post(
        "/api/categories/",
        {
          label: nameInput,
          desc: DescInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Category created successfully!!");
      setDescInput("");
      setNameInput("");
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
        <DialogContent className="overflow-hidden bg-white p-0 text-black">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-center font-bold text-2xl">
              Create Category
            </DialogTitle>
          </DialogHeader>
          <form action="" className="m-4">
            <Input
              className="mb-3 border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Category Name"
              onChange={handleNameInputChange}
            />
            <Input
              className="mb-3 border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Short Description"
              onChange={handleDescInputChange}
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
