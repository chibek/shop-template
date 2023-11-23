"use client";

import { Output } from "valibot";
import { insertProductsSchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  UncontrolledFormMessage
} from "../ui/form";
import { CustomInput } from "../custom-input";
import { Button } from "../ui/button";
import { Spinner } from "../icons";
import { FileDialog } from "../file-dialog";
import { FileWithPreview } from "@/types";
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Separator } from "../ui/separator";

type SchemaType = Output<typeof insertProductsSchema>;

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export default function NewProductForm() {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const { isUploading, startUpload } = useUploadThing("imageUploader")

  // react-hook-form
  const form = useForm<SchemaType>({
    resolver: valibotResolver(insertProductsSchema),
    defaultValues: {
      name: "",
      description: "",
      stock: NaN,
      price: "",
      images: []
    },
  });

  function onSubmit(data: SchemaType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <CustomInput
          control={form.control}
          name="name"
          label="Name"
          type="text"
          placeholder="Type product name here."
        />
        <CustomInput
          control={form.control}
          name="description"
          label="Description"
          areaText={true}
          type="text"
          placeholder="Type product description here."
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <CustomInput
            control={form.control}
            name="price"
            label="Price"
            type="text"
            placeholder="Type product price here."
          />
          <CustomInput
            control={form.control}
            name="stock"
            label="Stock"
            type="number"
            min={0}
            placeholder="Type product stock here."
          />
        </div>
        <FormItem className="flex w-full flex-col gap-1.5 items-start">
          <FormLabel>Images</FormLabel>
          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="images"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>
        <Separator/>
        <Button
          className="w-fit"
        >
          {isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add Product
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  );
}
