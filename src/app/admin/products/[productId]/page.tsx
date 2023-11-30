import { UpdateProductForm } from "@/components/forms/update-product";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { products } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UpdateProductPageProps {
  params: {
    productId: string;
  };
}

export default async function UpdateProduct({
  params,
}: UpdateProductPageProps) {
  const productId = Number(params.productId);
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, productId)),
  });

  if (!product) {
    notFound();
  }

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
        <CardHeader className="space-y-1">
          <CardTitle as="h2" className="text-2xl">
            Update product
          </CardTitle>
          <CardDescription>
            Update your product information, or delete it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );    
}
