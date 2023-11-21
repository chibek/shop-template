import ProductsTable from "@/components/data-table-types/product-table";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { products } from "@/db/schema";

export default async function ProductsPage() {
  const queryProducts = await db.select().from(products);

  return (
    <>
      <section className="px-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground text-sm">Manage your products</p>
        <Separator className="my-4" />
      </section>
      <section>
        <ProductsTable data={queryProducts} pageCount={10} />
      </section>
    </>
  );
}
