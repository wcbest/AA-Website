"use client";

import axios from "axios";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { AlertModal } from "@/components/alert";
import { EditModal } from "@/components/edit";
import EmptyState from "@/components/empty-state";
import { Heading } from "@/components/heading";
import ImageUpload from "@/components/image-upload";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";

const Billboards = () => {
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [billNo, setBillNo] = useState(0);
  const [billBoards, setBillBoards] = useState<any>([]);
  const [_billBoard, setBillBoard] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [getBillId, setGetBillId] = useState("");
  const [file, setFile] = useState("");

  const [textInput, setTextInput] = useState("");

  const handleInputChange = (e: any) => {
    setTextInput(e.target.value);
  };

  // get all billboards
  const getBillboards = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/billboards/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setBillBoards(response.data);
      setBillNo(response.data.length);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  // get a billboard
  const getBillboard = async (id: any) => {
    try {
      const response = await axios.get(`/api/billboards/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setBillBoard(response.data);
      setTextInput(response.data.label);
      setFile(response.data.imageUrl);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error("Something went wrong!!");
    } finally {
    }
  };

  // edit billboard
  const EditBillboard = async (id: any) => {
    try {
      setEditLoading(true);

      const _response = await axios.patch(
        `/api/billboards/${id}`,
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

      toast.success("Updated Succesfully!!");
      setOpenEdit(false);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response.data);
    } finally {
      setEditLoading(false);
    }
  };

  // delete billboard
  const deleteBillboard = async (id: any) => {
    try {
      setDelLoading(true);

      const _response = await axios.delete(`/api/billboards/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("deleted successfully!!");
      setOpenDel(false);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response.data);
    } finally {
      setDelLoading(false);
    }
  };

  useEffect(() => {
    getBillboards();
  }, [getBillboards]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload setFile={setFile} file={file} />
      <Input
        className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Enter text"
        value={textInput}
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <div className="flex-col">
      <Toaster position="top-center" />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Billboards (${billNo})`}
            description="Manage billboards on your homepage"
          />
          {/* <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}> */}
          <Button onClick={() => onOpen("createBillboard")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Billboard
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex w-full flex-wrap items-start justify-start p-5">
        {loading && (
          <div className="flex w-full items-center justify-center p-5">
            <Loader />
          </div>
        )}
        {!loading && billBoards.length === 0 ? (
          <div className="flex w-full items-center justify-center p-5">
            <EmptyState title="Uh Oh" subtitle="No billboards!" />
          </div>
        ) : null}
        {!loading &&
          billBoards?.map((billboard: any, index: number) => (
            <div className="m-4 h-32 w-[400px]" key={billboard._id}>
              <div className="flex h-full cursor-pointer items-center justify-between rounded-xl border-2 border-transparent bg-white px-2 py-4 shadow">
                <div className="flex items-center gap-1">
                  <p>{index + 1}.</p>
                  <Image
                    src={billboard.imageUrl}
                    alt={billboard.label}
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col items-start">
                    {/* <h2 className="font-medium text-neutral-700 sm:text-xl">
                    {billboard.label}
                  </h2> */}
                    <p className="w-36 overflow-hidden truncate text-neutral-500 text-sm">
                      {billboard.label}
                    </p>
                  </div>
                </div>

                <p
                  className="font-semibold text-neutral-900 text-xl sm:text-2xl"
                  onClick={() => {
                    setGetBillId(billboard._id);
                    getBillboard(billboard?._id);
                  }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4">
                      <DropdownMenuItem
                        className="flex w-full cursor-pointer justify-between"
                        onClick={() => setOpenEdit(true)}
                      >
                        Edit
                        <Pencil size={16} />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex w-full cursor-pointer justify-between"
                        onClick={() => setOpenDel(true)}
                      >
                        Delete
                        <Trash2 size={16} color="red" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </p>
              </div>
              <AlertModal
                isOpen={openDel}
                onClose={() => setOpenDel(false)}
                loading={delLoading}
                onConfirm={() => {
                  deleteBillboard(getBillId);
                }}
              />
              <EditModal
                title={"Edit"}
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                loading={editLoading}
                body={bodyContent}
                onConfirm={() => {
                  EditBillboard(getBillId);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Billboards;
