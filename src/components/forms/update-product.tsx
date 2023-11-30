"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type Product } from "@/db/schema";
import type { FileWithPreview } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { catchError, cn, isArrayOfFile } from "@/lib/utils";
import { productSchema } from "@/lib/validations/product";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from "@/components/ui/form";
import { FileDialog } from "@/components/file-dialog";
import { type Output } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useUploadThing } from "@/lib/uploadthing";
import { deleteProduct, updateProduct } from "@/app/api/products/service";
import { Spinner } from "../icons";
import { Separator } from "../ui/separator";
import { ZoomImage } from "../zoom-image";
import { CustomInput } from "../custom-input";
import { useEffect, useState, useTransition } from "react";

interface UpdateProductFormProps {
  product: Product;
}

type SchemaType = Output<typeof productSchema>;

export function UpdateProductForm({ product }: UpdateProductFormProps) {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [thumbnail, setThumbnail] = useState<FileWithPreview | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setFiles(
        product.images.map((image) => {
          const file = new File([], image.name, {
            type: "image",
          });
          const fileWithPreview = Object.assign(file, {
            preview: image.url,
          });
          if (image.url === product.thumbnail) setThumbnail(fileWithPreview);
          return fileWithPreview;
        })
      );
    }
  }, [product]);

  const { isUploading, startUpload } = useUploadThing("productImage");

  const form = useForm<SchemaType>({
    resolver: valibotResolver(productSchema),
    defaultValues: {},
  });

  function onSubmit(data: SchemaType) {
    startTransition(async () => {
      try {
        const images = isArrayOfFile(data.images)
          ? await startUpload(data.images).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }));
              return formattedImages ?? null;
            })
          : null;

        await updateProduct({
          ...data,
          id: product.id,
          images: images ?? product.images,
        });

        toast.success("Product updated successfully.");
        setFiles(null);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CustomInput
          control={form.control}
          name="name"
          label="Name"
          type="text"
          placeholder="Type product name here."
          defaultValue={product.name}
        />
        <CustomInput
          control={form.control}
          name="description"
          label="Description"
          areaText={true}
          type="text"
          placeholder="Type product description here."
          defaultValue={product.description ?? ""}
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <CustomInput
            control={form.control}
            name="price"
            label="Price"
            type="text"
            placeholder="Type product price here."
            defaultValue={product.price}
          />
          <CustomInput
            control={form.control}
            name="stock"
            label="Stock"
            type="number"
            min={0}
            placeholder="Type product stock here."
            defaultValue={product.stock}
          />
        </div>
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <p className="text-muted-foreground text-sm">
              Select your thumbnail
            </p>
          ) : null}
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <ZoomImage key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className={cn(
                      "h-20 w-20 shrink-0 rounded-md object-cover object-center hover:cursor-pointer",
                      {
                        "ring-2 ring-blue-600": thumbnail
                          ? thumbnail.name === file.name
                          : false,
                      }
                    )}
                    width={80}
                    height={80}
                    onClick={() => setThumbnail(file)}
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
        <div className="flex space-x-2">
          <Button disabled={isPending}>
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Update Product
            <span className="sr-only">Update product</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              startDeleteTransition(async () => {
                await deleteProduct({
                  id: product.id,
                });
                toast.info("Product deleted")
                router.push(`/admin/products`);
              });
            }}
            disabled={isDeleting}
          >
            {isDeleting && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete Product
            <span className="sr-only">Delete product</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
