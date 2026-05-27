import { Suspense } from "react";
import ListingsContent from "./listings-content";

export default function ListingsPage() {
  return (
    <Suspense>
      <ListingsContent />
    </Suspense>
  );
}
