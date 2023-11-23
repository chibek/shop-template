import ProductsTable from "@/components/data-table-types/product-table";
import { db } from "@/db";
import { Product, products } from "@/db/schema";
import { paramTonumber } from "@/lib/utils";
import { dashboardProductsSearchParamsSchema } from "@/lib/validations/params";
import { sql,asc, desc, } from "drizzle-orm";
import { parse } from "valibot";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page, per_page, sort } = parse(dashboardProductsSearchParamsSchema, searchParams);
  const limit = paramTonumber(per_page, 10);
  const offset = (paramTonumber(page, 1) - 1) * limit;
  
  const [column, order] = (sort?.split(".") as [
    keyof Product | undefined,
    "asc" | "desc" | undefined,
  ]) ?? ["createdAt", "desc"]


  const { queryProducts, count } = await db.transaction(async (tx) => {
    const queryProducts = await db
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)
      .orderBy(
        column && column in products
          ? order === "asc"
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      );

    const count = await db
      .select({ count: sql<number>`count(${products.id})` })
      .from(products)
      .then((res) => res[0]?.count ?? 0);

    return {
      queryProducts,
      count,
    };
  });

  const pageCount = Math.ceil(count / limit);
  
  return (
    <div className="flex flex-col gap-4">
      <section className="px-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground text-sm">Manage your products</p>
      </section>
      <section>
        <ProductsTable data={queryProducts} pageCount={pageCount} />
      </section>
    </div>
  );
}
