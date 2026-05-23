"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Uh Oh",
  subtitle = "Something went wrong!",
}) => {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <div className="text-center">
        <div className="font-bold text-2xl">{title}</div>
        <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
      </div>
      <div className="mt-4 flex w-48 items-center justify-center">
        <Button onClick={() => router.push("/")}> Go Home</Button>
      </div>
    </div>
  );
};

export default EmptyState;
