"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertModal } from "@/components/alert";
import { EditModal } from "@/components/edit";
import EmptyState from "@/components/empty-state";
import { Heading } from "@/components/heading";
import ImageUpload from "@/components/image-upload";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/use-modal-store";

interface Billboard {
  id: string;
  label: string;
  image_url: string;
  created_at: string;
}

const Billboards = () => {
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [labelInput, setLabelInput] = useState("");
  const [file, setFile] = useState("");

  const fetchBillboards = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/billboards");
      setBillboards(res.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editId) return;
    try {
      setEditLoading(true);
      await axios.patch(`/api/billboards/${editId}`, { label: labelInput, imageUrl: file });
      toast.success("Updated successfully");
      setEditId(null);
      fetchBillboards();
    } catch {
      toast.error("Failed to update billboard");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/billboards/${deleteId}`);
      toast.success("Deleted successfully");
      setDeleteId(null);
      fetchBillboards();
    } catch {
      toast.error("Failed to delete billboard");
    } finally {
      setDeleting(false);
    }
  };

  const openEdit = async (billboard: Billboard) => {
    setEditId(billboard.id);
    setLabelInput(billboard.label);
    setFile(billboard.image_url);
  };

  useEffect(() => {
    fetchBillboards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnDef<Billboard>[] = [
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative h-10 w-16 overflow-hidden rounded-md">
          <Image
            fill
            src={row.getValue("image_url")}
            alt={row.original.label}
            className="object-cover"
            sizes="64px"
          />
        </div>
      ),
    },
    {
      accessorKey: "label",
      header: "Label",
      cell: ({ row }) => (
        <p className="font-medium text-zinc-900">{row.getValue("label")}</p>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-sm text-zinc-500">
          {new Date(row.getValue("created_at")).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => openEdit(row.original)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => setDeleteId(row.original.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: billboards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Heading
            title={`Billboards (${billboards.length})`}
            description="Manage billboards on your homepage"
          />
          <Button onClick={() => onOpen("createBillboard", { onSuccess: fetchBillboards })}>
            <Plus className="mr-2 h-4 w-4" /> Add New Billboard
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

        {!loading && billboards.length === 0 && (
          <div className="flex w-full items-center justify-center py-10">
            <EmptyState title="No billboards yet" subtitle="Add your first billboard above" />
          </div>
        )}

        {!loading && billboards.length > 0 && (
          <>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                      {hg.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
              <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <AlertModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        loading={deleting}
        onConfirm={handleDelete}
      />

      <EditModal
        title="Edit Billboard"
        isOpen={!!editId}
        onClose={() => setEditId(null)}
        loading={editLoading}
        onConfirm={handleEdit}
        body={
          <div className="flex flex-col gap-4">
            <ImageUpload setFile={setFile} file={file} />
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Label"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
};

export default Billboards;
