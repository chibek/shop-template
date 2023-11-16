import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function HeaderLogin() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className={buttonVariants({
          size: "sm",
        })}
      >
        Sign In
        <span className="sr-only">Sign In</span>
      </Link>
      <Link
        href="/signup"
        className={cn(buttonVariants({
          size: "sm",
          variant: "ghost",
        }), "h-9")}
      >
        Sign Up
        <span className="sr-only">Sign Up</span>
      </Link>
    </div>
  );
}
