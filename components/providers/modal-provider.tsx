"use client";

import { useEffect, useState } from "react";

import { CreateBillBoardModal } from "../modals/create-billboad-modal";
import { CreateCategoryModal } from "../modals/create-category-modal";
import { CreateListingModal } from "../modals/create-listing-modal";
import { CreateProductModal } from "../modals/create-product-modal";
import { EditListingModal } from "../modals/edit-listing-modal";
import { EditProductModal } from "../modals/edit-product-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateBillBoardModal />
      <CreateProductModal />
      <EditProductModal />
      <CreateCategoryModal />
      <CreateListingModal />
      <EditListingModal />
    </>
  );
};
