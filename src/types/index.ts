import { type Output } from "valibot"
import { type userPrivateMetadataSchema } from "@/lib/validations/auth"
import { FileWithPath } from "react-dropzone"

export type UserRole = Output<typeof userPrivateMetadataSchema.entries.role>
export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }
export interface DataTableSearchableColumn<TData> {
    id: keyof TData
    title: string
  }
  export interface DataTableFilterableColumn<TData>
    extends DataTableSearchableColumn<TData> {
    options: Option[]
  }

  export type FileWithPreview = FileWithPath & {
    preview: string
  }

  export interface StoredFile {
    id: string
    name: string
    url: string
  }