"use client";

import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  className,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("flex flex-col gap-1.5", className)}>
          <label className="font-medium text-sm text-zinc-700">{label}</label>
          <Input
            {...field}
            type={type}
            placeholder={placeholder ?? label}
            value={field.value ?? ""}
            className="border-0 bg-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-300"
          />
          {fieldState.error && (
            <p className="text-red-500 text-xs">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
