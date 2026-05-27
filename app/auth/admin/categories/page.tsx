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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertModal } from "@/components/alert";
import { EditModal } from "@/components/edit";
import EmptyState from "@/components/empty-state";
import { Heading } from "@/components/heading";
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

interface Category {
  id: string;
  label: string;
  desc: string | null;
  created_at: string;
}

const Categories = () => {
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [labelInput, setLabelInput] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/categories");
      setCategories(res.data);
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
      await axios.patch(`/api/categories/${editId}`, { label: labelInput });
      toast.success("Updated successfully");
      setEditId(null);
      fetchCategories();
    } catch {
      toast.error("Failed to update category");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/categories/${deleteId}`);
      toast.success("Deleted successfully");
      setDeleteId(null);
      fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "label",
      header: "Name",
      cell: ({ row }) => (
        <p className="font-medium text-zinc-900">{row.getValue("label")}</p>
      ),
    },
    {
      accessorKey: "desc",
      header: "Description",
      cell: ({ row }) => (
        <span className="text-sm text-zinc-500">{row.getValue<string | null>("desc") ?? "—"}</span>
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
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setEditId(row.original.id);
              setLabelInput(row.original.label);
            }}
          >
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
    data: categories,
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
            title={`Categories (${categories.length})`}
            description="Manage categories on your app"
          />
          <Button onClick={() => onOpen("createCategory", { onSuccess: fetchCategories })}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
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

        {!loading && categories.length === 0 && (
          <div className="flex w-full items-center justify-center py-10">
            <EmptyState title="No categories yet" subtitle="Add your first category above" />
          </div>
        )}

        {!loading && categories.length > 0 && (
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
        title="Edit Category"
        isOpen={!!editId}
        onClose={() => setEditId(null)}
        loading={editLoading}
        onConfirm={handleEdit}
        body={
          <Input
            className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Category name"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
          />
        }
      />
    </div>
  );
};

export default Categories;
