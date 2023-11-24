import { products } from "@/db/schema";
import { createInsertSchema } from "drizzle-valibot";
import {
  any,
  array,
  coerce,
  custom,
  minLength,
  minValue,
  nullable,
  number,
  object,
  regex,
  string,
} from "valibot";

export const productSchema = createInsertSchema(products, {
  name: string([minLength(1, "Must be at least 1 character")]),
  price: string([regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price")]),
  stock: coerce(number([minValue(0)]), Number),
  images: nullable(
    any([
      custom((input) => {
        if (!Array.isArray(input)) return false;
        if (input.some((file) => !(file instanceof File))) return false;
        return true;
      }, "Must have some file"),
    ])
  ),
});

export const addProductSchema = object({
  ...productSchema.entries,
  images: nullable(
    array(
      object({
        id: string(),
        name: string(),
        url: string(),
      })
    )
  ),
});
