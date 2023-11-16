"use client";
import { useClerk } from "@clerk/nextjs";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <button className="flex items-center gap-2 cursor-default" onClick={() => signOut(() => router.push("/"))}>
      <ExitIcon />
      Log out
    </button>
  );
}
