import { notFound } from "next/navigation"
import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"

import { formatPrice } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import ImageSlider from "@/components/image-slide"

interface ProductViewPageProps {
  params: {
    productId: string
  }
}

export default async function ProductViewPage({
  params,
}: ProductViewPageProps) {
  const productId = Number(params.productId)
  if (isNaN(productId)) {
    notFound()
  }
  
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }
  console.log(product.images)
  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-16">
      <ImageSlider
        className="w-full md:w-1/2"
        urls={product.images?.map((image) => image.url) ?? []}
      />
      <Separator className="mt-4 md:hidden" />
      <div className="flex w-full flex-col gap-4 md:w-1/2">
        <div className="space-y-2">
          <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
          <p className="text-base text-muted-foreground">
            {formatPrice(product.price)}
          </p>
        </div>
        <Separator className="my-1.5" />
        <Separator className="mt-5" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              {product.description ??
                "No description is available for this product."}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
