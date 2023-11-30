import { type Output } from "valibot"
import { type userPrivateMetadataSchema } from "@/lib/validations/auth"
import { type FileWithPath } from "react-dropzone"
import type * as Icons from "@/components/icons";

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

  export interface NavItem {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    role?: UserRole;
  }
  export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItem[]
  }

  export interface NavItemWithChildren extends React.HTMLAttributes<HTMLDivElement> {
    items: NavItem[];
  }