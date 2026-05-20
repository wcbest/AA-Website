"use client";

import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { AlertModal } from "@/components/alert";
import EmptyState from "@/components/empty-state";
import { Heading } from "@/components/heading";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth-store";
import { useModal } from "@/hooks/use-modal-store";

const Products = () => {
  const { onOpen, isOpen, data, render } = useModal();
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [productNo, setProductNo] = useState(0);
  const [openDel, setOpenDel] = useState(false);
  const [getProdId, setGetProdId] = useState("");
  const [_file, setFile] = useState("");
  const [products, setProducts] = useState<any>([]);
  const [_nameInput, setNameInput] = useState("");
  const [_DescInput, setDescInput] = useState("");
  const [_linkInput, setLinkInput] = useState("");
  const [_categories, _setCategories] = useState([]);
  const [_categoryInput, setCategoryInput] = useState("");
  const _router = useRouter();

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

      const _response = await axios.delete(`/api/products/${id}`, {
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
  }, [getProducts]);

  return (
    <div className="flex-col">
      <Toaster position="top-center" />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col items-start justify-between md:flex-row">
          <Heading
            title={`Products (${productNo})`}
            description="Manage all products on the app"
          />
          <Button className="mb-4" onClick={() => onOpen("createProduct")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
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
        {!loading && products.length === 0 ? (
          <div className="flex w-full items-center justify-center p-5">
            <EmptyState title="Uh Oh" subtitle="No products!" />
          </div>
        ) : null}
        {!loading &&
          products?.map((product: any) => (
            <div className="mt-10 w-[200px] cursor-pointer" key={product._id}>
              <div className="m-2">
                <div className="group col-span-1 cursor-pointer">
                  <div
                    className="flex w-full flex-col gap-2"
                    // onClick={() => router.push(`/products/1}`)}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                      <Image
                        fill
                        className="h-full w-full object-cover transition group-hover:scale-110"
                        src={product?.imageUrl}
                        alt="Listing"
                      />
                      <div className="absolute top-3 right-3">
                        {/* <HeartButton
                listingId={item.id}
                // currentUser={currentUser}
              /> */}
                      </div>
                    </div>
                    <div className="w-36 overflow-hidden truncate font-semibold text-lg">
                      {product.name}
                    </div>
                    <div className="w-36 overflow-hidden truncate font-light text-neutral-500">
                      {product.desc}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      {/* <div className="font-semibold"> $ 40 </div> */}
                      {/* {!item.reservations && <div className="font-light">night</div>} */}
                      {/* <div className="font-light">night</div> */}
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
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
