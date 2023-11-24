"use client";

import { Output } from "valibot";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from "../ui/form";
import { CustomInput } from "../custom-input";
import { Button } from "../ui/button";
import { Spinner } from "../icons";
import { FileDialog } from "../file-dialog";
import { FileWithPreview } from "@/types";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ZoomImage } from "../zoom-image";
import { addProduct, checkProductName } from "@/app/api/products/service";
import { catchError, isArrayOfFile } from "@/lib/utils";
import { toast } from "sonner";
import { productSchema } from "@/lib/validations/product";
import { useUploadThing } from "@/lib/uploadthing";

type SchemaType = Output<typeof productSchema>;

export default function NewProductForm() {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const { isUploading, startUpload } = useUploadThing("productImage");

  // react-hook-form
  const form = useForm<SchemaType>({
    resolver: valibotResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: 0,
    },
  });

  function onSubmit(data: SchemaType) {
    startTransition(async () => {
      try {
        await checkProductName({
          name: data.name,
        });
        if (isArrayOfFile(data.images)) {
          let formattedImages = null;
          toast.promise(
            async () => {
              const uploadthing = await startUpload(data.images);
              formattedImages = uploadthing?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }));
            },
            {
              loading: "Uploading images...",
              success: "Product added successfully.",
              error: "Error uploading images.",
            }
          );

          addProduct({
            ...data,
            images: formattedImages,
          });
        } else {
          await addProduct({
            ...data,
            images: null,
          });

          toast.success("Product added successfully.");
        }

        form.reset();
        setFiles(null);
      } catch (error) {
        catchError(error);
      }
    });
  }

  return (
    <>
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
            {files?.length ? (
              <div className="flex items-center gap-2">
                {files.map((file, i) => (
                  <ZoomImage key={i}>
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                      width={80}
                      height={80}
                    />
                  </ZoomImage>
                ))}
              </div>
            ) : null}
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
              message={form.formState.errors.images?.message?.toString()}
            />
          </FormItem>
          <Separator />
          <Button disabled={isPending || isUploading} className="w-fit">
            {isPending || isUploading && (
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
    </>
  );
}
