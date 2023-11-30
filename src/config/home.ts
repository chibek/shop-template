import type { NavItemWithOptionalChildren } from "@/types";

export const siteConfig = {
  name: "Not Selling",
  description:
    "An open source e-commerce build with everything new in Next.js.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
      items: [
        {
          title: "Categories",
          description: "Categories of products",
          href: "/categories",
        },
        {
          title: "Products List",
          description: "Products list",
          href: "/products",
        },
      ],
    },
    {
      title: "Documentation",
      href: "/documentation",
    },
  ] satisfies NavItemWithOptionalChildren[],
}
