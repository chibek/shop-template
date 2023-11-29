"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { addProductSchema, getProductSchema } from "@/lib/validations/product";
import { and, eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Output, parse } from "valibot";
import { array } from "zod";

export async function checkProductName(input: { name: string; id?: number }) {
  const productWithSameName = await db.query.products.findFirst({
    where: input.id
      ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
      : eq(products.name, input.name),
  });

  if (productWithSameName) {
    throw new Error("Product name already taken.");
  }
}

export async function addProduct(rawInput: Output<typeof addProductSchema>) {
  try {
    const inputParsed = parse(addProductSchema, rawInput);
    console.log({ inputParsed });
    await db.insert(products).values({
      ...inputParsed,
    });

    revalidatePath(`/admin/products`);
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(rawInput: Output<typeof getProductSchema>) {
  try {
    const input = parse(getProductSchema, rawInput);
    const deletedProducts = await db.delete(products).where(eq(products.id,input.id));
    if(deletedProducts.rowsAffected === 0){
      throw Error("Product not found")
    }
  } catch (error) {
    throw error;
  }

  revalidatePath(`/admin/products`);
}
