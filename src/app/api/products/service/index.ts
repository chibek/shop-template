"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products } from "@/db/schema"
import { and, eq, not } from "drizzle-orm"
import { UTApi } from "uploadthing/server"
import { parse, type Output } from "valibot"

import {
  addProductSchema,
  extendedProductSchemaWithId,
  getProductSchema,
} from "@/lib/validations/product"

export async function checkProductName(input: { name: string; id?: number }) {
  const productWithSameName = await db.query.products.findFirst({
    where: input.id
      ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
      : eq(products.name, input.name),
  })

  if (productWithSameName) {
    throw new Error("Product name already taken.")
  }
}

export async function addProduct(rawInput: Output<typeof addProductSchema>) {
  try {
    const inputParsed = parse(addProductSchema, rawInput)
    await db.insert(products).values({
      ...inputParsed,
    })

    revalidatePath(`/admin/products`)
  } catch (error) {
    throw error
  }
}

export async function updateProduct(
  rawInput: Output<typeof extendedProductSchemaWithId>
) {
  try {
    const input = parse(extendedProductSchemaWithId, rawInput)
    const product = await db.query.products.findFirst({
      where: and(eq(products.id, input.id)),
    })

    if (!product) {
      throw new Error("Product not found.")
    }

    await db.update(products).set(input).where(eq(products.id, input.id))
    revalidatePath(`/admin/products`)
  } catch (error) {
    throw error
  }
}

export async function deleteProduct(rawInput: Output<typeof getProductSchema>) {
  const utapi = new UTApi()

  try {
    const input = parse(getProductSchema, rawInput)
    const queryProduct = await db.query.products.findFirst({
      columns: {
        id: true,
        images: true,
      },
      where: eq(products.id, input.id),
    })

    if (!queryProduct) {
      throw Error("Product not found")
    }

    await db.delete(products).where(eq(products.id, queryProduct.id))
    
    if (queryProduct.images?.length) {
      await utapi.deleteFiles(queryProduct.images.map((image) => image.id))
    }
  } catch (error) {
    throw error
  }

  revalidatePath(`/admin/products`)
}
