"use client"

import { useEffect, useState, useTransition } from "react"
import Image from "next/image"
import { type FileWithPreview } from "@/types"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type Output } from "valibot"

import { useUploadThing } from "@/lib/uploadthing"
import { catchError, cn, isArrayOfFile } from "@/lib/utils"
import { productSchema } from "@/lib/validations/product"
import { addProduct, checkProductName } from "@/app/api/products/service"

import { CustomInput } from "../custom-input"
import { FileDialog } from "../file-dialog"
import { Spinner } from "../icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from "../ui/form"
import { Separator } from "../ui/separator"
import { ZoomImage } from "../zoom-image"

type SchemaType = Output<typeof productSchema>

export default function NewProductForm() {
  const [isPending, startTransition] = useTransition()
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const [thumbnail, setThumbnail] = useState<FileWithPreview | null>(null)
  const { isUploading, startUpload } = useUploadThing("productImage")

  // react-hook-form
  const form = useForm<SchemaType>({
    resolver: valibotResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: 0,
    },
  })

  function onSubmit(data: SchemaType) {
    startTransition(async () => {
      try {
        await checkProductName({
          name: data.name,
        })
        toast.promise(
          async () => {
            if (isArrayOfFile(data.images)) {
              const uploadthing = await startUpload(data.images);
              if(!uploadthing){
                throw new Error("Error uploading images");
              }
              let thumbnailImage = null
              const formattedImages = uploadthing?.map((image) => {
                const imageObject = {
                  id: image.key,
                  name: image.key.split("_")[1] ?? image.key,
                  url: image.url,
                }
                if (thumbnail?.name === image.name) {
                  thumbnailImage = imageObject.url
                }
                return imageObject
              })
              await addProduct({
                ...data,
                images: formattedImages ?? null,
                thumbnail: thumbnailImage,
              })
            } else {
              await addProduct({
                ...data,
                images: null,
              })

              toast.success("Product added successfully.")
            }
          },
          {
            loading: "Uploading images...",
            success: "Product added successfully.",
            error: "Error uploading images.",
          }
        )

        form.reset()
        setFiles(null)
        setThumbnail(null)
      } catch (error) {
        catchError(error)
      }
    })
  }

  useEffect(() => {
    if (files && files.length > 0 && !thumbnail) {
      setThumbnail(files[0] ? files[0] : null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

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
        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <p className="text-sm text-muted-foreground">
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
        <Button
          disabled={isPending || isUploading}
          onClick={() =>
            void form.trigger(["name", "description", "price", "stock"])
          }
          className="w-fit"
        >
          {isPending ||
            (isUploading && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ))}
          Add Product
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  )
}
