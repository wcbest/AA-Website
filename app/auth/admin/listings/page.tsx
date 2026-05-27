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

interface Listing {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  type: string;
  location: string | null;
  image_url: string | null;
  created_at: string;
}

const ListingsPage = () => {
  const { onOpen } = useModal();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/listings");
      setListings(res.data);
    } catch {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/listings/${deleteId}`);
      toast.success("Listing deleted");
      setDeleteId(null);
      fetchListings();
    } catch {
      toast.error("Failed to delete listing");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchListings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnDef<Listing>[] = [
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => {
        const url = row.getValue<string | null>("image_url");
        return url ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
            <Image fill src={url} alt={row.original.title} className="object-cover" sizes="40px" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-[10px] text-zinc-400">
            None
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-zinc-900">{row.original.title}</p>
          {row.original.description && (
            <p className="max-w-[220px] truncate text-xs text-zinc-400">{row.original.description}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
          {row.getValue("type")}
        </span>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue<number | null>("price");
        return <span className="text-zinc-600">{price != null ? `$${price.toLocaleString()}` : "—"}</span>;
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-zinc-600">{row.getValue<string | null>("location") ?? "—"}</span>
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
            onClick={() => onOpen("editListing", { listing: row.original, onSuccess: fetchListings })}
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
    data: listings,
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
            title={`Listings (${listings.length})`}
            description="Manage business and real estate listings"
          />
          <Button onClick={() => onOpen("createListing", { onSuccess: fetchListings })}>
            <Plus className="mr-2 h-4 w-4" />
            Add listing
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

        {!loading && listings.length === 0 && (
          <div className="flex w-full items-center justify-center py-10">
            <EmptyState title="No listings yet" subtitle="Add your first listing above" />
          </div>
        )}

        {!loading && listings.length > 0 && (
          <>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
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

export default ListingsPage;
