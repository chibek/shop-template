import ProductCard from "@/components/cards/product-card";
import { db } from "@/db";
import { products } from "@/db/schema";

export default async function Home() {
  const queryProducts = await db.select().from(products);
  return (
    <>
      <section className="content-grid full-width text-center gap-y-4 py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold breakout text-balance">
          An e-commerce skateshop built with everything new in Next.js
        </h1>
        <p className="text-muted-foreground max-w-[42rem] place-self-center">
          Buy and sell skateboarding gears from independent brands and stores
          around the world with ease
        </p>
      </section>
      <section>
        {queryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
