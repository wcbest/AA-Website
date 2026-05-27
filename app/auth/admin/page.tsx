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
import EmptyState from "@/components/empty-state";
import { Heading } from "@/components/heading";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
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

interface Product {
  id: string;
  name: string;
  desc: string;
  image_url: string;
  link: string;
  category_id: string | null;
  cat_label: string | null;
}

const Products = () => {
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/products/${deleteId}`);
      toast.success("Deleted successfully");
      setDeleteId(null);
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative h-10 w-10 overflow-hidden rounded-md">
          <Image
            fill
            src={row.getValue("image_url")}
            alt={row.original.name}
            className="object-cover"
            sizes="40px"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-zinc-900">{row.original.name}</p>
          {row.original.desc && (
            <p className="max-w-[220px] truncate text-xs text-zinc-400">{row.original.desc}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "cat_label",
      header: "Category",
      cell: ({ row }) => (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
          {row.getValue<string | null>("cat_label") ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "link",
      header: "Link",
      cell: ({ row }) => (
        <span className="max-w-[160px] truncate text-sm text-zinc-500">{row.getValue("link")}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpen("editProduct", { product: row.original, onSuccess: fetchProducts })}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setDeleteId(row.original.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
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
            title={`Products (${products.length})`}
            description="Manage all products on the app"
          />
          <Button onClick={() => onOpen("createProduct", { onSuccess: fetchProducts })}>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
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

        {!loading && products.length === 0 && (
          <div className="flex w-full items-center justify-center py-10">
            <EmptyState title="No products yet" subtitle="Add your first product above" />
          </div>
        )}

        {!loading && products.length > 0 && (
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
    </div>
  );
};

export default Products;
