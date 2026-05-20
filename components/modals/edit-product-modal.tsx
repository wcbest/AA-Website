"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal-store";
import ImageUpload from "../image-upload";

export const EditProductModal = () => {
  const { isOpen, onClose, type, data, onOpen, render, onRender } = useModal();
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [DescInput, setDescInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [getId, _setGetId] = useState("");

  const handleNameInputChange = (e: any) => {
    setNameInput(e.target.value);
  };

  const handleDescInputChange = (e: any) => {
    setDescInput(e.target.value);
  };

  const handleLinkInputChange = (e: any) => {
    setLinkInput(e.target.value);
  };

  const handCategoryInputChange = (value: any) => {
    setCategoryInput(value);
  };

  const isModalOpen = isOpen && type === "editProduct";

  const router = useRouter();

  // edit a product
  const submit = async (id: any) => {
    try {
      setLoading(true);

      const _response = await axios.patch(
        `/api/products/${id}`,
        {
          name: nameInput,
          desc: DescInput,
          link: linkInput,
          imageUrl: file,
          category: categoryInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Product updated successfully!!");
      handleClose();
      router.refresh();
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

  // get all categories
  const _getCategories = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/categories/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCategories(response.data);
    } catch (error: any) {
      console.error(error.response);
      // toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getCategories();
  //   setDescInput(data?.product?.desc);
  //   setNameInput(data?.product?.name);
  //   setLinkInput(data?.product?.link);
  //   setCategoryInput(data?.product?.category);
  //   setFile(data.product?.imageUrl);
  //   setGetId(data.product?._id);
  // }, [
  //   isOpen,
  //   onClose,
  //   onOpen,
  //   data.product?._id,
  //   data?.product?.name,
  //   data?.product?.link,
  //   data?.product?.category,
  //   data.product?.imageUrl,
  //   data.product?._id,
  //   data.product?.desc,
  // ]);

  return (
    <>
      <Toaster position="top-center" />
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="overflow-hidden bg-white p-0 text-black">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-center font-bold text-2xl">
              Edit Product
            </DialogTitle>
          </DialogHeader>
          <form action="" className="m-4">
            <ImageUpload setFile={setFile} file={file} />
            <Select
              onValueChange={(value) => {
                handCategoryInputChange(value);
              }}
              defaultValue={categoryInput}
            >
              <SelectTrigger className="mb-3 border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category: any) => (
                  <React.Fragment key={category?._id}>
                    <SelectItem value={category?._id}>
                      {category?.label}
                    </SelectItem>
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>

            <Input
              className="mb-3 border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Name"
              value={nameInput}
              onChange={handleNameInputChange}
            />

            <Input
              className="mb-3 border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Link"
              value={linkInput}
              onChange={handleLinkInputChange}
            />
            <Textarea
              className="mb-3 border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Description"
              value={DescInput}
              onChange={handleDescInputChange}
            />
          </form>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button onClick={() => submit(getId)}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
