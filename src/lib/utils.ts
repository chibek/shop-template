import { isClerkAPIResponseError } from "@clerk/nextjs"
import { ActiveSessionResource } from "@clerk/types"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { ValiError } from "valibot"

import { type SiteHeaderProps } from "@/components/layouts/site-header"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later."
  if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr)
  }
  return toast.error(unknownErr)
}

export function getUserEmail({ user }: SiteHeaderProps) {
  const emailObject = user?.emailAddresses.find(
    ({ id }) => user.primaryEmailAddressId === id
  )
  return emailObject?.emailAddress
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "EUR", notation = "compact" } = options

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price))
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export const paramTonumber = (value: string | null, default_page: number) => {
  const page = Number(value)
  if (isNaN(page) || page < 1) return default_page
  return page
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}
export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files)
  if (!isArray) return false
  return files.every((file) => file instanceof File)
}

export function catchError(error: unknown) {
  if (error instanceof ValiError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast.error(errors.join("\n"))
  } else if (error instanceof Error) {
    return toast.error(error.message)
  } else {
    return toast.error("Something went wrong, please try again later.")
  }
}

export function catchPromiseError(error: unknown) {
  if (error instanceof ValiError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return errors.join("\n")
  } else if (error instanceof Error) {
    return error.message
  } else {
    return "Something went wrong, please try again later."
  }
}

export function isPrivateRoute(
  privateRoutes: readonly string[],
  nextRoute: string
) {
  for (const privateRoute of privateRoutes) {
    const regex = new RegExp(privateRoute)
    if (regex.test(nextRoute)) {
      return true
    }
  }
  return false
}
