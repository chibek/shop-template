import { Cross2Icon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import {
  type Accept,
  type FileRejection,
  type FileWithPath,
  useDropzone,
} from "react-dropzone";
import type { FileWithPreview } from "@/types";
import { useCallback, useEffect } from "react";
import { cn, formatBytes } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName;
  setValue: UseFormSetValue<TFieldValues>;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  isUploading?: boolean;
  disabled?: boolean;
}

export function FileDialog<TFieldValues extends FieldValues>({
  name,
  setValue,
  files,
  setFiles,
  className,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  isUploading = false,
  disabled = false,
  ...props
}: FileDialogProps<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFiles((prev) => [...(prev ?? []), fileWithPreview]);
      });
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${formatBytes(maxSize)}`
            );
            return;
          }
          errors[0]?.message && toast.error(errors[0].message);
        });
      }
    },
    [maxSize, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" disabled={disabled}>
          Upload Images
          <span className="sr-only">Upload Images</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <p className="text-muted-foreground absolute left-5 top-4 text-base font-medium">
          Upload your images
        </p>
        <div
          {...getRootProps()}
          className={cn(
            "border-muted-foreground/25 hover:bg-muted/25 group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition",
            "ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            isDragActive && "border-muted-foreground/50",
            disabled && "pointer-events-none opacity-60",
            className
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="group grid w-full place-items-center gap-1 sm:px-10">
              <UploadIcon
                className="text-muted-foreground h-9 w-9 animate-pulse"
                aria-hidden="true"
              />
            </div>
          ) : isDragActive ? (
            <div className="text-muted-foreground grid place-items-center gap-2 sm:px-5">
              <UploadIcon
                className={cn("h-8 w-8", isDragActive && "animate-bounce")}
                aria-hidden="true"
              />
              <p className="text-base font-medium">Drop the file here</p>
            </div>
          ) : (
            <div className="grid place-items-center gap-1 sm:px-5">
              <UploadIcon
                className="text-muted-foreground h-8 w-8"
                aria-hidden="true"
              />
              <p className="text-muted-foreground mt-2 text-base font-medium">
                Drag {`'n'`} drop file here, or click to select file
              </p>
              <p className="text-sm text-slate-500">
                Please upload file with size less than {formatBytes(maxSize)}
              </p>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-center text-sm font-medium">
          You can upload up to {maxFiles} {maxFiles === 1 ? "file" : "files"}
        </p>
        {files?.length ? (
          <div className="grid gap-5">
            {files?.map((file, i) => (
              <FileCard key={i} files={files} setFiles={setFiles} file={file} />
            ))}
          </div>
        ) : null}
        {files?.length ? (
          <div className="flex items-center gap-2">
            <DialogClose
              className={cn(
                "mt-2.5 w-full",
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                })
              )}
            >
              Done
              <span className="sr-only">Done</span>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-2.5 w-full"
              onClick={() => setFiles(null)}
            >
              <TrashIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Remove All
              <span className="sr-only">Remove all</span>
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

interface FileCardProps {
  file: FileWithPreview;
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
}

function FileCard({ file, files, setFiles }: FileCardProps) {
  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Image
          src={file.preview}
          alt={file.name}
          className="h-10 w-10 shrink-0 rounded-md"
          width={40}
          height={40}
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
            {file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            if (!files) return;
            setFiles(files.filter((item) => item.name !== file.name));
          }}
        >
          <Cross2Icon className="h-4 w-4 text-white" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}
