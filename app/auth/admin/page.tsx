"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { useAuth } from "@/hooks/use-auth-store";
import axios from "axios";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import Loader from "@/components/loader";
import EmptyState from "@/components/empty-state";
import { AlertModal } from "@/components/alert";
import { redirect, usePathname, useRouter } from "next/navigation";

const Products = () => {
  const { onOpen, isOpen, data, render } = useModal();
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [productNo, setProductNo] = useState(0);
  const [openDel, setOpenDel] = useState(false);
  const [getProdId, setGetProdId] = useState("");
  const [file, setFile] = useState("");
  const [products, setProducts] = useState<any>([]);
  const [nameInput, setNameInput] = useState("");
  const [DescInput, setDescInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const router = useRouter();

  // get all products
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/products/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
      setProductNo(response.data.length);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  // get a product
  const getProduct = async (id: any) => {
    try {
      const response = await axios.get(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDescInput(response.data.desc);
      setNameInput(response.data.name);
      setLinkInput(response.data.link);
      setCategoryInput(response.data.category);
      setFile(response.data.imageUrl);
      setFile(response.data.imageUrl);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error("Something went wrong!!");
    } finally {
      setLoading(false);
    }
  };

  // delete product
  const deleteProduct = async (id: any) => {
    try {
      setDelLoading(true);

      const response = await axios.delete(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("deleted succesfully");
      setOpenDel(false);
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response.data);
    } finally {
      setDelLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [render, delLoading]);

  return (
    <div className="flex-col">
      <Toaster position="top-center" />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-start flex-col md:flex-row justify-between">
          <Heading
            title={`Products (${productNo})`}
            description="Manage all products on the app"
          />
          <Button className="mb-4 " onClick={() => onOpen("createProduct")}>
            <Plus className="mr-2  h-4 w-4" /> Add New Product
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex items-start justify-start p-5 w-full flex-wrap">
        {loading && (
          <div className="flex items-center justify-center p-5 w-full">
            <Loader />
          </div>
        )}
        {!loading && products.length === 0 ? (
          <div className="flex items-center justify-center p-5 w-full">
            <EmptyState title="Uh Oh" subtitle="No products!" />
          </div>
        ) : null}
        {!loading &&
          products?.map((product: any) => (
            <div className="w-[200px] mt-10 cursor-pointer" key={product._id}>
              <div className="m-2 ">
                <div className="col-span-1 cursor-pointer group">
                  <div
                    className="flex flex-col gap-2 w-full"
                    // onClick={() => router.push(`/products/1}`)}
                  >
                    <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                      <Image
                        fill
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                        src={product?.imageUrl}
                        alt="Listing"
                      />
                      <div className=" absolute top-3 right-3">
                        {/* <HeartButton
                listingId={item.id}
                // currentUser={currentUser}
              /> */}
                      </div>
                    </div>
                    <div className="font-semibold text-lg overflow-hidden truncate w-36">
                      {product.name}
                    </div>
                    <div className="font-light text-neutral-500 overflow-hidden truncate w-36">
                      {product.desc}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      {/* <div className="font-semibold"> $ 40 </div> */}
                      {/* {!item.reservations && <div className="font-light">night</div>} */}
                      {/* <div className="font-light">night</div> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      className=""
                      onClick={() => {
                        onOpen("editProduct", { product });
                        getProduct(product._id);
                      }}
                    >
                      <span className="mr-4">Edit</span>
                      <Pencil size={16} />
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-400"
                      onClick={() => {
                        setOpenDel(true);
                        setGetProdId(product._id);
                      }}
                    >
                      <span className="mr-4">delete</span>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <AlertModal
        isOpen={openDel}
        onClose={() => setOpenDel(false)}
        loading={delLoading}
        onConfirm={() => {
          deleteProduct(getProdId);
        }}
      />
    </div>
  );
};

export default Products;
