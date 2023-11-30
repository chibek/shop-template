import NewProductForm from "@/components/forms/create-product";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ProductNew() {
  return (
    <div className="container flex flex-col items-start gap-4">
      <Link
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          })
        )}
        href="/admin/products"
      >
        <ArrowLeftIcon />
      </Link>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Add product</CardTitle>
          <CardDescription>Add a new product to your store</CardDescription>
        </CardHeader>
        <CardContent>
          <NewProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
