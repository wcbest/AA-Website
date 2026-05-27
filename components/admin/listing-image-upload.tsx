"use client";

import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import firebase from "@/firebase/firebase";
import "firebase/compat/storage";

interface ListingImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

export function ListingImageUpload<T extends FieldValues>({
  name,
  control,
  label = "Image",
}: ListingImageUploadProps<T>) {
  const [uploading, setUploading] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const storageRef = firebase.storage().ref(`/listings/${file.name}`);
          const uploadTask = storageRef.put(file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const pct = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              );
              setUploading(`Uploading… ${pct}%`);
            },
            (err) => {
              console.error(err);
              setUploading("Upload failed");
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setUploading("");
                field.onChange(url);
              });
            },
          );
        };

        return (
          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-sm text-zinc-700">{label}</label>

            {field.value ? (
              <div className="relative h-[180px] w-[180px] overflow-hidden rounded-lg">
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => field.onChange("")}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  fill
                  className="object-cover"
                  src={field.value}
                  alt="Listing image"
                  sizes="180px"
                />
              </div>
            ) : null}

            {uploading && (
              <p className="text-sm text-zinc-500">{uploading}</p>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-fit"
              onClick={() => fileInputRef.current?.click()}
              disabled={!!uploading}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {field.value ? "Replace image" : "Upload image"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        );
      }}
    />
  );
}
