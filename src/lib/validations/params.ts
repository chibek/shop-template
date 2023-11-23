import { fallback, merge, object, optional, string } from "valibot"

export const searchParamsSchema = object({
    page: fallback(string(), "1"),
    per_page:  fallback(string(), "10"),
  })

  
export const dashboardProductsSearchParamsSchema =  object({
    ...searchParamsSchema.entries,
    sort: optional(fallback(string(),"createdAt.desc")),
    name: optional(string()),
    from: optional(string()),
    to: optional(string()),
  })
  