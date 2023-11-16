import { SiteHeaderProps } from "@/components/layouts/site-header";
import { isClerkAPIResponseError } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later.";
  if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr);
  }
  return toast.error(unknownErr);
}

export function getUserEmail({ user }: SiteHeaderProps) {
  const emailObject = user?.emailAddresses.find(
    ({ id }) => user.primaryEmailAddressId === id
  );
  return emailObject?.emailAddress;
}
