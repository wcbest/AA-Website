"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./form-field";
import { FormSelect } from "./form-select";
import { ListingImageUpload } from "./listing-image-upload";

export const listingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be 0 or more").optional().or(z.literal("")),
  type: z.enum(["Business", "Real Estate"], {
    required_error: "Type is required",
  }),
  location: z.string().optional(),
  image_url: z.string().optional(),
  published: z.boolean().default(false),
});

export type ListingFormValues = z.infer<typeof listingSchema>;

const TYPE_OPTIONS = [
  { label: "Business", value: "Business" },
  { label: "Real Estate", value: "Real Estate" },
];

interface ListingFormProps {
  defaultValues?: Partial<ListingFormValues>;
  onSubmit: (values: ListingFormValues) => Promise<void>;
  submitLabel?: string;
}

export function ListingForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: ListingFormProps) {
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      type: undefined,
      location: "",
      image_url: "",
      published: false,
      ...defaultValues,
    },
  });

  const { handleSubmit, register, formState: { isSubmitting, errors } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-1">
      <ListingImageUpload name="image_url" control={form.control} />

      <FormField name="title" control={form.control} label="Title" />

      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-zinc-700">Description</label>
        <Textarea
          {...register("description")}
          placeholder="Description"
          className="border-0 bg-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-300"
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          name="price"
          control={form.control}
          label="Price"
          type="number"
          placeholder="0"
        />
        <FormSelect
          name="type"
          control={form.control}
          label="Type"
          options={TYPE_OPTIONS}
        />
      </div>

      <FormField name="location" control={form.control} label="Location" placeholder="City, Country" />

      <Controller
        name="published"
        control={form.control}
        render={({ field }) => (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium text-sm text-zinc-700">Publish listing</p>
              <p className="text-xs text-zinc-400">Visible on the public listings page</p>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )}
      />

      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
